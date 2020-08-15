import { CardColor, CardSpecialType, CardType, shuffle } from "@uno_bot/main"
import { Card } from "@uno_bot/main/typings"

export class DeckManager {
  private _deck: Card[] = []
  private _discard: Card[] = []

  constructor() {
    const colors = [CardColor.Red, CardColor.Green, CardColor.Blue, CardColor.Yellow]
    const types = Object.values(CardType)
    const specialTypes = Object.values(CardSpecialType)

    for (const color of colors) {
      for (const type of types) {
        this._deck.push({ color, types: { default: type } })

        if (type !== CardType.Zero)
          this._deck.push({ color, types: { default: type } })
      }
    }

    for (const specialType of specialTypes) {
      for (let i = 0; i < 4; i++) {
        this._deck.push({
          color: CardColor.Black,
          types: { special: specialType }
        })
      }
    }

    shuffle(this._deck)
  }

  /**
   * Returns true if deck is empty
   */
  public get empty(): boolean {
    return this._deck.length === 0 && this._discard.length === 0
  }

  /**
   * Discards card to discard deck
   */
  public discard(card: Card): void {
    this._discard.push(card)
  }

  /**
   * Draws card from deck
   */
  public draw(): Card {
    if (this._deck.length === 0) {
      this._deck = shuffle(this._discard)
      this._discard = []
    }

    return this._deck.pop()!
  }

  /**
   * Draws few cards from deck
   * @param count
   */
  public drawFew(count: number): Card[] {
    return Array(count).fill(1).map(() => this.draw())
  }
}