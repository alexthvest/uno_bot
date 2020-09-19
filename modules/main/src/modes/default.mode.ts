import { fromText, MessageBuilder } from "@replikit/messages"
import { CardDefaultType, CardOptionType, CardSpecialType } from "@uno_bot/cards"
import { ModeInfo } from "@uno_bot/main/typings"

export const defaultMode: ModeInfo = {
  id: "default",
  rules: [
    {
      card: CardOptionType.Pass,
      playable: context => context.player.drew || false,
      handle: context => {
        const nextPlayer = context.game.turns.next()
        const nextPlayerMessage = new MessageBuilder()
          .addText(context.locale.nextTurn(nextPlayer))
          .addButton({
            text: context.locale.buttonChooseCard,
            switchInline: { current: true, username: "" }
          })
          .build()

        return context.message(nextPlayerMessage)
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
        const chooseColorMessage = new MessageBuilder()
          .addText(context.locale.chooseColor)
          .addButton({
            text: context.locale.buttonChooseColor,
            switchInline: { current: true, username: "" }
          })
          .build()

        await context.message(chooseColorMessage)
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
        const chooseColorMessage = new MessageBuilder()
          .addText(context.locale.chooseColor)
          .addButton({
            text: context.locale.buttonChooseColor,
            switchInline: { current: true, username: "" }
          })
          .build()

        await context.message(chooseColorMessage)
        context.card.color = await context.inlineColors()
      }
    }
  ]
}