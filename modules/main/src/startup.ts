import { createScope, resolveController } from "@replikit/core"
import { fromText } from "@replikit/messages"
import { router } from "@replikit/router"
import {
  CardOptionType,
  EventManager,
  GameRepository,
  InlineManager,
  ModeManager,
  PlayerController
} from "@uno_bot/main"

/** @internal */
export const logger = createScope("main")

/** @internal */
export const gameRepository = new GameRepository()

/** @internal */
export const eventManager = new EventManager()

/** @internal */
export const inlineManager = new InlineManager(router)

/** @internal */
export const modeManager = new ModeManager(inlineManager)

router.of("inline-query:received").use(async context => {
  const game = gameRepository.all.find(game => game.players.contains(context.account.id))
  const player = game?.players.get(context.account.id)!

  if (game === undefined)
    return inlineManager.inlineNotInGameWithContext(context)

  if (game.ownerId === context.account.id && modeManager.modes.length && !game.started) {
    const mode = await inlineManager.inlineModesWithContext(context, game, modeManager.modes)

    if (game.modes.some(m => m.name === mode.name))
      return game.modes.remove(mode)

    return game.modes.push(mode)
  }

  if (!game.started)
    return inlineManager.inlineGameNotStartedWithContext(context)

  if (game.turns.turn?.id !== player.id)
    return resolveController("tg").sendMessage(game.id, fromText("GAME_INFO"))

  const options = [CardOptionType.Pass, CardOptionType.Draw]
  const card = await inlineManager.inlineCardsWithContext(context, game, player, options, modeManager)

  if (!modeManager.playable(game, card))
    return

  const playerController = new PlayerController(gameRepository, eventManager, modeManager)
  const message = await playerController.play(game, player, card)

  if (message !== undefined)
    return resolveController("tg").sendMessage(game.id, message)
})