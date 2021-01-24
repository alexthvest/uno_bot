import { AccountInfo, ChannelInfo } from "@replikit/core/typings"
import { DefaultLocale, EventManager, RepositoryBase } from "@uno_bot/main"
import { GameInfo } from "@uno_bot/main/typings"

interface JoinCaseDependecies {
  gameRepository: RepositoryBase<GameInfo>
  eventManager: EventManager
}

export default ({ gameRepository, eventManager }: JoinCaseDependecies) => {
  return (channel: ChannelInfo, account: AccountInfo, locale: DefaultLocale) => {
    const game = gameRepository.get(channel.id)

    if (game === undefined) {
      return locale.gameNotFound
    }

    if (gameRepository.has(game => game.players.contains(account.id))) {
      return locale.playerAlreadyJoined
    }

    if (game.started) {
      return locale.gameAlreadyStarted
    }

    const player = game.players.add({
      ...account,
      cards: game.deck.drawFew(7)
    })

    eventManager.publish("player:joined", {
      game, account: player
    })

    return locale.playerJoined
  }
}