import { EntityID } from '@/core/value-objects/entity-id'
import { Answer, type AnswerEntityProps } from '@/domain/classroom/entities/answer'
import { faker } from '@faker-js/faker'

export function createAnswer(
  overrides: Partial<AnswerEntityProps> = {},
  id?: EntityID,
) {
  return Answer.create(
    {
      challengeId: new EntityID(faker.string.uuid()),
      answerLink: `github.com/${faker.person.firstName()}/${faker.lorem.word(1)}`,
      ...overrides,
    },
    id,
  )
}
