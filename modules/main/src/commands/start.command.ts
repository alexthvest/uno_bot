import { command } from "@replikit/commands"
import { DefaultLocale, startGameCase } from "@uno_bot/main"

command("start")
  .handler(context => startGameCase(context.channel, context.account, context.getLocale(DefaultLocale)))
  .register()