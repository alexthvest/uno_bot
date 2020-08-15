import { command } from "@replikit/commands"
import { gameRepository, eventManager, PlayerController } from "@uno_bot/main"

command("kick").handler(context => {
  const controller = new PlayerController(gameRepository, eventManager)
  return controller.kick(context.channel.id, context.account, context.message.reply?.account)
}).register()