import { join } from 'path'

import { AnswerChallengeUseCase } from '@/domain/classroom/use-cases/answer-challenge'
import { CreateChallengeUseCase } from '@/domain/classroom/use-cases/create-challenge'
import { EditChallengeUseCase } from '@/domain/classroom/use-cases/edit-challenge'
import { FindOneChallengeUseCase } from '@/domain/classroom/use-cases/find-one-challenge'
import { ListChallengesUseCase } from '@/domain/classroom/use-cases/list-challenges'
import { RemoveChallengeUseCase } from '@/domain/classroom/use-cases/remove-challenge'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { DatabaseModule } from '../db/db.module'
import { GetChallengeResolver } from './graphql/resolvers/challenge/get-challenge-resolver'
import { ListChallengesResolver } from './graphql/resolvers/challenge/list-challenges-resolver'
import { CreateChallengeResolver } from './graphql/resolvers/challenge/new-challenge-resolver'
import { RemoveChallengeResolver } from './graphql/resolvers/challenge/remove-challenge-resolver'
import { UpdateChallengeResolver } from './graphql/resolvers/challenge/update-challenge-resolver'
import { AnswerChallengeResolver } from './graphql/resolvers/answer/answer-challenge-resolver'
import { OnChallengeCorrection } from '@/domain/events/use-cases/on-challenge-correction'
import { MessagingModule } from '../messaging/messaging.module'
import { ListAnswersUseCase } from '@/domain/classroom/use-cases/list-answers'
import { ListAnswersResolver } from './graphql/resolvers/answer/list-answers'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/infra/http/graphql/schema.gql'),
    }),
    DatabaseModule,
    MessagingModule,
  ],
  providers: [
    CreateChallengeResolver,
    GetChallengeResolver,
    ListChallengesResolver,
    UpdateChallengeResolver,
    RemoveChallengeResolver,
    AnswerChallengeResolver,
    ListAnswersResolver,
    CreateChallengeUseCase,
    FindOneChallengeUseCase,
    ListChallengesUseCase,
    ListAnswersUseCase,
    EditChallengeUseCase,
    RemoveChallengeUseCase,
    AnswerChallengeUseCase,
    OnChallengeCorrection,
  ],
})
export class HttpModule {}
