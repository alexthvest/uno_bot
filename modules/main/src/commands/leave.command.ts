import { command } from "@replikit/commands"
import { gameRepository, PlayerController } from "@uno_bot/main"

command("leave").handler(context => {
  const controller = new PlayerController(gameRepository)
  return controller.leave(context.channel.id, context.account.id)
}).register()