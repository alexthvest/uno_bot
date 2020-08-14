import { command } from "@replikit/commands"
import { gameRepository, GameController } from "@uno_bot/main"

command("close").handler(context => {
  const controller = new GameController(gameRepository)
  return controller.close(context.channel.id, context.account.id)
}).register()