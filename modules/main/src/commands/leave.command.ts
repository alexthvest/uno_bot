import { command } from "@replikit/commands"
import { DefaultLocale, eventManager, gameRepository, modeManager, PlayerController } from "@uno_bot/main"

command("leave").handler(context => {
  const controller = new PlayerController(gameRepository, eventManager, modeManager, context.getLocale(DefaultLocale))
  return controller.leave(context.channel.id, context.account.id)
}).register()