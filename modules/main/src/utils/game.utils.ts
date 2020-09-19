import { AccountInfo, ChannelInfo } from "@replikit/core/typings"
import { DeckManager, defaultMode, ModeRepository, PlayerRepository, TurnManager } from "@uno_bot/main"
import { GameInfo } from "@uno_bot/main/typings"
import moment from "moment"

/**
 * Creates new game from channel and account
 * @param channel
 * @param owner
 */
export function createGame(channel: ChannelInfo, owner: AccountInfo): GameInfo {
  const playerRepository = new PlayerRepository()
  const modeRepository = new ModeRepository(defaultMode)

  const deckManager = new DeckManager()
  const turnManager = new TurnManager(playerRepository)

  return {
    id: channel.id,
    channel, owner,

    players: playerRepository,
    modes: modeRepository,

    deck: deckManager,
    turns: turnManager,

    score: 0,
    createdAt: moment()
  }
}