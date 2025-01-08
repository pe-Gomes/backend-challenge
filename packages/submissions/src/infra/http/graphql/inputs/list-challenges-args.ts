import { ArgsType, Field, Int } from '@nestjs/graphql'
import { IsOptional, Max, Min } from 'class-validator'

@ArgsType()
export class ListChallengesArgs {
  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @Min(1)
  page = 1

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @Min(10)
  @Max(50)
  limit = 10

  @Field((type) => String, { nullable: true })
  search?: string
}
