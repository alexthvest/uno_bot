import { command } from "@replikit/commands"
import { gameRepository, eventManager, PlayerController } from "@uno_bot/main"

command("leave").handler(context => {
  const controller = new PlayerController(gameRepository, eventManager)
  return controller.leave(context.channel.id, context.account.id)
}).register()