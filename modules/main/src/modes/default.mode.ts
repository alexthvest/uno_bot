import { fromText } from "@replikit/messages"
import { CardOptionType, CardSpecialType, CardType } from "@uno_bot/main"
import { Mode } from "@uno_bot/main/typings"

export const defaultMode: Mode = {
  name: "default",
  rules: [
    {
      card: CardOptionType.Pass,
      playable: context => context.player.drew || false,
      handle: context => {
        const nextPlayer = context.game.turns.next()
        return context.message(fromText(`NEXT_PLAYER_TURN ${nextPlayer.firstName}`))
      }
    },
    {
      card: CardOptionType.Draw,
      playable: context => !context.player.drew,
      handle: context => {
        const card = context.game.deck.draw()

        context.player.cards.push(card)
        context.player.drew = true

        return context.message(fromText(`${context.player.firstName} draws card`))
      }
    },
    {
      card: CardType.Skip,
      handle: context => {
        if (context.game.players.length === 2)
          return context.game.turns.next()

        return context.game.turns.reverse()
      }
    },
    {
      card: CardType.DrawTwo,
      handle: context => {
        const player = context.game.turns.next()
        const cards = context.game.deck.drawFew(2)

        player.cards.push(...cards)

        return context.message(fromText(`${player.firstName} draws 2 cards`))
      }
    },
    {
      card: CardSpecialType.DrawFour,
      handle: async context => {
        await context.message(fromText("Choose color"))

        context.card.color = await context.inlineColors()

        const player = context.game.turns.next()
        const cards = context.game.deck.drawFew(4)

        player.cards.push(...cards)
        return context.message(fromText(`${player.firstName} draws 4 cards`))
      }
    },
    {
      card: CardSpecialType.Color,
      handle: async context => {
        await context.message(fromText("Choose color"))
        context.card.color = await context.inlineColors()
      }
    }
  ]
}