import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/db/db.module'
import { type NestExpressApplication } from '@nestjs/platform-express'
import { Test } from '@nestjs/testing'
import { ChallengeFactory } from '@test/factories/challenge'
import request from 'supertest'

describe('Get Challenge Resolver', () => {
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

  it('[QUERY] challenge', async () => {
    const challenge = await challengeFactory.makePrismaChallenge()

    const query = `
    query {
      challenge(id: "${challenge.id.toString()}") {
        id
        title
        description
        createdAt
      }
    }
    `
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })

    expect(res.status).toBe(200)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(res.body.data.challenge).toMatchObject({
      id: challenge.id.toString(),
      title: challenge.title,
      description: challenge.description,
      createdAt: challenge.createdAt.toJSON(),
    })
  })
})
