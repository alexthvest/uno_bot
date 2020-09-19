import { AttachmentType } from "@replikit/core"
import { locales } from "@replikit/i18n"
import { InlineQueryReceivedContext } from "@replikit/router"
import { CardColor, CardOptionType, createCard, getCardSticker, getColorEmoji } from "@uno_bot/cards"
import { Card } from "@uno_bot/cards/typings"
import { InlineManager } from "@uno_bot/inline"
import { InlineQueryDataResult } from "@uno_bot/inline/typings"
import { DefaultLocale, ModeManager } from "@uno_bot/main"
import { GameInfo, ModeInfo, PlayerInfo } from "@uno_bot/main/typings"

export class UnoInlineManager extends InlineManager {
  /**
   * Sends inline menu with game not found message
   * @param context
   */
  public inlineNotInGameWithContext(context: InlineQueryReceivedContext): Promise<string> {
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

  /**
   * Sends inline menu with game not started message
   * @param context
   */
  public inlineGameNotStartedWithContext(context: InlineQueryReceivedContext): Promise<string> {
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

  /**
   * Sends inline menu with player cards
   * @param context
   * @param game
   * @param player
   * @param optionTypes
   * @param modeManager
   */
  public inlineCardsWithContext(
    context: InlineQueryReceivedContext, game: GameInfo, player: PlayerInfo,
    optionTypes: CardOptionType[], modeManager: ModeManager
  ): Promise<Card> {
    const optionCards: InlineQueryDataResult<Card>[] = []
    const locale = context.getLocale(DefaultLocale)

    const cards: InlineQueryDataResult<Card>[] = player.cards.map((card, index) => {
      const playable = modeManager.playable(game, card)
      const stickerId = getCardSticker(card.color, card.type, !playable)

      return {
        id: `${game.id}_${player.id}_${index}`,
        data: card,
        attachment: {
          id: stickerId,
          type: AttachmentType.Sticker
        },
        ...((game.turns.turn?.id !== player.id || !playable) && {
          message: {
            text: locale.gameInfo(game, player)
          }
        })
      }
    })

    optionTypes.forEach(optionType => {
      const optionCard = createCard(CardColor.Option, optionType)

      if (!modeManager.playable(game, optionCard))
        return

      optionCards.push({
        id: optionType.toString(),
        data: optionCard,
        attachment: {
          id: optionCard.stickerId,
          type: AttachmentType.Sticker
        }
      })
    })

    return this.inlineWithContext(context, [
      ...optionCards,
      ...cards.sort(a => a.message ? 1 : -1)
    ])
  }

  /**
   * Sends inline menu with modes selection
   * @param context
   * @param game
   * @param modes
   */
  public inlineModesWithContext(context: InlineQueryReceivedContext, game: GameInfo, modes: ModeInfo[]): Promise<ModeInfo> {
    const locale = context.getLocale(DefaultLocale)
    return this.inlineWithContext(context, modes.map(mode => {
      const name = mode.id.toString().capitalize()
      const icon = game.modes.contains(mode.id) ? "✅" : "❌"

      return {
        id: name,
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

  /**
   * Sends inline menu with colors selection
   * @param game
   * @param player
   */
  public async inlineColors(game: GameInfo, player: PlayerInfo): Promise<CardColor> {
    const colors = [CardColor.Red, CardColor.Green, CardColor.Blue, CardColor.Yellow]
    const locale = locales.resolve(DefaultLocale, player.language)
    let answer: string

    const colorResults = colors.map(color => {
      const name = color.capitalize()
      const emoji = getColorEmoji(color)

      return {
        id: color,
        data: color,
        article: {
          title: `${emoji} ${name}`
        }
      }
    })

    const results = [...colorResults, {
      id: "info",
      data: "info",
      article: {
        title: locale.yourCardsTitle,
        description: player.cards.map(c => getColorEmoji(c.color)).join("")
      },
      message: {
        text: locale.gameInfo(game, player)
      }
    }]

    do {
      answer = await this.inline(player.id, { results })
    } while (answer === "info")

    return answer as CardColor
  }
}