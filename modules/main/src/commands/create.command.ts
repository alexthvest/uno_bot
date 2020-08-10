import { command } from "@replikit/commands"
import { gameRepository, playerRepository, GameController } from "@uno_bot/main"

command("create").handler(context => {
  const controller = new GameController(gameRepository, playerRepository)
  return controller.create(context.channel.id, context.account.id)
}).register()