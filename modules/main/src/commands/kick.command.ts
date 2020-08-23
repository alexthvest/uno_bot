import { command } from "@replikit/commands"
import { eventManager, gameRepository, modeManager, PlayerController } from "@uno_bot/main"

command("kick").handler(context => {
  const controller = new PlayerController(gameRepository, eventManager, modeManager)
  return controller.kick(context.channel.id, context.account, context.message.reply?.account)
}).register()