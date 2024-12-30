import { Entity } from '@/core/entity'
import { type Optional } from '@/core/types/optional'
import { EntityID } from '@/core/value-objects/entity-id'

export type ChallengeEntityProps = {
  title: string
  description: string
  createdAt: Date
}

type CreateChallengeEntityProps = Optional<ChallengeEntityProps, 'createdAt'>

export class Challenge extends Entity<ChallengeEntityProps> {
  static create(props: CreateChallengeEntityProps, id?: EntityID) {
    return new Challenge(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id ?? new EntityID(),
    )
  }

  get title(): string {
    return this.props.title
  }
  set title(title: string) {
    this.props.title = title
  }

  get description(): string {
    return this.props.description
  }
  set description(description: string) {
    this.props.description = description
  }

  get createdAt(): Date {
    return this.props.createdAt
  }
}
