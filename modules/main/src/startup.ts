import { createScope, resolveController } from "@replikit/core"
import { router } from "@replikit/router"
import { GameRepository, EventManager, InlineManager, PlayerController, ModeManager } from "@uno_bot/main"

/** @internal */
export const logger = createScope("main")

/** @internal */
export const gameRepository = new GameRepository()

/** @internal */
export const eventManager = new EventManager()

/** @internal */
export const inlineManager = new InlineManager(router)

/** @internal */
export const modeManager = new ModeManager()

router.of("inline-query:received").use(async context => {
  const game = gameRepository.all.find(game => game.players.contains(context.account.id))
  const player = game?.players.get(context.account.id)!

  if (game === undefined)
    return inlineManager.inlineNotInGameWithContext(context)

  if (game.ownerId === context.account.id && !game.started) {
    const mode = await inlineManager.inlineModesWithContext(context, game, modeManager.modes)

    if (game.modes.some(m => m.name === mode.name))
      return game.modes.remove(mode)

    return game.modes.push(mode)
  }

  if (!game.started)
    return inlineManager.inlineGameNotStartedWithContext(context)

  const card = await inlineManager.inlineCardsWithContext(context, game, player)

  const playerController = new PlayerController(gameRepository, eventManager)
  const message = await playerController.play(game, player, card)

  return resolveController("tg").sendMessage(game.id, message)
})