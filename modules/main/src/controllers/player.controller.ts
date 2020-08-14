import { AccountInfo, OutMessage } from "@replikit/core/typings"
import { fromText } from "@replikit/messages"
import { RepositoryBase } from "@uno_bot/main"
import { GameInfo } from "@uno_bot/main/typings"

export class PlayerController {
  private readonly _gameRepository: RepositoryBase<GameInfo>

  /**
   *
   * @param gameRepository
   */
  constructor(gameRepository: RepositoryBase<GameInfo>) {
    this._gameRepository = gameRepository
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

    game.players.add({
      ...account, game,
      cards: []
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

    game.players.remove(accountId)
    return fromText("PLAYER_LEFT_GAME")
  }
}