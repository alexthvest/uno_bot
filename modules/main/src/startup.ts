import { createScope } from "@replikit/core"
import { router } from "@replikit/router"
import { GameRepository, EventManager, InlineManager } from "@uno_bot/main"

/** @internal */
export const logger = createScope("main")

/** @internal */
export const gameRepository = new GameRepository()

/** @internal */
export const eventManager = new EventManager()

/** @internal */
export const inlineManager = new InlineManager(router)