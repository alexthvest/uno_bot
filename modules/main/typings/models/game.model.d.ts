import { HasId } from "@replikit/core/typings"
import { Moment } from "moment"

export interface Game extends HasId {
  ownerId: number

  started?: boolean

  createdAt: Moment
  startedAt?: Moment
}