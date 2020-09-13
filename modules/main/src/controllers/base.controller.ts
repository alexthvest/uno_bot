import { resolveController } from "@replikit/core"
import { Identifier, OutMessage, SendedMessage } from "@replikit/core/typings"
import { TelegramController } from "@replikit/telegram"

export abstract class ControllerBase {
  protected readonly _telegramController: TelegramController = resolveController("tg")

  /**
   * Sends message to channel
   * @param channelId
   * @param message
   */
  protected message(channelId: Identifier, message: OutMessage): Promise<SendedMessage> {
    return this._telegramController.sendMessage(channelId, message)
  }
}