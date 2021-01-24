import { AccountInfo, ChannelInfo } from "@replikit/core/typings"
import { DefaultLocale, EventManager, RepositoryBase, leaveGameCase } from "@uno_bot/main"
import { GameInfo } from "@uno_bot/main/typings"

interface KickCaseDependecies {
  gameRepository: RepositoryBase<GameInfo>
  eventManager: EventManager
}

export default function buildCase({ gameRepository, eventManager }: KickCaseDependecies) {
  return (channel: ChannelInfo, account: AccountInfo, target: AccountInfo | undefined, locale: DefaultLocale) => {
    const game = gameRepository.get(channel.id)

    if (game === undefined) {
      return locale.gameNotFound
    }

    if (game.owner.id !== account.id) {
      return locale.gameNotOwner
    }

    if (target?.id === undefined) {
      return locale.noKickTarget
    }

    if (!game.players.contains(target.id)) {
      return locale.playerNotInGame
    }

    leaveGameCase(channel, target.id, locale)

    eventManager.publish("player:kicked", {
      game, account: game.players.get(target.id)!
    })

    return locale.playerKicked
  }
}