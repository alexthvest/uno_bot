import { fromText } from "@replikit/messages"
import { AccountInfo, OutMessage } from "@replikit/core/typings"
import { PlayerRepository, RepositoryBase, EventManager, DeckManager } from "@uno_bot/main"
import { GameInfo } from "@uno_bot/main/typings"
import moment from "moment"

export class GameController {
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
   * Creates new game
   * @param channelId
   * @param account
   */
  public create(channelId: number, account: AccountInfo): OutMessage {
    const game = this._gameRepository.get(channelId)

    if (game && moment().diff(game.createdAt, "minutes") < 2)
      return fromText("TIME_HAS_NOT_PASSED")

    if (game && game.started)
      return fromText("GAME_ALREADY_STARTED")

    this._gameRepository.remove(channelId)
    this._gameRepository.add({
      id: channelId,
      ownerId: account.id,
      players: new PlayerRepository(),
      deck: new DeckManager(),
      createdAt: moment()
    })

    this._eventManager.publish("game:created", {
      game: this._gameRepository.get(channelId)!,
      sender: account
    })

    return fromText("GAME_CREATED")
  }

  /**
   * Closes the game
   * @param channelId
   * @param account
   */
  public close(channelId: number, account: AccountInfo): OutMessage {
    const game = this._gameRepository.get(channelId)

    if (game === undefined)
      return fromText("GAME_NOT_FOUND")

    if (game.ownerId !== account.id)
      return fromText("NOT_GAME_OWNER")

    this._eventManager.publish("game:closed", {
      game, sender: account
    })

    this._gameRepository.remove(channelId)
    return fromText("GAME_CLOSED")
  }
}