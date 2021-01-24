import { AccountInfo, ChannelInfo } from "@replikit/core/typings"
import { DefaultLocale, EventManager, RepositoryBase } from "@uno_bot/main"
import { GameInfo } from "@uno_bot/main/typings"

interface CloseCaseDependecies {
  gameRepository: RepositoryBase<GameInfo>
  eventManager: EventManager
}

export default function buildCase({ gameRepository, eventManager }: CloseCaseDependecies) {
  return (channel: ChannelInfo, account: AccountInfo, locale: DefaultLocale) => {
    const game = gameRepository.get(channel.id)

    if (game === undefined) {
      return locale.gameNotFound
    }

    if (game.owner.id !== account.id) {
      return locale.gameNotOwner
    }

    gameRepository.remove(channel.id)
    eventManager.publish("game:closed", { game, account })

    return locale.gameClosed
  }
}