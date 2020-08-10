import { command } from "@replikit/commands"
import { gameRepository, GameController } from "@uno_bot/main"

command("create").handler(context => {
  const controller = new GameController(gameRepository)
  return controller.create(context.channel.id, context.account.id)
}).register()