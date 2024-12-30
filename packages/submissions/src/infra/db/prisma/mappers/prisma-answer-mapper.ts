import { EntityID } from '@/core/value-objects/entity-id'
import { Answer } from '@/domain/classroom/entities/answer'
import { type Answer as PrismaAnswer } from '@prisma/client'

export class PrismaAnswerMapper {
  static toEntity(data: PrismaAnswer): Answer {
    return Answer.create(
      {
        answerLink: data.answerLink,
        challengeId: new EntityID(data.challengeId.toString()),
        grade: data.grade ?? undefined,
        status: data.status,
        createdAt: data.createdAt,
      },
      new EntityID(data.id),
    )
  }

  static toPersistence(answer: Answer): PrismaAnswer {
    return {
      id: answer.id.toString(),
      answerLink: answer.answerLink,
      challengeId: answer.challengeId.toString(),
      grade: answer.grade ?? null,
      status: answer.status,
      createdAt: answer.createdAt,
    }
  }
}
