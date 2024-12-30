import { EntityID } from '@/core/value-objects/entity-id'
import { Challenge } from '@/domain/classroom/entities/challenge'
import { type Challenge as PrismaChallenge } from '@prisma/client'

export class PrismaChallengeMapper {
  static toEntity(data: PrismaChallenge): Challenge {
    return Challenge.create(
      {
        title: data.title,
        description: data.description,
        createdAt: data.createdAt,
      },
      new EntityID(data.id),
    )
  }

  static toPersistence(challenge: Challenge): PrismaChallenge {
    return {
      id: challenge.id.toString(),
      title: challenge.title,
      description: challenge.description,
      createdAt: challenge.createdAt,
    }
  }
}
