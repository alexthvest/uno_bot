import { config } from "@replikit/core"
import { AccountInfo, ChannelInfo } from "@replikit/core/typings"
import { MessageBuilder } from "@replikit/messages"
import { DefaultLocale, EventManager, RepositoryBase } from "@uno_bot/main"
import { GameInfo } from "@uno_bot/main/typings"
import moment from "moment"
import { playCardCase } from "../player"

interface StartCaseDependecies {
  gameRepository: RepositoryBase<GameInfo>
  eventManager: EventManager
}

export default function buildCase({ gameRepository, eventManager }: StartCaseDependecies) {
  return (channel: ChannelInfo, account: AccountInfo, locale: DefaultLocale) => {
    const game = gameRepository.get(channel.id)

    if (game === undefined) {
      return locale.gameNotFound
    }

    if (game.owner.id !== account.id) {
      return locale.gameNotOwner
    }

    if (game.started) {
      return locale.gameAlreadyStarted
    }

    if (game.players.length < config.uno.minPlayers) {
      return locale.gameNotEnoughPlayers
    }

    game.started = true
    game.startedAt = moment()
    game.turns.shuffle()

    const card = game.deck.drawFirst()
    playCardCase(game, { id: -1, cards: [card] }, card, locale)

    eventManager.publish("game:started", { game, card, account })

    // TODO!!!!
    // this.message(game.id, fromAttachment({
    //   id: card.stickerId,
    //   type: AttachmentType.Sticker,
    //   controllerName: "tg"
    // }))

    return new MessageBuilder()
      .addLine(locale.gameStarted)
      .addLine(locale.nextTurn(game.turns.turn!))
      .addButton({
        text: locale.buttonChooseCard,
        switchInline: { current: true, username: "" }
      })
      .build()
  }
}