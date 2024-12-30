import { InMemoryAnswerRepository } from '@test/in-memory-repository/in-memory-answer-repository'
import { AnswerChallengeUseCase } from './answer-challenge'
import { InMemoryChallengeRepository } from '@test/in-memory-repository/in-memory-challenge-repository'
import { InvalidAnswerUrlError, ResourceNotFoundError } from './errors'
import { createChallenge } from '@test/factories/challenge'

let answerRepository: InMemoryAnswerRepository
let challengeRepository: InMemoryChallengeRepository
let sut: AnswerChallengeUseCase

describe('AnswerChallenge Use Case', () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswerRepository()
    challengeRepository = new InMemoryChallengeRepository()
    sut = new AnswerChallengeUseCase(answerRepository, challengeRepository)
  })

  it('should return an error if answer URL is invalid', async () => {
    const challenge = createChallenge()
    await challengeRepository.create(challenge)

    const newAnswerRequest = {
      challengeId: challenge.id.toString(),
      answerLink: 'https://google.com',
    }
    const res = await sut.execute(newAnswerRequest)
    expect(res.isFailure()).toBe(true)
    expect(res.value).toBeInstanceOf(InvalidAnswerUrlError)

    // Check created answer status
    const failedAnswer = answerRepository.answers[0]
    expect(failedAnswer.id).toBeDefined()
    expect(failedAnswer.status).toBe('Error')
  })

  it('should return an error if challenge does not exists', async () => {
    const newAnswerRequest = {
      challengeId: 'random-id',
      answerLink: 'https://github.com/some-user/repo',
    }

    const res = await sut.execute(newAnswerRequest)

    expect(res.isFailure()).toBe(true)
    expect(res.value).toBeInstanceOf(ResourceNotFoundError)

    // Check created answer status
    const failedAnswer = answerRepository.answers[0]
    expect(failedAnswer.id).toBeDefined()
    expect(failedAnswer.status).toBe('Error')
  })

  it('should answer a valid challenge', async () => {
    const challenge = createChallenge()
    await challengeRepository.create(challenge)

    const newAnswerRequest = {
      challengeId: challenge.id.toString(),
      answerLink: 'https://github.com/some-user/repo',
    }

    const res = await sut.execute(newAnswerRequest)

    expect(res.isSuccess()).toBe(true)
    if (res.isFailure()) return

    const answer = res.value.answer
    expect(answer.id).toBeDefined()
    expect(answer.challengeId.toString()).toBe(challenge.id.toString())
    expect(answer.answerLink).toBe(newAnswerRequest.answerLink)
  })
})
