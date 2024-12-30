import { BaseUseCaseError } from '@/core/errors'

export class ResourceNotFoundError extends BaseUseCaseError {
  constructor() {
    super('Resource not found.')
  }
}

