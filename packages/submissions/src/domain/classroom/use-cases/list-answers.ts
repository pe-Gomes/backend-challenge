import { Injectable } from '@nestjs/common'
import { AnswerRepository } from '../repositories/answer-repository'
import { PaginationParams } from '@/core/repositories/pagination'
import { Answer, AnswerStatusOptions } from '../entities/answer'
import { EntityID } from '@/core/value-objects/entity-id'
import { Either, failure, success } from '@/core/either'
import { InvalidDateRangeError } from './errors'
import dayjs from 'dayjs'

export type ListChallengeRequest = {
  status?: AnswerStatusOptions
  startDate?: Date
  endDate?: Date
  challengeId?: string
} & PaginationParams

type ListChallengesResponse = Either<
  InvalidDateRangeError,
  { answers: Answer[] }
>

@Injectable()
export class ListAnswersUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute(data: ListChallengeRequest): Promise<ListChallengesResponse> {
    if (data.startDate && !data.endDate) {
      failure(new InvalidDateRangeError())
    }

    if (!data.startDate && data.endDate) {
      failure(new InvalidDateRangeError())
    }

    if (data.startDate && data.endDate) {
      const start = dayjs(data.startDate)
      const end = dayjs(data.endDate)

      if (start.isAfter(end)) {
        return failure(new InvalidDateRangeError())
      }
    }

    const answers = await this.answerRepository.getMany({
      ...data,
      challengeId: data.challengeId
        ? new EntityID(data.challengeId)
        : undefined,
    })

    return success({ answers })
  }
}
