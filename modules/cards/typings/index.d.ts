import { CardColor, CardType } from "@uno_bot/cards"

export interface Card {
  color: CardColor
  type: CardType
  stickerId: string
}