import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateChallengeInput {
  @Field()
  challengeId!: string

  @Field()
  title!: string

  @Field()
  description!: string
}
