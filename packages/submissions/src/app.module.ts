import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './infra/env'
import { EnvModule } from './infra/env/env.module'
import { HttpModule } from './infra/http/http.module'
import { MessagingModule } from './infra/messaging/messaging.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    HttpModule,
    MessagingModule,
  ],
})
export class AppModule {}
