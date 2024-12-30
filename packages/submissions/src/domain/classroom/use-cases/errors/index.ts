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
