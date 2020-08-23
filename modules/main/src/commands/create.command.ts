import { command } from "@replikit/commands"
import { eventManager, gameRepository, modeManager, GameController } from "@uno_bot/main"

command("create").handler(context => {
  const controller = new GameController(gameRepository, eventManager, modeManager)
  return controller.create(context.channel.id, context.account)
}).register()