import { command } from "@replikit/commands"
import { gameRepository, GameController, eventManager } from "@uno_bot/main"

command("kick").handler(context => {
  const controller = new GameController(gameRepository, eventManager)
  return controller.kick(context.channel.id, context.account, context.message.reply?.account)
}).register()