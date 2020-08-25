import { command } from "@replikit/commands"
import { DefaultLocale, eventManager, gameRepository, modeManager, PlayerController } from "@uno_bot/main"

command("kick").handler(context => {
  const controller = new PlayerController(gameRepository, eventManager, modeManager, context.getLocale(DefaultLocale))
  return controller.kick(context.channel.id, context.account, context.message.reply?.account)
}).register()