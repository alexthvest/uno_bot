import { AccountInfo } from "@replikit/core/typings"
import { Game } from "@uno_bot/main/typings"

export interface PlayerInfo extends AccountInfo {
  game: Game
  bot?: boolean
}