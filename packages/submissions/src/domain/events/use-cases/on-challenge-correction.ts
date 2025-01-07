import { Answer } from '@/domain/classroom/entities/answer'
import { AnswerRepository } from '@/domain/classroom/repositories/answer-repository'
import { Injectable } from '@nestjs/common' import {
  ChallengeCorrectionEvent,
  challengeCorrectionSchema,
} from '../entities/challenge-correction'
import { Either, failure, success } from '@/core/either'
import { MicrosserviceTimeoutError } from './errors'
import { CorrectionMessageRepository } from '../repositories/correction-message'
import { firstValueFrom, timeout, TimeoutError } from 'rxjs'
import { ZodError } from 'zod'

export type OnChallengeCorrectionArgs = {
  answer: Answer
}

type OnChallengeCorrectionResponse = Either<
  MicrosserviceTimeoutError | Error | ZodError,
  { answer: Answer }
>

@Injectable()
export class OnChallengeCorrection {
  constructor(
    private answerRepository: AnswerRepository,
    private correctionMessageRepository: CorrectionMessageRepository,
  ) { }

  private KAFKA_TIMEOUT = 5000 // timeout in milliseconds

  async execute({
    answer,
  }: OnChallengeCorrectionArgs): Promise<OnChallengeCorrectionResponse> {
    const messageData =
      ChallengeCorrectionEvent.makeMessageRequestForAnswer(answer)

    try {
      const rawCorrectionData = await firstValueFrom(
        this.correctionMessageRepository
          .send(messageData)
          .pipe(timeout(this.KAFKA_TIMEOUT)),
      )

      const parsedCorrection =
        challengeCorrectionSchema.parse(rawCorrectionData)

      const correctedAnswer = new ChallengeCorrectionEvent(parsedCorrection)

      answer.grade = correctedAnswer.grade
      answer.status = correctedAnswer.status
    } catch (err) {
      return this.handleErrors(err)
    }

    await this.answerRepository.update(answer)

    return success({ answer })
  }

  private handleErrors(err: unknown) {
    if (err instanceof ZodError) {
      // Handle schema validation errors
      console.error(
        '[DEVELOPMENT ERROR] Zod Schema validation: Received invalid data from Kafka response.',
        err.errors,
      )
      return failure(err)
    }

    if (err instanceof TimeoutError) {
      // Handle timeout errors
      console.error(
        `Timeout error: Kafka response exceeded ${this.KAFKA_TIMEOUT}ms.`,
      )
      return failure(new MicrosserviceTimeoutError())
    }

    // Handle unexpected errors
    console.error('Unexpected error while processing Kafka response:', err)
    return failure(new Error('An unexpected error occurred.'))
  }
}
