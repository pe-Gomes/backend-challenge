import { InMemoryChallengeRepository } from '@test/in-memory-repository/in-memory-challenge-repository'
import { FindOneChallengeUseCase } from './find-one-challenge'
import { createChallenge } from '@test/factories/challenge'
import { ResourceNotFoundError } from './errors'

let challengeRepo: InMemoryChallengeRepository
let sut: FindOneChallengeUseCase

describe('FindOneChallenge Use Case', () => {
  beforeEach(() => {
    challengeRepo = new InMemoryChallengeRepository()
    sut = new FindOneChallengeUseCase(challengeRepo)
  })

  it('should find a challenge if exists', async () => {
    const challenge = createChallenge()
    await challengeRepo.create(challenge)

    const res = await sut.execute({ id: challenge.id.toString() })

    expect(res.isSuccess()).toBe(true)

    if (res.isFailure()) return

    expect(res.value.challenge.id.toString()).toEqual(challenge.id.toString())
    expect(res.value.challenge.title).toEqual(challenge.title)
    expect(res.value.challenge.description).toEqual(challenge.description)
  })

  it('should return an error if challenge does not exist', async () => {
    const res = await sut.execute({ id: 'does-not-exist' })

    expect(res.isFailure()).toBe(true)
    expect(res.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
