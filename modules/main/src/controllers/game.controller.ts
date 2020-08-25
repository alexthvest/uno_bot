import { AttachmentType } from "@replikit/core"
import { AccountInfo, OutMessage } from "@replikit/core/typings"
import { fromText, MessageBuilder } from "@replikit/messages"
import {
  CardStickers,
  DeckManager,
  DefaultLocale,
  defaultMode,
  EventManager,
  ModeManager,
  PlayerController,
  PlayerRepository,
  RepositoryBase,
  TurnManager
} from "@uno_bot/main"
import { GameInfo } from "@uno_bot/main/typings"
import moment from "moment"

export class GameController {
  private readonly _gameRepository: RepositoryBase<GameInfo>
  private readonly _eventManager: EventManager
  private readonly _modeManager: ModeManager
  private readonly _locale: DefaultLocale

  /**
   *
   * @param gameRepository
   * @param eventManager
   * @param modeManager
   * @param locale
   */
  constructor(gameRepository: RepositoryBase<GameInfo>, eventManager: EventManager, modeManager: ModeManager, locale: DefaultLocale) {
    this._gameRepository = gameRepository
    this._modeManager = modeManager
    this._eventManager = eventManager
    this._locale = locale
  }

  /**
   * Creates new game
   * @param channelId
   * @param account
   */
  public create(channelId: number, account: AccountInfo): OutMessage {
    const game = this._gameRepository.get(channelId)

    if (game && moment().diff(game.createdAt, "minutes") < 2)
      return fromText(this._locale.timeHasNotPassed(2))

    if (game && game.started)
      return fromText(this._locale.gameAlreadyStarted)

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

    return fromText(this._locale.gameCreated)
  }

  /**
   * Closes the game
   * @param channelId
   * @param account
   */
  public close(channelId: number, account: AccountInfo): OutMessage {
    const game = this._gameRepository.get(channelId)

    if (game === undefined)
      return fromText(this._locale.gameNotFound)

    if (game.ownerId !== account.id)
      return fromText(this._locale.gameNotOwner)

    this._gameRepository.remove(channelId)
    this._eventManager.publish("game:closed", {
      game, player: account
    })

    return fromText(this._locale.gameClosed)
  }

  /**
   * Starts the game
   * @param channelId
   * @param account
   */
  public async start(channelId: number, account: AccountInfo): Promise<OutMessage> {
    const game = this._gameRepository.get(channelId)

    if (game === undefined)
      return fromText(this._locale.gameNotFound)

    if (game.ownerId !== account.id)
      return fromText(this._locale.gameNotOwner)

    if (game.started)
      return fromText(this._locale.gameAlreadyStarted)

    if (game.players.length < 1) // TODO: Change to 2 for production
      return fromText(this._locale.gameNotEnoughPlayers)

    game.started = true
    game.startedAt = moment()

    const card = game.deck.drawFirst()
    const stickerId = CardStickers[card.color][card.types.default!][0]

    const controller = new PlayerController(this._gameRepository, this._eventManager, this._modeManager, this._locale)
    await controller.play(game, { id: -1, cards: [card] }, card)

    this._eventManager.publish("game:started", {
      game, card, player: account
    })

    return new MessageBuilder()
      .addLine(this._locale.gameStarted)
      .addLine(this._locale.nextTurn(game.turns.turn!))
      .addAttachment({
        id: stickerId,
        type: AttachmentType.Sticker,
        controllerName: "tg"
      }).build()
  }
}