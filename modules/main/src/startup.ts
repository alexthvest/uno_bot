import { createScope } from "@replikit/core"
import { GameRepository, EventManager } from "@uno_bot/main"

/** @internal */
export const logger = createScope("main")

/** @internal */
export const gameRepository = new GameRepository()

/** @internal */
export const eventManager = new EventManager()