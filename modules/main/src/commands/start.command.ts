import { command } from "@replikit/commands"
import { eventManager, gameRepository, modeManager, GameController, DefaultLocale } from "@uno_bot/main"

command("start").handler(context => {
  const controller = new GameController(gameRepository, eventManager, modeManager, context.getLocale(DefaultLocale))
  return controller.start(context.channel, context.account)
}).register()