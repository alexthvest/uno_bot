import { OutMessage, SendedMessage } from "@replikit/core/typings"
import { CardColor, CardOptionType, CardSpecialType, CardType, DefaultLocale } from "@uno_bot/main"
import { Card, GameInfo, InlineQueryDataResult, PlayerInfo } from "@uno_bot/main/typings"

export interface Mode {
  name: string
  description?: string
  rules: ModeRule[]
}

export interface ModeRule {
  card: CardType | CardSpecialType | CardOptionType

  /**
   * Checks if card is playable
   */
  playable?(context: ModeRuleContext): boolean

  /**
   * Plays the card
   * @param context
   */
  handle(context: ModeRuleContext): Promise<unknown> | unknown
}

export interface ModeRuleContext {
  card: Card
  game: GameInfo
  player: PlayerInfo
  locale: DefaultLocale

  /**
   * Sends inline menu to user
   * @param results
   */
  inline<T>(results: InlineQueryDataResult<T>[]): Promise<T>

  /**
   * Sends inline menu with colors
   */
  inlineColors(): Promise<CardColor>

  /**
   * Sends message to game channel
   * @param message
   */
  message(message: OutMessage): Promise<SendedMessage>
}