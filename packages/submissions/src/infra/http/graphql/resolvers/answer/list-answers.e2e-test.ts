/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/db/db.module'
import { type NestExpressApplication } from '@nestjs/platform-express'
import { Test } from '@nestjs/testing'
import { AnswerFactory } from '@test/factories/answer'
import { ChallengeFactory } from '@test/factories/challenge'
import request from 'supertest'

describe('List Answers Resolver', () => {
  let app: NestExpressApplication
  let challengeFactory: ChallengeFactory
  let answerFactory: AnswerFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ChallengeFactory, AnswerFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    challengeFactory = moduleRef.get(ChallengeFactory)
    answerFactory = moduleRef.get(AnswerFactory)

    await app.init()
  })

  it('[QUERY] answers', async () => {
    const challenge = await challengeFactory.makePrismaChallenge()

    for (let i = 0; i < 5; i++) {
      await answerFactory.makePrismaAnswer({
        challengeId: challenge.id,
      })
    }

    const query = `
    query Challenge {
      challenge(id: "${challenge.id.toString()}") {
          createdAt
          description
          title
          id
          answers {
              id
              answerLink
              status
              grade
              createdAt
          }
      }
    }
    `
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })

    expect(res.status).toBe(200)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(res.body.data.challenge.answers).toHaveLength(5)
  })
})
