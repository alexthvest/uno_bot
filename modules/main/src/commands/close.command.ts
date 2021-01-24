import { command } from "@replikit/commands"
import { DefaultLocale, closeGameCase } from "@uno_bot/main"

command("close")
  .handler(context => closeGameCase(context.channel, context.account, context.getLocale(DefaultLocale)))
  .register()