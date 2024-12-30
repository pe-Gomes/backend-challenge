import { Injectable } from '@nestjs/common'
import { ChallengeRepository } from '../repositories/challenge-repository'
import { Challenge } from '../entities/challenge'
import { Either, success } from '@/core/either'
import { PaginationParams } from '@/core/repositories/pagination'

type ListChallengesRequest = {
  search?: string
} & PaginationParams

type ListChallengesResponse = Either<null, { challenges: Challenge[] }>

@Injectable()
export class ListChallengesUseCase {
  constructor(private challengeRepo: ChallengeRepository) {}

  async execute({
    page,
    limit,
    search,
  }: ListChallengesRequest): Promise<ListChallengesResponse> {
    const challenges = await this.challengeRepo.getMany({ page, limit, search })

    return success({ challenges })
  }
}
