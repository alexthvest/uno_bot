import { AttachmentType } from "@replikit/core"
import { AccountInfo, OutMessage } from "@replikit/core/typings"
import { fromText, MessageBuilder } from "@replikit/messages"
import {
  CardStickers,
  DeckManager,
  defaultMode,
  EventManager,
  PlayerController,
  PlayerRepository,
  RepositoryBase,
  TurnManager
} from "@uno_bot/main"
import { GameInfo, PlayerInfo } from "@uno_bot/main/typings"
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

    const playerRepository = new PlayerRepository()
    this._gameRepository.remove(channelId)

    this._gameRepository.add({
      id: channelId,
      ownerId: account.id,
      players: playerRepository,
      modes: [defaultMode],
      deck: new DeckManager(),
      turns: new TurnManager(playerRepository),
      createdAt: moment()
    })

    this._eventManager.publish("game:created", {
      game: this._gameRepository.get(channelId)!,
      player: account
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

    this._gameRepository.remove(channelId)
    this._eventManager.publish("game:closed", {
      game, player: account
    })

    return fromText("GAME_CLOSED")
  }

  /**
   * Starts the game
   * @param channelId
   * @param account
   */
  public async start(channelId: number, account: AccountInfo): Promise<OutMessage> {
    const game = this._gameRepository.get(channelId)

    if (game === undefined)
      return fromText("GAME_NOT_FOUND")

    if (game.ownerId !== account.id)
      return fromText("NOT_GAME_OWNER")

    if (game.started)
      return fromText("GAME_ALREADY_STARTED")

    if (game.players.length < 1) // TODO: Change to 2 for production
      return fromText("NOT_ENOUGH_PLAYERS")

    const card = game.deck.drawFirst()
    const stickerId = CardStickers[card.color][card.types.default!][0]
    const gameStarter: PlayerInfo = { id: -1, cards: [card] }

    const controller = new PlayerController(this._gameRepository, this._eventManager)
    await controller.play(game, gameStarter, card)

    game.started = true
    this._eventManager.publish("game:started", {
      game, card, player: account
    })

    return new MessageBuilder()
      .addText("GAME_STARTED")
      .addAttachment({
        id: stickerId,
        type: AttachmentType.Sticker,
        controllerName: "tg"
      }).build()
  }
}