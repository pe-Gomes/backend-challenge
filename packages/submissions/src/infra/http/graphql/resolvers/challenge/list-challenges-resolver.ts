import { Challenge } from '@/domain/classroom/entities/challenge'
import { ListChallengesUseCase } from '@/domain/classroom/use-cases/list-challenges'
import { Query, Args, Resolver } from '@nestjs/graphql'
import { ListChallengesArgs } from '../../inputs/list-challenges-args'
import { InternalServerErrorException } from '@nestjs/common'

@Resolver()
export class ListChallengesResolver {
  constructor(private listChallengesUseCase: ListChallengesUseCase) {}
  @Query((returns) => [Challenge])
  async listChallenges(@Args() { limit, page, search }: ListChallengesArgs) {
    const res = await this.listChallengesUseCase.execute({
      limit,
      page,
      search,
    })

    if (res.isFailure()) {
      throw new InternalServerErrorException('Internal error.')
    }

    return res.value.challenges
  }
}
