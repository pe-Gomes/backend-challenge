import { AnswerStatusOptionsEnum } from '@/domain/classroom/entities/answer'
import { ArgsType, Field, Int } from '@nestjs/graphql'
import { IsOptional, Max, Min } from 'class-validator'

@ArgsType()
export class ListAnswersArgs {
  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @Min(1)
  page = 1

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @Min(10)
  @Max(50)
  limit = 10

  @Field((type) => AnswerStatusOptionsEnum, { nullable: true })
  status?: AnswerStatusOptionsEnum

  @Field((type) => Date, { nullable: true })
  @IsOptional()
  startDate?: Date

  @Field((type) => Date, { nullable: true })
  @IsOptional()
  endDate?: Date
}
