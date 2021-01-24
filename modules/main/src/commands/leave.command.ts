import { command } from "@replikit/commands"
import { DefaultLocale, leaveGameCase } from "@uno_bot/main"

command("leave")
  .handler(context => leaveGameCase(context.channel, context.account.id, context.getLocale(DefaultLocale)))
  .register()