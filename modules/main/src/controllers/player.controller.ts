import { AccountInfo, OutMessage } from "@replikit/core/typings"
import { fromText } from "@replikit/messages"
import { RepositoryBase } from "@uno_bot/main"
import { GameInfo, PlayerInfo } from "@uno_bot/main/typings"

export class PlayerController {
  private readonly _gameRepository: RepositoryBase<GameInfo>
  private readonly _playerRepository: RepositoryBase<PlayerInfo>

  /**
   *
   * @param gameRepository
   * @param playerRepository
   */
  constructor(gameRepository: RepositoryBase<GameInfo>, playerRepository: RepositoryBase<PlayerInfo>) {
    this._gameRepository = gameRepository
    this._playerRepository = playerRepository
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

    if (this._playerRepository.contains(account.id))
      return fromText("PLAYER_ALREADY_IN_GAME")

    // TODO: Add deck empty check

    this._playerRepository.add({ ...account, game })
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

    if (!this._playerRepository.contains(accountId))
      return fromText("PLAYER_NOT_IN_GAME")

    // TODO: Add turn switch, game ending conditions
    // TODO: Cards returns to deck

    this._playerRepository.remove(accountId)
    return fromText("PLAYER_LEFT_GAME")
  }
}