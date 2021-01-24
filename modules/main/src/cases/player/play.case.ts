import { MessageBuilder } from "@replikit/messages"
import { isOptionCardType } from "@uno_bot/cards"
import { Card } from "@uno_bot/cards/typings"
import { DefaultLocale, EventManager, ModeManager, winGameCase, endGameCase } from "@uno_bot/main"
import { GameInfo, PlayerInfo } from "@uno_bot/main/typings"

interface PlayCaseDependecies {
  eventManager: EventManager
  modeManager: ModeManager
}

export default function buildCase({ eventManager, modeManager }: PlayCaseDependecies) {
  return async (game: GameInfo, player: PlayerInfo, card: Card, locale: DefaultLocale) => {
    if (player.id !== -1 && game.turns.turn?.id !== player.id) {
      return
    }

    if (player.id !== -1 && !modeManager.playable(game, card)) {
      return
    }

    if (isOptionCardType(card.type)) {
      return modeManager.play(game, player, card)
    }

    player.cards.remove(card)
    game.deck.discard(card)
    game.previousCard = card

    await modeManager.play(game, player, card)

    if (game.turns.turn && player.cards.length === 0) {
      const wonMessage = winGameCase(game.channel, player, locale)
      const endMessage = endGameCase(game.channel, player, locale)

      // await this.message(game.id, wonMessage)
      // return this.message(game.id, endMessage)
    }

    if (game.turns.turn && player.cards.length === 1) {
      // return this.message(game.id, fromText(this._locale.uno))
    }

    eventManager.publish("player:card", { game, account: player, card })

    if (!game.started) {
      return
    }

    const nextPlayer = game.turns.next()
    eventManager.publish("player:turn", { game, account: nextPlayer })

    return new MessageBuilder()
      .addText(locale.nextTurn(nextPlayer))
      .addButton({
        text: locale.buttonChooseCard,
        switchInline: { current: true, username: "" }
      })
      .build()
  }
}