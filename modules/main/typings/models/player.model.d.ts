import { AccountInfo } from "@replikit/core/typings"
import { GameInfo } from "@uno_bot/main/typings"

export interface PlayerInfo extends AccountInfo {
  game: GameInfo
  bot?: boolean
}