import { ChannelInfo } from "@replikit/core/typings"
import { DefaultLocale, EventManager, RepositoryBase } from "@uno_bot/main"
import { GameInfo, PlayerInfo } from "@uno_bot/main/typings"

interface EndCaseDependecies {
  gameRepository: RepositoryBase<GameInfo>
  eventManager: EventManager
}

export default function buildCase({ gameRepository, eventManager }: EndCaseDependecies) {
  return (channel: ChannelInfo, player: PlayerInfo, locale: DefaultLocale) => {
    const game = gameRepository.get(channel.id)

    if (game === undefined) {
      return locale.gameNotFound
    }

    if (!game.started) {
      return locale.gameNotStarted
    }

    game.started = false

    gameRepository.remove(channel.id)
    eventManager.publish("game:ended", { game, account: player })

    return locale.gameEnded
  }
}