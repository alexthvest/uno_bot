import { OutMessage, SendedMessage } from "@replikit/core/typings"
import { CardColor, CardType } from "@uno_bot/cards"
import { Card } from "@uno_bot/cards/typings"
import { DefaultLocale, EventManager } from "@uno_bot/main"
import { GameInfo, PlayerInfo } from "@uno_bot/main/typings"
import { InlineQueryDataResult } from "@uno_bot/inline/typings"

export interface Mode {
  name: string
  description?: string
  rules: ModeRule[]

  /**
   * Invokes when mode is selected in menu
   * @param context
   */
  enabled?(context: ModeEnabledContext): Promise<unknown> | unknown
}

export interface ModeRule {
  card: CardType

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

export interface ModeEnabledContext {
  game: GameInfo
  player: PlayerInfo
  events: EventManager
}