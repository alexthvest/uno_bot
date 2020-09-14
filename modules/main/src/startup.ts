import { createScope, updateConfig } from "@replikit/core"
import { router } from "@replikit/router"
import { CardOptionType } from "@uno_bot/cards"
import {
  DefaultLocale,
  EventManager,
  GameRepository,
  ModeManager,
  PlayerController,
  UnoInlineManager
} from "@uno_bot/main"

/**
 * Sets default values for configuration
 */
updateConfig({
  uno: {
    createWaitTime: 120,
    minPlayers: 2
  }
})

/** @internal */
export const logger = createScope("main")

/** @internal */
export const gameRepository = new GameRepository()

/** @internal */
export const eventManager = new EventManager()

/** @internal */
export const inlineManager = new UnoInlineManager(router)

/** @internal */
export const modeManager = new ModeManager(inlineManager)

router.of("inline-query:received").use(async context => {
  const locale = context.getLocale(DefaultLocale)

  const game = gameRepository.all.find(game => game.players.contains(context.account.id))
  const player = game?.players.get(context.account.id)!

  if (game === undefined)
    return inlineManager.inlineNotInGameWithContext(context)

  if (game.owner.id === context.account.id && modeManager.modes.length && !game.started) {
    const mode = await inlineManager.inlineModesWithContext(context, game, modeManager.modes)

    if (game.modes.contains(mode.id))
      return game.modes.remove(mode.id)

    mode.enabled && mode.enabled({ game, player, events: eventManager })
    return game.modes.add(mode)
  }

  if (!game.started)
    return inlineManager.inlineGameNotStartedWithContext(context)

  const options = [CardOptionType.Pass, CardOptionType.Draw]
  const card = await inlineManager.inlineCardsWithContext(context, game, player, options, modeManager)

  const playerController = new PlayerController(gameRepository, eventManager, modeManager, locale)
  const message = await playerController.play(game, player, card)

  if (message !== undefined)
    return context.controller.sendMessage(game.id, message)
})