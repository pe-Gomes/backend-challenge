import { Env } from '@/infra/env'
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log:
        (process.env.NODE_ENV as Env['NODE_ENV']) === 'production'
          ? ['warn', 'error']
          : ['info', 'query', 'warn', 'error'],
    })
  }

  async onModuleDestroy() {
    await this.$connect()
  }

  async onModuleInit() {
    await this.$disconnect()
  }
}
