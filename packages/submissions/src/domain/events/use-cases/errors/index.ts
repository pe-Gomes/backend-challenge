import { BaseUseCaseError } from '@/core/errors'

export class MicrosserviceTimeoutError extends BaseUseCaseError {
  constructor() {
    super('Microsservice timed out.')
  }
}
