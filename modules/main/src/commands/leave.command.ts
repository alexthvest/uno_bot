import { command } from "@replikit/commands"
import { eventManager, gameRepository, modeManager, PlayerController, DefaultLocale } from "@uno_bot/main"

command("leave").handler(context => {
  const controller = new PlayerController(gameRepository, eventManager, modeManager, context.getLocale(DefaultLocale))
  return controller.leave(context.channel, context.account.id)
}).register()