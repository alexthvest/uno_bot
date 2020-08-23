import { CardOptionType } from "@uno_bot/main"
import { Mode } from "@uno_bot/main/typings"

export const defaultMode: Mode = {
  name: "default",
  rules: [
    {
      card: CardOptionType.Pass,
      playable: () => true,
      handle: context => context.game.turns.next()
    },
    {
      card: CardOptionType.Draw,
      playable: () => true,
      handle: context => {
        const card = context.game.deck.draw()
        context.player.cards.push(card)
      }
    }
  ]
}