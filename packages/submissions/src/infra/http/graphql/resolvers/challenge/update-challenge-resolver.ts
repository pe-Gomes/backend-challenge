import { Challenge } from '@/domain/classroom/entities/challenge'
import { EditChallengeUseCase } from '@/domain/classroom/use-cases/edit-challenge'
import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { UpdateChallengeInput } from '../../inputs/update-challenge-input'
import { ResourceNotFoundError } from '@/domain/classroom/use-cases/errors'
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common'

@Resolver()
export class UpdateChallengeResolver {
  constructor(private editChallengeUseCase: EditChallengeUseCase) {}

  @Mutation((returns) => Challenge)
  async updateChallenge(
    @Args('data') { title, description, challengeId }: UpdateChallengeInput,
  ) {
    const res = await this.editChallengeUseCase.execute({
      title,
      description,
      challengeId,
    })

    if (res.isFailure()) {
      if (res.value instanceof ResourceNotFoundError) {
        throw new BadRequestException(res.value.message)
      }

      throw new InternalServerErrorException('Error updating challenge')
    }

    return res.value.challenge
  }
}
