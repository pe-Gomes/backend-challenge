import { Answer } from '@/domain/classroom/entities/answer'
import { AnswerChallengeUseCase } from '@/domain/classroom/use-cases/answer-challenge'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { NewAnswerInput } from '../../inputs/new-answer-input'
import {
  InvalidAnswerUrlError,
  ResourceNotFoundError,
} from '@/domain/classroom/use-cases/errors'
import {
  BadRequestException,
  InternalServerErrorException,
  RequestTimeoutException,
} from '@nestjs/common'
import { BaseUseCaseError } from '@/core/errors'
import { OnChallengeCorrection } from '@/domain/events/use-cases/on-challenge-correction'
import { MicroserviceTimeoutError } from '@/domain/events/use-cases/errors'

@Resolver()
export class AnswerChallengeResolver {
  constructor(
    private answerChallengeUseCase: AnswerChallengeUseCase,
    private onChallengeCorrection: OnChallengeCorrection,
  ) {}

  @Mutation((returns) => Answer)
  async answerChallenge(
    @Args('data') { answerLink, challengeId }: NewAnswerInput,
  ) {
    const res = await this.answerChallengeUseCase.execute({
      answerLink,
      challengeId,
    })

    if (res.isFailure()) {
      return this.handleErrors(res.value)
    }

    const correctionRes = await this.onChallengeCorrection.execute({
      answer: res.value.answer,
    })

    if (correctionRes.isFailure()) {
      return this.handleErrors(correctionRes.value)
    }

    const { answer } = correctionRes.value

    return answer
  }

  private handleErrors(error: BaseUseCaseError) {
    switch (error.constructor) {
      case ResourceNotFoundError:
        throw new BadRequestException(error.message)
      case InvalidAnswerUrlError:
        throw new BadRequestException(error.message)
      case MicroserviceTimeoutError:
        throw new RequestTimeoutException(error.message)
      default:
        throw new InternalServerErrorException()
    }
  }
}
