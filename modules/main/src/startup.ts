import { createScope, resolveController } from "@replikit/core"
import { router } from "@replikit/router"
import { GameRepository, EventManager, InlineManager, PlayerController } from "@uno_bot/main"

/** @internal */
export const logger = createScope("main")

/** @internal */
export const gameRepository = new GameRepository()

/** @internal */
export const eventManager = new EventManager()

/** @internal */
export const inlineManager = new InlineManager(router)

router.of("inline-query:received").use(async context => {
  const game = gameRepository.all.find(game => game.players.contains(context.account.id))
  const player = game?.players.get(context.account.id)!

  if (game === undefined)
    return inlineManager.inlineGameNotFoundWithContext(context)

  if (!game.started)
    return inlineManager.inlineGameNotStartedWithContext(context)

  const card = await inlineManager.inlineCardsWithContext(context, game, player)

  const playerController = new PlayerController(gameRepository, eventManager)
  const message = await playerController.play(player, card)

  return resolveController("tg").sendMessage(game.id, message)
})