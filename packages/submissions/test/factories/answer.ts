import { EntityID } from '@/core/value-objects/entity-id'
import {
  Answer,
  type AnswerEntityProps,
} from '@/domain/classroom/entities/answer'
import { PrismaAnswerMapper } from '@/infra/db/prisma/mappers/prisma-answer-mapper'
import { PrismaService } from '@/infra/db/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

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

@Injectable()
export class AnswerFactory {
  constructor(private db: PrismaService) {}

  async makePrismaAnswer(data: Partial<AnswerEntityProps> = {}, id?: string) {
    const answer = createAnswer(data, new EntityID(id))

    await this.db.answer.create({
      data: PrismaAnswerMapper.toPersistence(answer),
    })

    return answer
  }
}
