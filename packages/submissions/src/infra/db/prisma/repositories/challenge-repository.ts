import { PaginationParams } from '@/core/repositories/pagination'
import { EntityID } from '@/core/value-objects/entity-id'
import { Challenge } from '@/domain/classroom/entities/challenge'
import { ChallengeRepository } from '@/domain/classroom/repositories/challenge-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaChallengeMapper } from '../mappers/prisma-challenge-mapper'
import { Challenge as PrismaChallenge } from '@prisma/client'

@Injectable()
export class ChallengePrismaRepository implements ChallengeRepository {
  constructor(private db: PrismaService) { }

  async create(challenge: Challenge): Promise<void> {
    await this.db.challenge.create({
      data: PrismaChallengeMapper.toPersistence(challenge),
    })
  }

  async getById(id: EntityID): Promise<Challenge | null> {
    const challenge = await this.db.challenge.findUnique({
      where: { id: id.toString() },
    })

    if (!challenge) return null

    return PrismaChallengeMapper.toEntity(challenge)
  }

  async getMany({
    limit,
    page,
    search,
  }: { search?: string } & PaginationParams): Promise<Challenge[]> {
    let challenges: PrismaChallenge[]

    if (search) {
      challenges = await this.db.challenge.findMany({
        where: {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: 'desc' },
      })

      return challenges.map((c) => PrismaChallengeMapper.toEntity(c))
    }

    challenges = await this.db.challenge.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' },
    })

    return challenges.map((c) => PrismaChallengeMapper.toEntity(c))
  }

  async update(challenge: Challenge): Promise<void> {
    const updated = PrismaChallengeMapper.toPersistence(challenge)

    await this.db.challenge.update({
      where: { id: challenge.id.toString() },
      data: updated,
    })
  }

  async delete(id: EntityID): Promise<void> {
    await this.db.challenge.delete({ where: { id: id.toString() } })
  }
}
