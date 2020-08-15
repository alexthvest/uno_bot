import { AccountInfo, OutMessage } from "@replikit/core/typings"
import { fromText } from "@replikit/messages"
import { PlayerController, PlayerRepository, RepositoryBase } from "@uno_bot/main"
import { GameInfo } from "@uno_bot/main/typings"
import moment from "moment"
import { platform } from "os"
import { EventManager } from "../managers/event.manager"

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
      id: channelId, ownerId: account.id,
      players: new PlayerRepository(),
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

    const playerController = new PlayerController(this._gameRepository, this._eventManager)
    playerController.leave(channelId, target.id)

    return fromText("PLAYER_KICKED")
  }
}