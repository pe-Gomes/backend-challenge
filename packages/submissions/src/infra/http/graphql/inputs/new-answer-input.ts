import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class NewAnswerInput {
  @Field()
  challengeId!: string

  @Field()
  answerLink!: string
}
