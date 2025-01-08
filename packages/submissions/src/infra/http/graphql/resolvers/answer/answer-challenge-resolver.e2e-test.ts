/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/db/db.module'
import { type NestExpressApplication } from '@nestjs/platform-express'
import { Test } from '@nestjs/testing'
import { ChallengeFactory } from '@test/factories/challenge'
import request from 'supertest'

describe('Answer Challenge Resolver', () => {
  let app: NestExpressApplication
  let challengeFactory: ChallengeFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ChallengeFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    challengeFactory = moduleRef.get(ChallengeFactory)

    await app.init()
  })

  it('[MUTATION] answerChallenge', async () => {
    const challenge = await challengeFactory.makePrismaChallenge()

    const query = `
    mutation {
        answerChallenge(data: {
          challengeId: "${challenge.id.toString()}",
          answerLink: "https://github.com/some-user/some-repo",
        }) {
          id
          answerLink
          status
          grade
          createdAt
        }
      }
    `
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })

    expect(res.status).toBe(200)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(res.body.data.answerChallenge).toMatchObject({
      id: expect.any(String),
      status: 'Done',
      grade: expect.any(Number),
      createdAt: expect.any(String),
    })
  })
})
