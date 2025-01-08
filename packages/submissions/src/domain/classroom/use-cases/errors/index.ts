import { BaseUseCaseError } from '@/core/errors'

export class ResourceNotFoundError extends BaseUseCaseError {
  constructor() {
    super('Resource not found.')
  }
}

export class InvalidAnswerUrlError extends BaseUseCaseError {
  constructor(url: string) {
    super(`Invalid GitHub repository URL (${url}).`)
  }
}

export class InvalidDateRangeError extends BaseUseCaseError {
  constructor() {
    super('Provide both valid start and ending dates.')
  }
}
