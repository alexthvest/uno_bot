import { AccountInfo } from "@replikit/core/typings"
import { Card } from "@uno_bot/cards/typings"
import { GameInfo } from "@uno_bot/main/typings"

declare module "@uno_bot/main/typings/events/index.events" {
  export interface EventContextMap {
    "game:created": GameCreatedContext
    "game:closed": GameClosedContext
    "game:ended": GameEndedContext
    "game:started": GameStartedContext
  }
}

export interface GameContextBase {
  game: GameInfo
  account: AccountInfo
}

export interface GameCreatedContext extends GameContextBase {

}

export interface GameClosedContext extends GameContextBase {

}

export interface GameEndedContext extends GameContextBase {

}

export interface GameStartedContext extends GameContextBase {
  card: Card
}