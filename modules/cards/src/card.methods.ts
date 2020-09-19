import { CardColor, CardDefaultType, CardOptionType, CardSpecialType, CardType } from "@uno_bot/cards"
import { Card } from "@uno_bot/cards/typings"
import { CardScores, CardStickers, ColorEmoji } from "./card.stickers"

/**
 * Creates card
 * @param color
 * @param type
 * @param grey
 */
export function createCard(color: CardColor, type: CardType, grey: boolean = false): Card {
  return { color, type, stickerId: getCardSticker(color, type, grey) }
}

/**
 * Returns get color emoji
 * @param color
 */
export function getColorEmoji(color: CardColor): string {
  return ColorEmoji[color] || "⚠"
}

/**
 * Returns card score
 * @param type
 */
export function getCardScore(type: CardType): number {
  return CardScores[type] || 0
}

/**
 * Returns card sticker id
 * @param color
 * @param type
 * @param grey
 */
export function getCardSticker(color: CardColor, type: CardType, grey: boolean = false): string {
  const stickers = CardStickers[color][type]
  return stickers[(stickers.length > 1 && grey) ? 1 : 0]
}

/**
 * Checks if type is DefaultType
 * @param type
 */
export function isDefaultCardType(type: CardType): boolean {
  return Object.values(CardDefaultType).some(t => t === type)
}

/**
 * Checks if type is OptionType
 * @param type
 */
export function isOptionCardType(type: CardType): boolean {
  return Object.values(CardOptionType).some(t => t === type)
}

/**
 * Checks if type is SpecialType
 * @param type
 */
export function isSpecialCardType(type: CardType): boolean {
  return Object.values(CardSpecialType).some(t => t === type)
}