import { EntityID } from './value-objects/entity-id'

export class Entity<EntityProperties> {
  protected _id: EntityID
  protected props: EntityProperties

  constructor(props: EntityProperties, id?: EntityID) {
    this.props = props
    this._id = id ?? new EntityID()
  }

  public equals(entity: Entity<unknown>): boolean {
    if (entity === this) {
      return true
    }

    if (entity.id === this._id) {
      return true
    }

    return false
  }

  get id() {
    return this._id
  }
}
