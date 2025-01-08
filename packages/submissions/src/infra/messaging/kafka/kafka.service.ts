import { EnvService } from '@/infra/env/env.service'
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { Partitioners } from 'kafkajs'

@Injectable()
export class KafkaService
  extends ClientKafka
  implements OnModuleInit, OnModuleDestroy
{
  constructor(env: EnvService) {
    super({
      producer: {
        allowAutoTopicCreation: true,
        createPartitioner: Partitioners.LegacyPartitioner,
      },
      client: {
        brokers: [env.get('KAFKA_BROKERS')],
      },
      consumer: {
        groupId: env.get('KAKFA_CHALLENGE_CONSUMER'),
      },
    })
  }

  async onModuleInit() {
    this.subscribeToResponseOf('challenge.correction')
    await this.connect()
  }

  async onModuleDestroy() {
    await this.close()
  }
}
