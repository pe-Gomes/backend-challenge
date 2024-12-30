import { type PaginationParams } from '@/core/repositories/pagination'
import { type EntityID } from '@/core/value-objects/entity-id'
import { type Challenge } from '@/domain/entities/challenge'
import { type ChallengeRepository } from '@/domain/classroom/repositories/challenge-repository'

export class InMemoryChallengeRepository implements ChallengeRepository {
  public challenges: Challenge[] = []

  async create(challenge: Challenge): Promise<void> {
    this.challenges.push(challenge)
  }

  async getById(id: EntityID): Promise<Challenge | null> {
    return this.challenges.find((challenge) => challenge.id.equals(id)) ?? null
  }

  async getMany({
    limit,
    page,
    search,
  }: { search?: string } & PaginationParams): Promise<Challenge[]> {
    if (search) {
      return []
    }
    return this.challenges
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * limit, page * limit)
  }

  async update(challenge: Challenge): Promise<void> {
    const challengeIdx = this.challenges.findIndex((c) =>
      c.id.equals(challenge.id),
    )

    this.challenges[challengeIdx] = challenge
  }

  async delete(id: EntityID): Promise<void> {
    const challengeIdx = this.challenges.findIndex((c) => c.id.equals(id))
    this.challenges.splice(challengeIdx, 1)
  }
}
