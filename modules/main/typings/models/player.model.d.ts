import { AccountInfo } from "@replikit/core/typings"
import { GameInfo, Card } from "@uno_bot/main/typings"

export interface PlayerInfo extends AccountInfo {
  game: GameInfo
  cards: Card[]
  drew?: boolean
}