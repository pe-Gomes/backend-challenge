import { EntityID } from '@/core/value-objects/entity-id'
import {
  Challenge,
  type ChallengeEntityProps,
} from '@/domain/classroom/entities/challenge'
import { PrismaChallengeMapper } from '@/infra/db/prisma/mappers/prisma-challenge-mapper'
import { PrismaService } from '@/infra/db/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

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

@Injectable()
export class ChallengeFactory {
  constructor(private db: PrismaService) {}

  async makePrismaChallenge(
    data: Partial<ChallengeEntityProps> = {},
    id?: string,
  ) {
    const challenge = createChallenge(data, new EntityID(id))

    await this.db.challenge.create({
      data: PrismaChallengeMapper.toPersistence(challenge),
    })

    return challenge
  }
}
