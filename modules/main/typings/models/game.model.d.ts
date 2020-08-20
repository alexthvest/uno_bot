import { HasId } from "@replikit/core/typings"
import { RepositoryBase, DeckManager, TurnManager } from "@uno_bot/main"
import { Card, PlayerInfo } from "@uno_bot/main/typings"
import { Moment } from "moment"

export interface GameInfo extends HasId {
  ownerId: number

  players: RepositoryBase<PlayerInfo>
  lastCard?: Card

  deck: DeckManager
  turns: TurnManager

  started?: boolean
  createdAt: Moment
  startedAt?: Moment
}