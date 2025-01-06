import { EnvService } from '@/infra/env/env.service'
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  constructor(env: EnvService) {
    super({
      log:
        env.get('NODE_ENV') === 'production'
          ? ['error']
          : ['info', 'query', 'warn', 'error'],
    })
  }

  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
