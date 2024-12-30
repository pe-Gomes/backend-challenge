import { Entity } from '@/core/entity'
import { type Optional } from '@/core/types/optional'
import { EntityID } from '@/core/value-objects/entity-id'

export type AnswerStatusOptions = 'Pending' | 'Error' | 'Done'

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

  get fkChallengeId() {
    return this.props.challengeId.toString()
  }

  get challengeId() {
    return this.props.challengeId
  }

  set challengeId(value: EntityID) {
    this.props.challengeId = value
  }

  get answerLink() {
    return this.props.answerLink
  }
  set answerLink(value: string) {
    this.props.answerLink = value
  }

  get status() {
    return this.props.status
  }

  set status(value: AnswerStatusOptions) {
    this.props.status = value
  }

  get grade(): number | undefined {
    return this.props.grade
  }

  set grade(value: number) {
    this.props.grade = value
  }

  get createdAt() {
    return this.props.createdAt
  }
}
