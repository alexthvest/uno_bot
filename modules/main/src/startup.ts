import { createScope } from "@replikit/core"
import { GameRepository } from "@uno_bot/main"

/** @internal */
export const logger = createScope("main")

/** @internal */
export const gameRepository = new GameRepository()