import { AccountInfo } from "@replikit/core/typings"
import { GameInfo } from "@uno_bot/main/typings"

declare module "@uno_bot/main/typings/events/index.events" {
  export interface EventContextMap {
    "game:created": GameCreatedContext
    "game:closed": GameClosedContext
  }
}
export interface GameContextBase {
  game: GameInfo
  sender: AccountInfo
}

export interface GameCreatedContext extends GameContextBase {}

export interface GameClosedContext extends GameContextBase {}