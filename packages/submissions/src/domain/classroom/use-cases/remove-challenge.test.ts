import { InMemoryChallengeRepository } from '@test/in-memory-repository/in-memory-challenge-repository'
import { RemoveChallengeUseCase } from './remove-challenge'
import { ResourceNotFoundError } from './errors'
import { createChallenge } from '@test/factories/challenge'

let challengeRepo: InMemoryChallengeRepository
let sut: RemoveChallengeUseCase

describe('Remove Challenge Use Case', () => {
  beforeEach(() => {
    challengeRepo = new InMemoryChallengeRepository()
    sut = new RemoveChallengeUseCase(challengeRepo)
  })

  it('should return ResourceNotFoundError if challenge does not exist', async () => {
    const res = await sut.execute({ challengeId: 'invalid-id' })

    expect(res.isFailure()).toBe(true)
    expect(res.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should remove challenge', async () => {
    const challenge = createChallenge()
    await challengeRepo.create(challenge)

    const res = await sut.execute({ challengeId: challenge.id.toString() })

    expect(res.isSuccess()).toBe(true)
    expect(await challengeRepo.getById(challenge.id)).toBeNull()
    expect(challengeRepo.challenges).toHaveLength(0)
  })
})
