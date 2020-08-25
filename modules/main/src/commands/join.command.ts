import { command } from "@replikit/commands"
import { DefaultLocale, eventManager, gameRepository, modeManager, PlayerController } from "@uno_bot/main"

command("join").handler(context => {
  const controller = new PlayerController(gameRepository, eventManager, modeManager, context.getLocale(DefaultLocale))
  return controller.join(context.channel.id, context.account)
}).register()