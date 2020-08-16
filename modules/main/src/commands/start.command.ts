import { command } from "@replikit/commands"
import { eventManager, GameController, gameRepository } from "@uno_bot/main"

command("start").handler(context => {
  const controller = new GameController(gameRepository, eventManager)
  return controller.start(context.channel.id, context.account)
}).register()