import { Entity } from '@/core/entity'
import { EntityID } from '@/core/value-objects/entity-id'
import { type Answer } from '@/domain/classroom/entities/answer'
import { z } from 'zod'

export const challengeCorrectionSchema = z.object({
  submissionId: z.string(),
  repositoryUrl: z.string(),
  grade: z.coerce.number(),
  status: z.enum(['Pending', 'Error', 'Done']),
})

export type ChallengeCorrectionProps = z.infer<typeof challengeCorrectionSchema>

export type ChallengeCorrectionRequest = {
  value: {
    submissionId: string
    repositoryUrl: string
  }
}

export class ChallengeCorrectionEvent extends Entity<ChallengeCorrectionProps> {
  constructor(props: ChallengeCorrectionProps, id?: EntityID) {
    super(props, id ?? new EntityID())
  }

  static makeMessageRequestForAnswer(
    answer: Answer,
  ): ChallengeCorrectionRequest {
    return {
      value: {
        submissionId: answer.id.toString(),
        repositoryUrl: answer.answerLink,
      },
    }
  }

  get submissionId(): string {
    return this.props.submissionId
  }

  get repositoryUrl(): string {
    return this.props.repositoryUrl
  }

  get grade(): number {
    return this.props.grade
  }

  get status(): 'Pending' | 'Error' | 'Done' {
    return this.props.status
  }
}
