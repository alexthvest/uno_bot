import { command } from "@replikit/commands"
import { eventManager, gameRepository, modeManager, PlayerController, DefaultLocale } from "@uno_bot/main"

command("join").handler(context => {
  const controller = new PlayerController(gameRepository, eventManager, modeManager, context.getLocale(DefaultLocale))
  return controller.join(context.channel, context.account)
}).register()