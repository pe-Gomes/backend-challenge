import { InMemoryAnswerRepository } from '@test/in-memory-repository/in-memory-answer-repository'
import { ListAnswersUseCase } from './list-answers'
import { createAnswer } from '@test/factories/answer'
import { InvalidDateRangeError } from './errors'

let answerRepo: InMemoryAnswerRepository
let sut: ListAnswersUseCase
describe('ListAnswers Use Case', () => {
  beforeEach(() => {
    answerRepo = new InMemoryAnswerRepository()
    sut = new ListAnswersUseCase(answerRepo)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should return a list of answers', async () => {
    for (let i = 0; i < 5; i++) {
      await answerRepo.create(createAnswer())
    }

    const res = await sut.execute({ page: 1, limit: 10 })

    expect(res.isSuccess()).toBe(true)
    if (res.isFailure()) return
    expect(res.value.answers).toHaveLength(5)
  })

  it('should return a list between a start and end date', async () => {
    const startDate = new Date('2024-01-01')
    vi.setSystemTime(startDate)

    for (let i = 0; i < 5; i++) {
      await answerRepo.create(createAnswer())
      vi.advanceTimersByTime(1000 * 60 * 60 * 24) // Advance 1 day for each run
    }

    const res = await sut.execute({
      page: 1,
      limit: 10,
      startDate,
      endDate: new Date('2024-01-03'), // 3 days after initial date
    })

    expect(res.isSuccess()).toBe(true)
    if (res.isFailure()) return
    expect(answerRepo.answers).toHaveLength(5)
    expect(res.value.answers).toHaveLength(3)
  })

  it('should return an error for mismatched start and end dates', async () => {
    const startDate = new Date('2024-01-10')
    const endDate = new Date('2024-01-05') // End date is earlier than the start date

    for (let i = 0; i < 5; i++) {
      await answerRepo.create(createAnswer())
    }

    const res = await sut.execute({
      page: 1,
      limit: 10,
      startDate,
      endDate,
    })

    expect(res.isFailure()).toBe(true)
    expect(res.value).toBeInstanceOf(InvalidDateRangeError)
  })
})
