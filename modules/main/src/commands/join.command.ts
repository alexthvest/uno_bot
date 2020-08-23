import { command } from "@replikit/commands"
import { eventManager, gameRepository, modeManager, PlayerController } from "@uno_bot/main"

command("join").handler(context => {
  const controller = new PlayerController(gameRepository, eventManager, modeManager)
  return controller.join(context.channel.id, context.account)
}).register()