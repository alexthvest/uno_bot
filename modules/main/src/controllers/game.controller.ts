import { OutMessage } from "@replikit/core/typings"
import { fromText } from "@replikit/messages"
import { GameRepository } from "@uno_bot/main"
import moment from "moment"

export class GameController {
  private readonly _gameRepository: GameRepository

  /**
   *
   * @param gameRepository
   */
  constructor(gameRepository: GameRepository) {
    this._gameRepository = gameRepository
  }

  /**
   * Creates new game
   * @param channelId
   * @param ownerId
   */
  public create(channelId: number, ownerId: number): OutMessage {
    const game = this._gameRepository.get(channelId)

    if (game && moment().diff(game.createdAt, "minutes") < 2)
      return fromText("TIME_HAS_NOT_PASSED")

    if (game && game.started)
      return fromText("GAME_ALREADY_STARTED")

    this._gameRepository.remove(channelId)
    this._gameRepository.add({
      id: channelId, ownerId,
      createdAt: moment()
    })

    return fromText("GAME_CREATED")
  }

  /**
   * Closes the game
   * @param channelId
   * @param senderId
   */
  public close(channelId: number, senderId: number): OutMessage {
    const game = this._gameRepository.get(channelId)

    if (game === undefined)
      return fromText("GAME_NOT_FOUND")

    if (game.ownerId !== senderId)
      return fromText("NOT_GAME_OWNER")

    this._gameRepository.remove(channelId)
    return fromText("GAME_CLOSED")
  }
}