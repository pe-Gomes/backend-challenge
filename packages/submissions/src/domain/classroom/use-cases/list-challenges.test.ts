import { InMemoryChallengeRepository } from '@test/in-memory-repository/in-memory-challenge-repository'
import { ListChallengesUseCase } from './list-challenges'
import { createChallenge } from '@test/factories/challenge'

let challengeRepo: InMemoryChallengeRepository
let sut: ListChallengesUseCase

describe('GetManyChallenges Use Case', () => {
  beforeEach(() => {
    challengeRepo = new InMemoryChallengeRepository()
    sut = new ListChallengesUseCase(challengeRepo)
  })

  it('should return a list o challenges', async () => {
    for (let i = 0; i < 5; i++) {
      await challengeRepo.create(createChallenge())
    }

    const res = await sut.execute({ page: 1, limit: 10 })

    expect(res.isSuccess()).toBe(true)
    expect(res.value?.challenges.length).toBe(5)
  })

  it('should return a list of challenges with search', async () => {
    await challengeRepo.create(createChallenge({ title: 'averyuniqueword', description: "another random phrase" }))
    await challengeRepo.create(createChallenge({ title: 'lorem ipsum', description: "random" }))

    const res = await sut.execute({ page: 1, limit: 10, search: 'averyuniqueword' })
    expect(res.isSuccess()).toBe(true)
    expect(res.value?.challenges).toHaveLength(1)
  })

  it('should return empty if requested page is out of bounds', async () => {
    for (let i = 0; i < 5; i++) {
      await challengeRepo.create(createChallenge())
    }

    const res = await sut.execute({ page: 2, limit: 5 })

    expect(res.isSuccess()).toBe(true)
    expect(res.value?.challenges).toHaveLength(0)
  })
})
