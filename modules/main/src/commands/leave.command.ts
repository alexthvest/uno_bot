import { command } from "@replikit/commands"
import { eventManager, gameRepository, modeManager, PlayerController } from "@uno_bot/main"

command("leave").handler(context => {
  const controller = new PlayerController(gameRepository, eventManager, modeManager)
  return controller.leave(context.channel.id, context.account.id)
}).register()