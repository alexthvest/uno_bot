import { command } from "@replikit/commands"
import { gameRepository, GameController } from "@uno_bot/main"

command("kick").handler(context => {
  const controller = new GameController(gameRepository)
  return controller.kick(context.channel.id, context.account.id, context.message.reply?.account.id)
}).register()