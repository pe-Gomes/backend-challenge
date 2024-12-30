import { InMemoryChallengeRepository } from '@test/in-memory-repository/in-memory-challenge-repository'
import { CreateChallengeUseCase } from './create-challenge'

let challengeRepo: InMemoryChallengeRepository
let sut: CreateChallengeUseCase

describe('CreateChallenge UseCase', () => {
  beforeEach(() => {
    challengeRepo = new InMemoryChallengeRepository()
    sut = new CreateChallengeUseCase(challengeRepo)
  })

  it('should create a challenge', async () => {
    const res = await sut.execute({ title: 'Test', description: 'Test' })

    expect(res.isSuccess()).toBeTruthy()
    expect(challengeRepo.challenges.length).toBe(1)
    expect(res.value?.challenge.id.toString()).toBeDefined()
    expect(res.value?.challenge.title).toEqual('Test')
    expect(res.value?.challenge.description).toEqual('Test')
    expect(res.value?.challenge.createdAt).toBeDefined()
  })
})
