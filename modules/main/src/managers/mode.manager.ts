import { resolveController } from "@replikit/core"
import { locales } from "@replikit/i18n"
import { CardOptionType, CardSpecialType, CardType, DefaultLocale, InlineManager } from "@uno_bot/main"
import { Card, GameInfo, Mode, ModeRuleContext, PlayerInfo } from "@uno_bot/main/typings"

export class ModeManager {
  private readonly _modes: Mode[]
  private readonly _inlineManager: InlineManager

  /**
   * Returns all registered modes
   */
  public get modes(): Mode[] { return this._modes }

  /**
   *
   * @param inlineManager
   * @param modes
   */
  public constructor(inlineManager: InlineManager, ...modes: Mode[]) {
    this._inlineManager = inlineManager
    this._modes = modes
  }

  /**
   * Checks if card is playable
   * @param game
   * @param card
   */
  public playable(game: GameInfo, card: Card): boolean {
    if (game.previousCard?.color !== card.color && game.previousCard?.types.default !== card.types.default &&
      card.types.special === undefined && card.types.option === undefined)
      return false

    const context = this.createContext(game, game.turns.turn!, card)
    return game.modes.every(mode => {
      const rule = mode.rules.find(r => this.isValidCard(card, r.card))
      return (rule && rule.playable) ? rule.playable(context) : true
    })
  }

  /**
   * Plays the card
   * @param game
   * @param player
   * @param card
   */
  public async play(game: GameInfo, player: PlayerInfo, card: Card): Promise<void> {
    const mode = game.modes.find(m => m.rules.some(rule => this.isValidCard(card, rule.card)))
    const rule = mode?.rules.find(rule => this.isValidCard(card, rule.card))

    if (rule && game.turns.turn) {
      const context = this.createContext(game, player, card)
      await rule.handle(context)
    }
  }

  /**
   * Creates context
   * @param game
   * @param player
   * @param card
   */
  private createContext(game: GameInfo, player: PlayerInfo, card: Card): ModeRuleContext {
    return {
      game, card, player,
      locale: locales.resolve(DefaultLocale, player.language),
      message: message => resolveController("tg").sendMessage(game.id, message),
      inline: results => this._inlineManager.inline(player.id, { results }),
      inlineColors: () => this._inlineManager.inlineColors(game, player)
    }
  }

  /**
   * Checks if card types equal
   * @param card
   * @param info
   */
  private isValidCard(card: Card, info: CardType | CardSpecialType | CardOptionType): boolean {
    return info === card.types.default || info === card.types.special || info === card.types.option
  }
}