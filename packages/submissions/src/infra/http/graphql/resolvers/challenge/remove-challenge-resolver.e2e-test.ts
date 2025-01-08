import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/db/db.module'
import { type NestExpressApplication } from '@nestjs/platform-express'
import { Test } from '@nestjs/testing'
import { ChallengeFactory } from '@test/factories/challenge'
import request from 'supertest'

describe('Update Challenge Resolver', () => {
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

  it('[MUTATION] removeChallengeById', async () => {
    const challenge = await challengeFactory.makePrismaChallenge()

    const query = `
    mutation {
        removeChallengeById(id: "${challenge.id.toString()}")
      }
    `
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })

    expect(res.status).toBe(200)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(res.body.data).toMatchObject({ removeChallengeById: true })
  })
})
