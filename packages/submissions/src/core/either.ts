export class Success<L, R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  isSuccess(): this is Success<L, R> {
    return true
  }

  isFailure(): this is Failure<L, R> {
    return false
  }
}

export class Failure<L, R> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isSuccess(): this is Success<L, R> {
    return false
  }

  isFailure(): this is Failure<L, R> {
    return true
  }
}

export type Either<L, R> = Failure<L, R> | Success<L, R>

export function failure<L, R>(value: L): Failure<L, R> {
  return new Failure(value)
}

export function success<L, R>(value: R): Success<L, R> {
  return new Success(value)
}
