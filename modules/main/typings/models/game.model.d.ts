import { AccountInfo, ChannelInfo, HasId } from "@replikit/core/typings"
import { Card } from "@uno_bot/cards/typings"
import { DeckManager, RepositoryBase, TurnManager } from "@uno_bot/main"
import { ModeInfo, PlayerInfo } from "@uno_bot/main/typings"
import { Moment } from "moment"

export interface GameInfo extends HasId {
  channel: ChannelInfo
  owner: AccountInfo

  previousCard?: Card
  score: number

  players: RepositoryBase<PlayerInfo>
  modes: RepositoryBase<ModeInfo>

  deck: DeckManager
  turns: TurnManager

  started?: boolean
  createdAt: Moment
  startedAt?: Moment
}