import { AttachmentType } from "@replikit/core"
import { InlineQueryReceivedContext } from "@replikit/router"
import { CardColor, CardOptionType, CardStickers, InlineManager, ModeManager } from "@uno_bot/main"
import { Card, GameInfo, InlineQueryDataResult, Mode, PlayerInfo } from "@uno_bot/main/typings"

declare module "../managers/inline.manager" {
  export interface InlineManager {
    /**
     * Sends inline menu with game not found message
     * @param context
     */
    inlineNotInGameWithContext(context: InlineQueryReceivedContext): Promise<string>

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
     * @param optionTypes
     * @param modeManager
     */
    inlineCardsWithContext(
      context: InlineQueryReceivedContext,
      game: GameInfo,
      player: PlayerInfo,
      optionTypes: CardOptionType[],
      modeManager: ModeManager): Promise<Card>

    /**
     * Sends inline menu with modes selection
     * @param context
     * @param game
     * @param modes
     */
    inlineModesWithContext(context: InlineQueryReceivedContext, game: GameInfo, modes: Mode[]): Promise<Mode>
  }
}

InlineManager.prototype.inlineNotInGameWithContext = function (context) {
  return this.inlineWithContext(context, [{
    id: "info",
    data: "info",
    article: {
      title: "NOT_IN_GAME",
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

InlineManager.prototype.inlineCardsWithContext = function (context, game, player, optionTypes: CardOptionType[], modeManager) {
  const cards: InlineQueryDataResult<Card>[] = player.cards.map((card, index) => {
    const playable = modeManager.playable(game, card)
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
          text: "WRONG_TURN"
        }
      })
    }
  })

  const optionCards: InlineQueryDataResult<Card>[] = []
  for (const optionType of optionTypes) {
    const optionCard: Card = { color: CardColor.Option, types: { option: optionType } }
    if (modeManager.playable(game, optionCard)) optionCards.push({
      id: optionType.toString(),
      data: optionCard,
      attachment: {
        id: CardStickers[optionCard.color][optionType][0],
        type: AttachmentType.Sticker
      }
    })
  }

  return this.inlineWithContext(context, [
    ...optionCards,
    ...cards.sort(a => a.message ? 1 : -1)
  ])
}

InlineManager.prototype.inlineModesWithContext = function (context, game, modes) {
  return this.inlineWithContext(context, modes.map(mode => {
    const name = mode.name.capitalize()
    const icon = game.modes.some(m => m.name === mode.name) ? "✅" : "❌"

    return {
      id: mode.name,
      data: mode,
      article: {
        title: `${icon} ${name}`,
        description: mode.description || "No description"
      },
      message: {
        text: name
      }
    }
  }))
}