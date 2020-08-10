import { command } from "@replikit/commands"
import { gameRepository, playerRepository, GameController } from "@uno_bot/main"

command("kick").handler(context => {
  const controller = new GameController(gameRepository, playerRepository)
  return controller.kick(context.channel.id, context.account.id, context.message.reply?.account.id)
}).register()