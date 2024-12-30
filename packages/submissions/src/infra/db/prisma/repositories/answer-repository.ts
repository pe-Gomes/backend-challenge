import { PaginationParams } from '@/core/repositories/pagination'
import { EntityID } from '@/core/value-objects/entity-id'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaAnswerMapper } from '../mappers/prisma-answer-mapper'
import { Answer, AnswerStatusOptions } from '@/domain/classroom/entities/answer'
import { AnswerRepository } from '@/domain/classroom/repositories/answer-repository'

@Injectable()
export class AnswerPrismaRepository implements AnswerRepository {
  constructor(private db: PrismaService) {}

  async create(answer: Answer): Promise<void> {
    await this.db.answer.create({
      data: PrismaAnswerMapper.toPersistence(answer),
    })
  }
  async getById(id: EntityID): Promise<Answer | null> {
    const answer = await this.db.answer.findUnique({
      where: { id: id.toString() },
    })

    if (!answer) return null

    return PrismaAnswerMapper.toEntity(answer)
  }
  async getMany({
    limit,
    page,
    challengeId,
    initialDate,
    endDate,
    status,
  }: {
    challengeId?: EntityID
    initialDate?: Date
    endDate?: Date
    status?: AnswerStatusOptions
  } & PaginationParams): Promise<Answer[]> {
    const answers = await this.db.answer.findMany({
      where: {
        challengeId: challengeId?.toString(),
        createdAt: {
          gte: initialDate,
          lte: endDate,
        },
        status,
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' },
    })

    return answers.map((a) => PrismaAnswerMapper.toEntity(a))
  }
  async update(answer: Answer): Promise<void> {
    const updated = PrismaAnswerMapper.toPersistence(answer)

    await this.db.answer.update({
      where: { id: answer.id.toString() },
      data: updated,
    })
  }

  async delete(id: EntityID): Promise<void> {
    await this.db.answer.delete({ where: { id: id.toString() } })
  }
}
