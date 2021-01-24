import { config } from "@replikit/core"
import { ChannelInfo, Identifier } from "@replikit/core/typings"
import { getCardScore } from "@uno_bot/cards"
import { DefaultLocale, EventManager, RepositoryBase, winGameCase } from "@uno_bot/main"
import { GameInfo } from "@uno_bot/main/typings"

interface LeaveCaseDependecies {
  gameRepository: RepositoryBase<GameInfo>
  eventManager: EventManager
}

export default function buildCase({ gameRepository, eventManager }: LeaveCaseDependecies) {
  return (channel: ChannelInfo, accountId: Identifier, locale: DefaultLocale) => {
    const game = gameRepository.get(channel.id)

    if (game === undefined) {
      return locale.gameNotFound
    }

    if (!game.players.contains(accountId)) {
      return locale.playerNotInGame
    }

    const player = game.players.get(accountId)!

    if (game.started) {
      for (const card of player.cards) {
        game.score += getCardScore(card.type)
      }

      if (game.players.length < config.uno.minPlayers) {
        // TODO!!!!
        const wonMessage = winGameCase(game.channel, game.players.all[0], locale)
        gameRepository.remove(game.id)

        // return this.message(game.id, wonMessage)
      }

      if (game.turns.turn?.id === player.id) {
        // TODO!!!
        // const nextPlayer = game.turns.next()
        // return this.message(game.id, fromText(this._locale.nextTurn(nextPlayer)))
      }
    }

    game.deck.discard(...player.cards)
    game.players.remove(accountId)

    eventManager.publish("player:left", { game, account: player })

    return locale.playerLeft
  }
}