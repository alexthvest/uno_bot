import { command } from "@replikit/commands"
import { DefaultLocale, createGameCase } from "@uno_bot/main"

command("create")
  .handler(context => createGameCase(context.channel, context.account, context.getLocale(DefaultLocale)))
  .register()