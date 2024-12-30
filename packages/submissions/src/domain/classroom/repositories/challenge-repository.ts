import { type EntityID } from '@/core/value-objects/entity-id'
import { type Challenge } from '../entities/challenge'
import { type PaginationParams } from '@/core/repositories/pagination'

type GetManyChallengeParams = {
  search?: string
} & PaginationParams

export abstract class ChallengeRepository {
  abstract create(challenge: Challenge): Promise<void>
  abstract getById(id: EntityID): Promise<Challenge | null>
  abstract getMany({
    limit,
    page,
    search,
  }: GetManyChallengeParams): Promise<Challenge[]>
  abstract update(challenge: Challenge): Promise<void>
  abstract delete(id: EntityID): Promise<void>
}
