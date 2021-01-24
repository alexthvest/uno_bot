import { command } from "@replikit/commands"
import { DefaultLocale, kickPlayerCase } from "@uno_bot/main"

command("kick")
  .handler(context => kickPlayerCase(context.channel, context.account, context.message.reply?.account, context.getLocale(DefaultLocale)))
  .register()