import { BaseUseCaseError } from '@/core/errors'

export class MicroserviceTimeoutError extends BaseUseCaseError {
  constructor() {
    super('Microservice timed out.')
  }
}
