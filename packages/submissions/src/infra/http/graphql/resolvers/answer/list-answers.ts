import { Answer } from '@/domain/classroom/entities/answer'
import { Challenge } from '@/domain/classroom/entities/challenge'
import { Resolver, ResolveField, Parent, Args } from '@nestjs/graphql'
import { ListAnswersArgs } from '../../inputs/list-answers-args'
import { ListAnswersUseCase } from '@/domain/classroom/use-cases/list-answers'
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common'
import { InvalidDateRangeError } from '@/domain/classroom/use-cases/errors'

@Resolver(() => Challenge)
export class ListAnswersResolver {
  constructor(private listAnswerUseCase: ListAnswersUseCase) {}

  @ResolveField(() => [Answer])
  async answers(
    @Parent() challenge: Challenge,
    @Args() { limit, page, status, startDate, endDate }: ListAnswersArgs,
  ) {
    const res = await this.listAnswerUseCase.execute({
      limit,
      page,
      challengeId: challenge.id.toString(),
      status,
      endDate,
      startDate,
    })

    if (res.isFailure()) {
      if (res.value instanceof InvalidDateRangeError) {
        throw new BadRequestException(res.value.message)
      }
      throw new InternalServerErrorException()
    }

    return res.value.answers
  }
}
