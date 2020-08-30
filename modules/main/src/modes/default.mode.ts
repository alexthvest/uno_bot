import { fromText } from "@replikit/messages"
import { CardDefaultType, CardOptionType, CardSpecialType } from "@uno_bot/cards"
import { Mode } from "@uno_bot/main/typings"

export const defaultMode: Mode = {
  name: "default",
  rules: [
    {
      card: CardOptionType.Pass,
      playable: context => context.player.drew || false,
      handle: context => {
        const nextPlayer = context.game.turns.next()
        return context.message(fromText(context.locale.nextTurn(nextPlayer)))
      }
    },
    {
      card: CardOptionType.Draw,
      playable: context => !context.player.drew,
      handle: context => {
        const card = context.game.deck.draw()

        context.player.cards.push(card)
        context.player.drew = true

        return context.message(fromText(context.locale.playerDraw(context.player, 1)))
      }
    },
    {
      card: CardDefaultType.Skip,
      handle: async context => {
        const nextPlayer = context.game.turns.next()
        return context.message(fromText(context.locale.playerSkipTurn(nextPlayer)))
      }
    },
    {
      card: CardDefaultType.Reverse,
      handle: context => {
        if (context.game.players.length === 2)
          return context.game.turns.next()

        return context.game.turns.reverse()
      }
    },
    {
      card: CardDefaultType.DrawTwo,
      handle: async context => {

        const player = context.game.turns.next()
        const cards = context.game.deck.drawFew(2)

        player.cards.push(...cards)
        await context.message(fromText(context.locale.playerSkipTurn(player)))

        return context.message(fromText(context.locale.playerDraw(player, 2)))
      }
    },
    {
      card: CardSpecialType.DrawFour,
      handle: async context => {
        await context.message(fromText(context.locale.chooseColor))

        context.card.color = await context.inlineColors()

        const player = context.game.turns.next()
        const cards = context.game.deck.drawFew(4)

        player.cards.push(...cards)

        await context.message(fromText(context.locale.playerSkipTurn(player)))
        return context.message(fromText(context.locale.playerDraw(player, 4)))
      }
    },
    {
      card: CardSpecialType.Color,
      handle: async context => {
        await context.message(fromText(context.locale.chooseColor))
        context.card.color = await context.inlineColors()
      }
    }
  ]
}