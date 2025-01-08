import { CorrectionMessageRepository } from '@/domain/events/repositories/correction-message'
import { Injectable } from '@nestjs/common'
import { KafkaService } from '../kafka.service'
import { ChallengeCorrectionRequest } from '@/domain/events/entities/challenge-correction'
import { Observable } from 'rxjs'

@Injectable()
export class KafkaCorrectionMessageRepository
  implements CorrectionMessageRepository
{
  constructor(private readonly kafka: KafkaService) {}

  send(messageData: ChallengeCorrectionRequest): Observable<unknown> {
    return this.kafka.send('challenge.correction', messageData)
  }
}
