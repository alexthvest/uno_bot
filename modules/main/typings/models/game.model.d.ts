import { HasId } from "@replikit/core/typings"
import { RepositoryBase, DeckManager } from "@uno_bot/main"
import { PlayerInfo } from "@uno_bot/main/typings"
import { Moment } from "moment"

export interface GameInfo extends HasId {
  ownerId: number

  players: RepositoryBase<PlayerInfo>
  deck: DeckManager

  started?: boolean

  createdAt: Moment
  startedAt?: Moment
}