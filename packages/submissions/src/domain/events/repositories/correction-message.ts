import { type ChallengeCorrectionRequest } from '../entities/challenge-correction'
import { type Observable } from 'rxjs'

export abstract class CorrectionMessageRepository {
  abstract send({
    value: { submissionId, repositoryUrl },
  }: ChallengeCorrectionRequest): Observable<unknown>
}
