import { AttachmentType } from "@replikit/core"
import { InlineQueryReceivedContext } from "@replikit/router"
import { CardStickers, InlineManager } from "@uno_bot/main"
import { Card, GameInfo, InlineQueryDataResult, PlayerInfo } from "@uno_bot/main/typings"

declare module "../managers/inline.manager" {
  export interface InlineManager {
    /**
     * Sends inline menu with game not found message
     * @param context
     */
    inlineGameNotFoundWithContext(context: InlineQueryReceivedContext): Promise<string>

    /**
     * Sends inline menu with game not started message
     * @param context
     */
    inlineGameNotStartedWithContext(context: InlineQueryReceivedContext): Promise<string>

    /**
     * Sends inline menu with player cards
     * @param context
     * @param game
     * @param player
     */
    inlineCardsWithContext(context: InlineQueryReceivedContext, game: GameInfo, player: PlayerInfo): Promise<Card>
  }
}

InlineManager.prototype.inlineGameNotFoundWithContext = function (context) {
  return this.inlineWithContext(context, [{
    id: "info",
    data: "info",
    article: {
      title: "GAME_NOT_FOUND",
      description: "DESCRIPTION"
    },
    message: {
      text: "DESCRIPTION"
    }
  }])
}

InlineManager.prototype.inlineGameNotStartedWithContext = function (context) {
  return this.inlineWithContext(context, [{
    id: "info",
    data: "info",
    article: {
      title: "GAME_NOT_STARTED",
      description: "DESCRIPTION"
    },
    message: {
      text: "DESCRIPTION"
    }
  }])
}

InlineManager.prototype.inlineCardsWithContext = function (context, game, player) {
  const cards: InlineQueryDataResult<Card>[] = player.cards.map((card, index) => {
    const playable = game.lastCard?.color === card.color
    const stickers = CardStickers[card.color][card.types.default || card.types.special || ""]

    return {
      id: `${game.id}_${player.id}_${index}`,
      data: card,
      attachment: {
        id: stickers[playable ? 0 : 1],
        type: AttachmentType.Sticker
      },
      ...((game.turns.turn?.id !== player.id || !playable) && {
        message: {
          text: "NOT_YOUR_TURN"
        }
      })
    }
  })

  return this.inlineWithContext(context, cards.sort(a => a.message ? 1 : -1))
}