import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { ChallengeRepository } from '@/domain/classroom/repositories/challenge-repository'
import { ChallengePrismaRepository } from './prisma/repositories/challenge-repository'
import { AnswerRepository } from '@/domain/classroom/repositories/answer-repository'
import { AnswerPrismaRepository } from './prisma/repositories/answer-repository'

@Module({
  providers: [
    PrismaService,
    { provide: ChallengeRepository, useClass: ChallengePrismaRepository },
    { provide: AnswerRepository, useClass: AnswerPrismaRepository },
  ],
  exports: [PrismaService, ChallengeRepository, AnswerRepository],
})
export class DatabaseModule {}
