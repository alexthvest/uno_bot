import { createScope } from "@replikit/core"
import { GameRepository, PlayerRepository } from "@uno_bot/main"

/** @internal */
export const logger = createScope("main")

/** @internal */
export const gameRepository = new GameRepository()

/** @internal */
export const playerRepository = new PlayerRepository()