import { command } from "@replikit/commands"
import { DefaultLocale, joinGameCase } from "@uno_bot/main"

command("join")
  .handler(context => joinGameCase(context.channel, context.account, context.getLocale(DefaultLocale)))
  .register()