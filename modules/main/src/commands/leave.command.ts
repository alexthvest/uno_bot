import { command } from "@replikit/commands"
import { gameRepository, playerRepository, PlayerController } from "@uno_bot/main"

command("leave").handler(context => {
  const controller = new PlayerController(gameRepository, playerRepository)
  return controller.leave(context.channel.id, context.account.id)
}).register()