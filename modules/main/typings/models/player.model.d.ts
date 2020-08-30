import { AccountInfo } from "@replikit/core/typings"
import { Card } from "@uno_bot/cards/typings"

export interface PlayerInfo extends AccountInfo {
  cards: Card[]
  drew?: boolean
}