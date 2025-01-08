import { Challenge } from '@/domain/classroom/entities/challenge'
import { CreateChallengeUseCase } from '@/domain/classroom/use-cases/create-challenge'
import { InternalServerErrorException } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { NewChallengeInput } from '../../inputs/new-challenge-input'

@Resolver()
export class CreateChallengeResolver {
  constructor(private createChallengeUseCase: CreateChallengeUseCase) {}

  @Mutation((returns) => Challenge)
  async createChallenge(
    @Args('data') { title, description, createdAt }: NewChallengeInput,
  ) {
    const res = await this.createChallengeUseCase.execute({
      title,
      description,
      createdAt,
    })

    if (res.isFailure()) {
      throw new InternalServerErrorException('Internal error.')
    }

    return res.value.challenge
  }
}
