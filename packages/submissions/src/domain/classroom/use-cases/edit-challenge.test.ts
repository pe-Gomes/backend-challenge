import { InMemoryChallengeRepository } from '@test/in-memory-repository/in-memory-challenge-repository'
import { EditChallengeUseCase } from './edit-challenge'
import { createChallenge } from '@test/factories/challenge'
import { ResourceNotFoundError } from './errors'

let challengeRepo: InMemoryChallengeRepository
let sut: EditChallengeUseCase

describe('Edit Challenge Use Case', () => {
  beforeEach(() => {
    challengeRepo = new InMemoryChallengeRepository()
    sut = new EditChallengeUseCase(challengeRepo)
  })

  it('should edit a challenge', async () => {
    const challenge = createChallenge()
    await challengeRepo.create(challenge)

    const editRequest = {
      challengeId: challenge.id.toString(),
      title: 'Edited title',
      description: 'Edited description',
    }

    const res = await sut.execute(editRequest)

    expect(res.isSuccess()).toBe(true)
    if (res.isFailure()) return
    expect(res.value?.challenge.title).toBe(editRequest.title)
    expect(res.value?.challenge.description).toBe(editRequest.description)
  })

  it('should return a failure error if challenge does not exist', async () => {
    const editRequest = {
      challengeId: '123',
      title: 'Edited title',
      description: 'Edited description',
    }
    const res = await sut.execute(editRequest)
    expect(res.isFailure()).toBe(true)
    expect(res.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
