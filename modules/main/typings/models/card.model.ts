import { CardColor, CardOptionType, CardSpecialType, CardType } from "@uno_bot/main"

export interface Card {
  color: CardColor
  types: {
    default?: CardType
    special?: CardSpecialType
    option?: CardOptionType
  }
}