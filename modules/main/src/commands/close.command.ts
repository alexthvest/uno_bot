import { command } from "@replikit/commands"
import { eventManager, gameRepository, modeManager, GameController, DefaultLocale } from "@uno_bot/main"

command("close").handler(context => {
  const controller = new GameController(gameRepository, eventManager, modeManager, context.getLocale(DefaultLocale))
  return controller.close(context.channel.id, context.account)
}).register()