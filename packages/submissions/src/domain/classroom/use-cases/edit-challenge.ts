import { Injectable } from '@nestjs/common'
import { ChallengeRepository } from '../repositories/challenge-repository'
import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from './errors'
import { EntityID } from '@/core/value-objects/entity-id'
import { Challenge } from '../entities/challenge'

type EditChallengeRequest = {
  challengeId: string
  title: string
  description: string
}

type EditChallengeResponse = Either<
  ResourceNotFoundError,
  { challenge: Challenge }
>

@Injectable()
export class EditChallengeUseCase {
  constructor(private challengeRepo: ChallengeRepository) {}

  async execute({
    challengeId,
    title,
    description,
  }: EditChallengeRequest): Promise<EditChallengeResponse> {
    const challenge = await this.challengeRepo.getById(
      new EntityID(challengeId),
    )

    if (!challenge) {
      return failure(new ResourceNotFoundError())
    }

    challenge.title = title
    challenge.description = description

    await this.challengeRepo.update(challenge)

    return success({ challenge })
  }
}
