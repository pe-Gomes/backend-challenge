import { ResourceNotFoundError } from '@/domain/classroom/use-cases/errors'
import { RemoveChallengeUseCase } from '@/domain/classroom/use-cases/remove-challenge'
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common'
import { Resolver, Mutation, Args } from '@nestjs/graphql'

@Resolver()
export class RemoveChallengeResolver {
  constructor(private removeChallengeUseCase: RemoveChallengeUseCase) {}

  @Mutation((returns) => Boolean)
  async removeChallengeById(@Args('id') id: string) {
    const res = await this.removeChallengeUseCase.execute({ challengeId: id })

    if (res.isFailure()) {
      if (res.value instanceof ResourceNotFoundError) {
        throw new BadRequestException(res.value.message)
      }
      throw new InternalServerErrorException('Error removing challenge')
    }

    return true
  }
}
