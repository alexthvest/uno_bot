import { fromText } from "@replikit/messages"
import { AccountInfo, OutMessage } from "@replikit/core/typings"
import { RepositoryBase, EventManager } from "@uno_bot/main"
import { GameInfo } from "@uno_bot/main/typings"

export class PlayerController {
  private readonly _gameRepository: RepositoryBase<GameInfo>
  private readonly _eventManager: EventManager

  /**
   *
   * @param gameRepository
   * @param eventManager
   */
  constructor(gameRepository: RepositoryBase<GameInfo>, eventManager: EventManager) {
    this._gameRepository = gameRepository
    this._eventManager = eventManager
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
  public leave(channelId: number, accountId: number): OutMessage {
    const game = this._gameRepository.get(channelId)

    if (game === undefined)
      return fromText("GAME_NOT_FOUND")

    if (!game.players.contains(accountId))
      return fromText("PLAYER_NOT_IN_GAME")

    // TODO: Add turn switch, game ending conditions
    // TODO: Cards returns to deck

    this._eventManager.publish("player:left", {
      game, player: game.players.get(accountId)!
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
  public kick(channelId: number, account: AccountInfo, target: AccountInfo | undefined): OutMessage {
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

    this.leave(channelId, target.id)
    return fromText("PLAYER_KICKED")
  }
}