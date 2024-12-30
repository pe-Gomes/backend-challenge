import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class NewChallengeInput {
  @Field()
  title!: string

  @Field()
  description!: string

  @Field({ nullable: true })
  createdAt?: Date
}
