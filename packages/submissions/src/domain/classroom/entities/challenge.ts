import { Entity } from '@/core/entity'
import { type Optional } from '@/core/types/optional'
import { EntityID } from '@/core/value-objects/entity-id'
import { Field, ID, ObjectType } from '@nestjs/graphql'

export type ChallengeEntityProps = {
  title: string
  description: string
  createdAt: Date
}

type CreateChallengeEntityProps = Optional<ChallengeEntityProps, 'createdAt'>

@ObjectType()
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

  @Field(() => ID, { name: 'id' })
  get identifier(): string {
    return this.id.toString()
  }

  @Field()
  get title(): string {
    return this.props.title
  }
  set title(title: string) {
    this.props.title = title
  }

  @Field()
  get description(): string {
    return this.props.description
  }
  set description(description: string) {
    this.props.description = description
  }

  @Field((type) => Date)
  get createdAt(): Date {
    return this.props.createdAt
  }
}
