import { type EntityID } from '@/core/value-objects/entity-id'
import { type PaginationParams } from '@/core/repositories/pagination'
import { type AnswerStatusOptions, type Answer } from '../entities/answer'

export type GetManyAnswerParams = {
  challengeId?: EntityID
  initialDate?: Date
  endDate?: Date
  status?: AnswerStatusOptions
} & PaginationParams

export abstract class AnswerRepository {
  abstract create(submission: Answer): Promise<void>
  abstract getById(id: EntityID): Promise<Answer | null>
  abstract getMany({
    limit,
    page,
    challengeId,
    initialDate,
    endDate,
    status,
  }: GetManyAnswerParams): Promise<Answer[]>
  abstract update(submission: Answer): Promise<void>
  abstract delete(id: EntityID): Promise<void>
}
