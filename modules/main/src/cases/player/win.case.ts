import { ChannelInfo } from "@replikit/core/typings"
import { getCardScore } from "@uno_bot/cards"
import { DefaultLocale, EventManager, RepositoryBase } from "@uno_bot/main"
import { GameInfo, PlayerInfo } from "@uno_bot/main/typings"

interface WinCaseDependecies {
  gameRepository: RepositoryBase<GameInfo>
  eventManager: EventManager
}

export default function buildCase({ gameRepository, eventManager }: WinCaseDependecies) {
  return (channel: ChannelInfo, player: PlayerInfo, locale: DefaultLocale) => {
    const game = gameRepository.get(channel.id)

    if (game === undefined)
      return locale.gameNotFound

    if (!game.started)
      return locale.gameNotStarted

    game.score += game.players.all.filter(p => p.id !== player.id).reduce((score, player) => {
      for (const card of player.cards) {
        score += getCardScore(card.type)
      }
      return score
    }, 0)

    eventManager.publish("player:won", { game, account: player, score: game.score })
    return locale.playerWon(player, game.score)
  }
}