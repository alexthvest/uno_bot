import { gameRepository, eventManager } from "@uno_bot/main"
import buildCreateCase from "./create.case"
import buildCloseCase from "./close.case"
import buildStartCase from "./start.case"
import buildEndCase from "./end.case"

export const createGameCase = buildCreateCase({ gameRepository, eventManager })
export const closeGameCase = buildCloseCase({ gameRepository, eventManager })
export const startGameCase = buildStartCase({ gameRepository, eventManager })
export const endGameCase = buildEndCase({ gameRepository, eventManager })