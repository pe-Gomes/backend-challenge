import { Injectable } from '@nestjs/common'
import { ChallengeRepository } from '../repositories/challenge-repository'
import { Challenge } from '../entities/challenge'
import { EntityID } from '@/core/value-objects/entity-id'
import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from './errors'

export type FindOneChallengeRequest = {
  id: string
}

type FindOneChallengeResponse = Either<
  ResourceNotFoundError,
  {
    challenge: Challenge
  }
>

@Injectable()
export class FindOneChallengeUseCase {
  constructor(private challengeRepository: ChallengeRepository) {}

  async execute({
    id,
  }: FindOneChallengeRequest): Promise<FindOneChallengeResponse> {
    const challenge = await this.challengeRepository.getById(new EntityID(id))

    if (!challenge) {
      return failure(new ResourceNotFoundError())
    }

    return success({ challenge })
  }
}
