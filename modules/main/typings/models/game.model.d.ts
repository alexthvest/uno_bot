import { HasId } from "@replikit/core/typings"
import { RepositoryBase, DeckManager, TurnManager } from "@uno_bot/main"
import { Card, Mode, PlayerInfo } from "@uno_bot/main/typings"
import { Moment } from "moment"

export interface GameInfo extends HasId {
  ownerId: number
  previousCard?: Card

  players: RepositoryBase<PlayerInfo>
  modes: Mode[]

  deck: DeckManager
  turns: TurnManager

  started?: boolean
  createdAt: Moment
  startedAt?: Moment
}