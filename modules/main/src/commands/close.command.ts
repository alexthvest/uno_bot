import { command } from "@replikit/commands"
import { gameRepository, GameController, eventManager } from "@uno_bot/main"

command("close").handler(context => {
  const controller = new GameController(gameRepository, eventManager)
  return controller.close(context.channel.id, context.account)
}).register()