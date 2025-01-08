import { CorrectionMessageRepository } from '@/domain/events/repositories/correction-message'
import { Injectable } from '@nestjs/common'
import {
  ChallengeCorrectionProps,
  ChallengeCorrectionRequest,
} from '@/domain/events/entities/challenge-correction'
import { Observable, of, throwError } from 'rxjs'

@Injectable()
export class InMemoryCorrectionMessageRepository
  implements CorrectionMessageRepository {
  public messages: Record<string, unknown[]> = {}

  send(messageData: ChallengeCorrectionRequest): Observable<unknown> {
    const topic = 'challenge.correction'

    // Simulate storing the message in an in-memory store
    if (!this.messages[topic]) {
      this.messages[topic] = []
    }

    this.messages[topic].push(messageData)

    const simulatedResponse = this.simulateResponse(messageData)
    return simulatedResponse.success
      ? of(simulatedResponse.data)
      : throwError(() => new Error())
  }

  private simulateResponse(messageData: ChallengeCorrectionRequest): {
    success: boolean
    data?: unknown
  } {
    if (!messageData.value.submissionId && !messageData.value.repositoryUrl) {
      return {
        success: false,
      }
    }

    // Expected successfull response data
    const data: ChallengeCorrectionProps = {
      grade: Math.floor(Math.random() * 10) + 1,
      status: 'Done',
      submissionId: messageData.value.submissionId,
      repositoryUrl: messageData.value.repositoryUrl,
    }

    return {
      success: true,
      data,
    }
  }
}
