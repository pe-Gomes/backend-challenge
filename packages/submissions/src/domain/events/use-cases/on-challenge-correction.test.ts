import { InMemoryAnswerRepository } from '@test/in-memory-repository/in-memory-answer-repository'
import { OnChallengeCorrection } from './on-challenge-correction'
import { InMemoryCorrectionMessageRepository } from '@test/in-memory-repository/events/in-memory-correction-message'
import { createAnswer } from '@test/factories/answer'

describe('On Challenge Correction Use Case', () => {
  let answerRepo: InMemoryAnswerRepository
  let correctionMessageRepo: InMemoryCorrectionMessageRepository
  let onChallengeCorrection: OnChallengeCorrection

  beforeEach(() => {
    answerRepo = new InMemoryAnswerRepository()
    correctionMessageRepo = new InMemoryCorrectionMessageRepository()
    onChallengeCorrection = new OnChallengeCorrection(
      answerRepo,
      correctionMessageRepo,
    )
  })

  it('should successfully process and update the answer', async () => {
    const answer = createAnswer()
    await answerRepo.create(answer)

    const result = await onChallengeCorrection.execute({ answer })

    expect(result.isSuccess()).toBe(true)
    expect(result.value).toEqual({ answer })
    const updatedAnswer = await answerRepo.getById(answer.id)
    expect(updatedAnswer?.grade).toBeDefined()
    expect(updatedAnswer?.status).toBe('Done')
  })
})
