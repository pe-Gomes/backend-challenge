import { Injectable } from '@nestjs/common'
import { ChallengeRepository } from '../repositories/challenge-repository'
import { Challenge } from '../entities/challenge'
import { Either, success } from '@/core/either'

export type CreateChallengeRequest = {
  title: string
  description: string
  createdAt?: Date
}

type CreateChallengeResponse = Either<null, { challenge: Challenge }>

@Injectable()
export class CreateChallengeUseCase {
  constructor(private challengeRepository: ChallengeRepository) {}

  async execute(
    data: CreateChallengeRequest,
  ): Promise<CreateChallengeResponse> {
    const challenge = Challenge.create(data)
    await this.challengeRepository.create(challenge)
    return success({ challenge })
  }
}
