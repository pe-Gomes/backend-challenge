import { Entity } from '@/core/entity'
import { type Optional } from '@/core/types/optional'
import { EntityID } from '@/core/value-objects/entity-id'
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'

export type AnswerStatusOptions = 'Pending' | 'Error' | 'Done'

export enum AnswerStatusOptionsEnum {
  Pending = 'Pending',
  Error = 'Error',
  Done = 'Done',
}

registerEnumType(AnswerStatusOptionsEnum, {
  name: 'AnswerStatusOptions',
  description: 'Available status for answers',
})

export type AnswerEntityProps = {
  challengeId: EntityID
  answerLink: string
  status: AnswerStatusOptions
  grade?: number
  createdAt: Date
}

type CreateAnswerProps = Optional<
  AnswerEntityProps,
  'grade' | 'status' | 'createdAt'
>

@ObjectType()
export class Answer extends Entity<AnswerEntityProps> {
  static create(props: CreateAnswerProps, id?: EntityID) {
    return new Answer(
      {
        ...props,
        status: props.status ?? 'Pending',
        createdAt: props.createdAt ?? new Date(),
      },
      id ?? new EntityID(),
    )
  }

  @Field(() => ID, { name: 'id' })
  get identifier() {
    return this.id.toString()
  }

  @Field((type) => String, { name: 'challengeId' })
  get fkChallengeId() {
    return this.props.challengeId.toString()
  }

  get challengeId() {
    return this.props.challengeId
  }

  set challengeId(value: EntityID) {
    this.props.challengeId = value
  }

  @Field()
  get answerLink() {
    return this.props.answerLink
  }
  set answerLink(value: string) {
    this.props.answerLink = value
  }

  @Field(type => AnswerStatusOptionsEnum)
  get status() {
    return this.props.status
  }

  set status(value: AnswerStatusOptions) {
    this.props.status = value
  }

  @Field({ nullable: true })
  get grade(): number | undefined {
    return this.props.grade
  }

  set grade(value: number) {
    this.props.grade = value
  }

  @Field((type) => Date)
  get createdAt() {
    return this.props.createdAt
  }
}
