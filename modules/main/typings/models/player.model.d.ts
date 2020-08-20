import { AccountInfo } from "@replikit/core/typings"
import { Card } from "@uno_bot/main/typings"

export interface PlayerInfo extends AccountInfo {
  cards: Card[]
  drew?: boolean
}