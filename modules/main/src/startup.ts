import { createScope } from "@replikit/core"
import { GameRepository } from "@uno_bot/main"
import { EventManager } from "./managers/event.manager"

/** @internal */
export const logger = createScope("main")

/** @internal */
export const gameRepository = new GameRepository()

/** @internal */
export const eventManager = new EventManager()