import { type EntityID } from '@/core/value-objects/entity-id'
import {
  Challenge,
  type ChallengeEntityProps,
} from '@/domain/classroom/entities/challenge'
import { faker } from '@faker-js/faker'

export function createChallenge(
  overrides: Partial<ChallengeEntityProps> = {},
  id?: EntityID,
) {
  return Challenge.create(
    {
      title: faker.lorem.words(3),
      description: faker.lorem.paragraph(1),
      createdAt: faker.date.soon(),
      ...overrides,
    },
    id,
  )
}
