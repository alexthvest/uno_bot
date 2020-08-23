import { command } from "@replikit/commands"
import { eventManager, gameRepository, modeManager, GameController } from "@uno_bot/main"

command("start").handler(context => {
  const controller = new GameController(gameRepository, eventManager, modeManager)
  return controller.start(context.channel.id, context.account)
}).register()