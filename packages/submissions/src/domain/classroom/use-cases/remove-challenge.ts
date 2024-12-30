import { Injectable } from '@nestjs/common'
import { ChallengeRepository } from '../repositories/challenge-repository'
import { EntityID } from '@/core/value-objects/entity-id'
import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from './errors'

type RemoveChallengeRequest = {
  challengeId: string
}

type RemoveChallengeResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class RemoveChallengeUseCase {
  constructor(private challengeRepo: ChallengeRepository) {}

  async execute({
    challengeId,
  }: RemoveChallengeRequest): Promise<RemoveChallengeResponse> {
    const challengeEntityId = new EntityID(challengeId)
    const exists = await this.challengeRepo.getById(challengeEntityId)

    if (!exists) {
      return failure(new ResourceNotFoundError())
    }

    await this.challengeRepo.delete(challengeEntityId)

    return success(null)
  }
}
