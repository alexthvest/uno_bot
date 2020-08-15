import { command } from "@replikit/commands"
import { gameRepository, eventManager, GameController } from "@uno_bot/main"

command("create").handler(context => {
  const controller = new GameController(gameRepository, eventManager)
  return controller.create(context.channel.id, context.account)
}).register()