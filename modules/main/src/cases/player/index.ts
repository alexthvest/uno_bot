import { gameRepository, eventManager, modeManager } from "@uno_bot/main"
import buildJoinCase from "./join.case"
import buildLeaveCase from "./leave.case"
import buildWinCase from "./win.case"
import buildKickCase from "./kick.case"
import buildPlayCase from "./play.case"

export const joinGameCase = buildJoinCase({ gameRepository, eventManager })
export const leaveGameCase = buildLeaveCase({ gameRepository, eventManager })
export const winGameCase = buildWinCase({ gameRepository, eventManager })
export const kickPlayerCase = buildKickCase({ gameRepository, eventManager })
export const playCardCase = buildPlayCase({ eventManager, modeManager })