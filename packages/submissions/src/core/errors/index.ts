import { type UseCaseError } from './use-case-error'

export class BaseUseCaseError extends Error implements UseCaseError {
  constructor(message: string) {
    super(message)
  }
}
