import { resolveController } from "@replikit/core"
import { AccountInfo, OutMessage } from "@replikit/core/typings"
import { fromText } from "@replikit/messages"
import { TelegramController } from "@replikit/telegram"
import { EventManager, RepositoryBase } from "@uno_bot/main"
import { Card, GameInfo, PlayerInfo } from "@uno_bot/main/typings"

export class PlayerController {
  private readonly _gameRepository: RepositoryBase<GameInfo>
  private readonly _eventManager: EventManager
  private readonly _controller: TelegramController

  /**
   *
   * @param gameRepository
   * @param eventManager
   */
  constructor(gameRepository: RepositoryBase<GameInfo>, eventManager: EventManager) {
    this._gameRepository = gameRepository
    this._eventManager = eventManager
    this._controller = resolveController("tg")
  }

  /**
   * Adds player to the game
   * @param channelId
   * @param account
   */
  public join(channelId: number, account: AccountInfo): OutMessage {
    const game = this._gameRepository.get(channelId)

    if (game === undefined)
      return fromText("GAME_NOT_FOUND")

    if (this._gameRepository.has(game => game.players.contains(account.id)))
      return fromText("PLAYER_ALREADY_IN_GAME")

    // TODO: Add deck empty check

    const player = game.players.add({
      ...account, game,
      cards: []
    })

    this._eventManager.publish("player:joined", {
      game, player
    })

    return fromText("PLAYER_JOINED")
  }

  /**
   * Removes user from the game
   * @param channelId
   * @param accountId
   */
  public async leave(channelId: number, accountId: number): Promise<OutMessage> {
    const game = this._gameRepository.get(channelId)

    if (game === undefined)
      return fromText("GAME_NOT_FOUND")

    if (!game.players.contains(accountId))
      return fromText("PLAYER_NOT_IN_GAME")

    const player = game.players.get(accountId)!
    game.deck.discard(...player.cards)

    // TODO: Add turn switch

    if (game.players.length - 1 < 2) {
      this._gameRepository.remove(channelId)
      await this._controller.sendMessage(channelId, fromText("NOT_ENOUGH_PLAYER_TO_START_GAME"))
    }

    this._eventManager.publish("player:left", {
      game, player
    })

    game.players.remove(accountId)
    return fromText("PLAYER_LEFT_GAME")
  }

  /**
   * Kicks player from game
   * @param channelId
   * @param account
   * @param target
   */
  public async kick(channelId: number, account: AccountInfo, target: AccountInfo | undefined): Promise<OutMessage> {
    const game = this._gameRepository.get(channelId)

    if (game === undefined)
      return fromText("GAME_NOT_FOUND")

    if (game.ownerId !== account.id)
      return fromText("NOT_GAME_OWNER")

    if (target?.id === undefined)
      return fromText("NO_KICK_TARGET")

    if (!game.players.contains(target.id))
      return fromText("PLAYER_NOT_IN_GAME")

    this._eventManager.publish("player:kicked", {
      game, player: game.players.get(target.id)!
    })

    await this.leave(channelId, target.id)
    return fromText("PLAYER_KICKED")
  }

  /**
   * Plays card
   * @param player
   * @param card
   */
  public async play(player: PlayerInfo, card: Card): Promise<OutMessage> {
    throw new Error("Not implemented")
  }
}