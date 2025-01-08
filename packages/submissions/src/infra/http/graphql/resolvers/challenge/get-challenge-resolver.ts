import { Challenge } from '@/domain/classroom/entities/challenge'
import { FindOneChallengeUseCase } from '@/domain/classroom/use-cases/find-one-challenge'
import { BadRequestException } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class GetChallengeResolver {
  constructor(private findOneChallenge: FindOneChallengeUseCase) {}

  @Query(() => Challenge)
  async challenge(@Args('id') id: string) {
    const res = await this.findOneChallenge.execute({ id })
    if (res.isFailure()) {
      throw new BadRequestException(res.value.message)
    }

    return res.value.challenge
  }
}
