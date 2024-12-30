import { Injectable } from '@nestjs/common'
import { AnswerRepository } from '../repositories/answer-repository'
import { PaginationParams } from '@/core/repositories/pagination'
import { Answer, AnswerStatusOptions } from '../entities/answer'
import { EntityID } from '@/core/value-objects/entity-id'
import { Either, success } from '@/core/either'

export type ListChallengeRequest = {
  status?: AnswerStatusOptions
  startDate?: Date
  endDate?: Date
  challengeId?: string
} & PaginationParams

type ListChallengesResponse = Either<null, { answers: Answer[] }>

@Injectable()
export class ListAnswersUseCase {
  constructor(private answerRepository: AnswerRepository) { }

  async execute(data: ListChallengeRequest): Promise<ListChallengesResponse> {
    const answers = await this.answerRepository.getMany({
      ...data,
      challengeId: data.challengeId
        ? new EntityID(data.challengeId)
        : undefined,
    })

    return success({ answers })
  }
}
