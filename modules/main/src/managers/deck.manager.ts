import { CardColor, CardDefaultType, CardSpecialType, createCard, isSpecialCardType } from "@uno_bot/cards"
import { Card } from "@uno_bot/cards/typings"
import { shuffle } from "@uno_bot/main"

export class DeckManager {
  private _deck: Card[] = []
  private _discard: Card[] = []

  public constructor() {
    const colors = [CardColor.Red, CardColor.Green, CardColor.Blue, CardColor.Yellow]
    const types = Object.values(CardDefaultType)
    const specialTypes = Object.values(CardSpecialType)

    for (const color of colors) {
      for (const type of types) {
        this._deck.push(createCard(color, type))

        if (type !== CardDefaultType.Zero)
          this._deck.push(createCard(color, type))
      }
    }

    for (const specialType of specialTypes) {
      for (let i = 0; i < 4; i++) {
        this._deck.push(createCard(CardColor.Black, specialType))
      }
    }

    shuffle(this._deck)
  }

  /**
   * Discards cards to discard deck
   */
  public discard(...cards: Card[]): void {
    cards.forEach(card => this._discard.push(card))
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

  /**
   * Draws first card
   */
  public drawFirst(): Card {
    let card: Card

    do { card = this.draw() }
    while (isSpecialCardType(card.type))

    return card
  }
}