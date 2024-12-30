import { Injectable } from '@nestjs/common'
import { ChallengeRepository } from '../repositories/challenge-repository'
import { EntityID } from '@/core/value-objects/entity-id'
import { Either, failure, success } from '@/core/either'
import { InvalidAnswerUrlError, ResourceNotFoundError } from './errors'
import { Answer } from '../entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'
import { isValidGithubRepoUrl } from '@/utils/link-validator'

type AnswerChallengeRequest = {
  challengeId: string
  answerLink: string
}

type AnswerChallengeResponse = Either<
  ResourceNotFoundError | InvalidAnswerUrlError,
  { answer: Answer }
>

@Injectable()
export class AnswerChallengeUseCase {
  constructor(
    private answerRepo: AnswerRepository,
    private challengeRepo: ChallengeRepository,
  ) {}

  async execute({
    challengeId,
    answerLink,
  }: AnswerChallengeRequest): Promise<AnswerChallengeResponse> {
    const challengeEntityId = new EntityID(challengeId)
    const challenge = await this.challengeRepo.getById(challengeEntityId)

    let answer: Answer

    if (!challenge) {
      answer = Answer.create({
        challengeId: challengeEntityId,
        answerLink,
        status: 'Error',
      })
      await this.answerRepo.create(answer)

      return failure(new ResourceNotFoundError())
    }

    const isValidAnswerUrl = isValidGithubRepoUrl(answerLink)

    if (!isValidAnswerUrl) {
      answer = Answer.create({
        challengeId: challengeEntityId,
        answerLink,
        status: 'Error',
      })
      await this.answerRepo.create(answer)

      return failure(new InvalidAnswerUrlError(answerLink))
    }

    answer = Answer.create({
      challengeId: challengeEntityId,
      answerLink,
    })

    await this.answerRepo.create(answer)

    return success({ answer })
  }
}
