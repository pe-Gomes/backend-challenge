import { Module } from '@nestjs/common'
import { KafkaService } from './kafka/kafka.service'
import { EnvService } from '../env/env.service'
import { CorrectionMessageRepository } from '@/domain/events/repositories/correction-message'
import { KafkaCorrectionMessageRepository } from './kafka/repositories/correction-message'
import { DatabaseModule } from '../db/db.module'

@Module({
  imports: [DatabaseModule],
  providers: [
    KafkaService,
    EnvService,
    {
      provide: CorrectionMessageRepository,
      useClass: KafkaCorrectionMessageRepository,
    },
  ],
  exports: [KafkaService, CorrectionMessageRepository],
})
export class MessagingModule {}
