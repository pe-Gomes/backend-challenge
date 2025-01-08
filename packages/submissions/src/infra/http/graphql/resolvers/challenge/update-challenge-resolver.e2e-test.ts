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

  it('[MUTATION] updateChallenge', async () => {
    const challenge = await challengeFactory.makePrismaChallenge()

    const query = `
    mutation {
        updateChallenge(data: {
          challengeId: "${challenge.id.toString()}",
          title: "Updated Challenge Title",
          description: "Updated description for the challenge."
        }) {
          id
          title
          description
        }
      }
    `
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })

    expect(res.status).toBe(200)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(res.body.data.updateChallenge).toMatchObject({
      title: 'Updated Challenge Title',
      description: 'Updated description for the challenge.',
    })
  })
})
