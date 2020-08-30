import { AttachmentType } from "@replikit/core"
import { locales } from "@replikit/i18n"
import { InlineQueryReceivedContext } from "@replikit/router"
import { CardColor, CardOptionType, createCard, getCardSticker, getColorEmoji } from "@uno_bot/cards"
import { Card } from "@uno_bot/cards/typings"
import { DefaultLocale, InlineManager, ModeManager } from "@uno_bot/main"
import { GameInfo, InlineQueryDataResult, Mode, PlayerInfo } from "@uno_bot/main/typings"

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

    /**
     * Sends inline menu with colors selection
     * @param game
     * @param player
     */
    inlineColors(game: GameInfo, player: PlayerInfo): Promise<CardColor>
  }
}

InlineManager.prototype.inlineNotInGameWithContext = function (context) {
  const locale = context.getLocale(DefaultLocale)
  return this.inlineWithContext(context, [{
    id: "info",
    data: "info",
    article: {
      title: locale.notInGameTitle,
      description: locale.notInGameDescription
    },
    message: {
      text: locale.notInGameDescription
    }
  }])
}

InlineManager.prototype.inlineGameNotStartedWithContext = function (context) {
  const locale = context.getLocale(DefaultLocale)
  return this.inlineWithContext(context, [{
    id: "info",
    data: "info",
    article: {
      title: locale.gameNotStartedTitle,
      description: locale.gameNotStartedDescription
    },
    message: {
      text: locale.gameNotStartedDescription
    }
  }])
}

InlineManager.prototype.inlineCardsWithContext = function (context, game, player, optionTypes: CardOptionType[], modeManager) {
  const locale = context.getLocale(DefaultLocale)
  const cards: InlineQueryDataResult<Card>[] = player.cards.map((card, index) => {
    const playable = modeManager.playable(game, card)
    return {
      id: `${game.id}_${player.id}_${index}`,
      data: card,
      attachment: {
        id: getCardSticker(card.color, card.type, !playable),
        type: AttachmentType.Sticker
      },
      ...((game.turns.turn?.id !== player.id || !playable) && {
        message: {
          text: locale.gameInfo(game)
        }
      })
    }
  })

  const optionCards: InlineQueryDataResult<Card>[] = []
  for (const optionType of optionTypes) {
    const optionCard = createCard(CardColor.Option, optionType)
    if (!modeManager.playable(game, optionCard)) continue

    optionCards.push({
      id: optionType.toString(),
      data: optionCard,
      attachment: {
        id: optionCard.stickerId,
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
  const locale = context.getLocale(DefaultLocale)
  return this.inlineWithContext(context, modes.map(mode => {
    const name = mode.name.capitalize()
    const icon = game.modes.some(m => m.name === mode.name) ? "✅" : "❌"

    return {
      id: mode.name,
      data: mode,
      article: {
        title: `${icon} ${name}`,
        description: mode.description || locale.noDescription
      },
      message: {
        text: name
      }
    }
  }))
}

InlineManager.prototype.inlineColors = async function (game, player) {
  const colors = [CardColor.Red, CardColor.Green, CardColor.Blue, CardColor.Yellow]
  const locale = locales.resolve(DefaultLocale, player.language)

  const colorResults = colors.map(color => {
    const name = color.toString().capitalize()
    const emoji = getColorEmoji(color)

    return {
      id: color,
      data: color,
      article: { title: `${emoji} ${name}` }
    }
  })

  let answer: string
  const results = [...colorResults, {
    id: "info",
    data: "info",
    article: {
      title: locale.yourCardsTitle,
      description: player.cards.map(c => getColorEmoji(c.color)).join("")
    },
    message: {
      text: locale.gameInfo(game)
    }
  }]

  do {
    answer = await this.inline(player.id, { results })
  } while (answer === "info")

  return answer as CardColor
}