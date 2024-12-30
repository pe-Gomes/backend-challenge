import { type PaginationParams } from '@/core/repositories/pagination'
import { type EntityID } from '@/core/value-objects/entity-id'
import { type Answer } from '@/domain/classroom/entities/answer'
import { type AnswerRepository } from '@/domain/classroom/repositories/answer-repository'

export class InMemoryAnswerRepository implements AnswerRepository {
  public answers: Answer[] = [] // In-memory data store

  async create(answer: Answer): Promise<void> {
    this.answers.push(answer)
  }

  async getById(id: EntityID): Promise<Answer | null> {
    const answer = this.answers.find((a) => a.id.equals(id))
    return answer ?? null
  }

  async getMany({
    limit,
    page,
    challengeId,
    initialDate,
    endDate,
  }: {
    challengeId?: EntityID
    initialDate?: Date
    endDate?: Date
  } & PaginationParams): Promise<Answer[]> {
    let filteredAnswers = [...this.answers]

    if (challengeId) {
      filteredAnswers = filteredAnswers.filter(
        (answer) => answer.challengeId?.toString() === challengeId.toString(),
      )
    }
    if (initialDate) {
      filteredAnswers = filteredAnswers.filter(
        (answer) => answer.createdAt >= initialDate,
      )
    }
    if (endDate) {
      filteredAnswers = filteredAnswers.filter(
        (answer) => answer.createdAt <= endDate,
      )
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    return filteredAnswers.slice(startIndex, endIndex)
  }
  async update(answer: Answer): Promise<void> {
    const index = this.answers.findIndex((a) => a.id.equals(answer.id))
    if (index !== -1) {
      this.answers[index] = answer
    }
  }

  async delete(id: EntityID): Promise<void> {
    this.answers = this.answers.filter((answer) => !answer.id.equals(id))
  }
}
