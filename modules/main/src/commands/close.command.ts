import { command } from "@replikit/commands"
import { gameRepository, playerRepository, GameController } from "@uno_bot/main"

command("close").handler(context => {
  const controller = new GameController(gameRepository, playerRepository)
  return controller.close(context.channel.id, context.account.id)
}).register()