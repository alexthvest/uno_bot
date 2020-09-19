import { AttachmentType, config } from "@replikit/core"
import { AccountInfo, ChannelInfo, OutMessage } from "@replikit/core/typings"
import { fromAttachment, fromText, MessageBuilder } from "@replikit/messages"
import {
  ControllerBase,
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
import { GameInfo, PlayerInfo } from "@uno_bot/main/typings"
import moment from "moment"
import { ModeRepository } from "../repositories/mode.repository"

export class GameController extends ControllerBase {
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
  public constructor(
    gameRepository: RepositoryBase<GameInfo>, eventManager: EventManager,
    modeManager: ModeManager, locale: DefaultLocale
  ) {
    super()

    this._gameRepository = gameRepository
    this._modeManager = modeManager
    this._eventManager = eventManager
    this._locale = locale
  }

  /**
   * Creates new game
   * @param channel
   * @param account
   */
  public create(channel: ChannelInfo, account: AccountInfo): OutMessage {
    const game = this._gameRepository.get(channel.id)

    if (game && moment().diff(game.createdAt, "seconds") < config.uno.createWaitTime)
      return fromText(this._locale.timeHasNotPassed(config.uno.createWaitTime))

    if (game && game.started)
      return fromText(this._locale.gameAlreadyStarted)

    const playerRepository = new PlayerRepository()
    const modeRepository = new ModeRepository(defaultMode)

    const deckManager = new DeckManager()
    const turnManager = new TurnManager(playerRepository)

    this._gameRepository.remove(channel.id)
    this._gameRepository.add({
      id: channel.id,
      channel,
      owner: account,
      score: 0,
      players: playerRepository,
      modes: modeRepository,
      deck: deckManager,
      turns: turnManager,
      createdAt: moment()
    })

    this._eventManager.publish("game:created", {
      game: this._gameRepository.get(channel.id)!,
      player: account
    })

    return fromText(this._locale.gameCreated)
  }

  /**
   * Closes the game
   * @param channel
   * @param account
   */
  public close(channel: ChannelInfo, account: AccountInfo): OutMessage {
    const game = this._gameRepository.get(channel.id)

    if (game === undefined)
      return fromText(this._locale.gameNotFound)

    if (game.owner.id !== account.id)
      return fromText(this._locale.gameNotOwner)

    this._gameRepository.remove(channel.id)
    this._eventManager.publish("game:closed", {
      game, player: account
    })

    return fromText(this._locale.gameClosed)
  }

  /**
   * Starts the game
   * @param channel
   * @param account
   */
  public async start(channel: ChannelInfo, account: AccountInfo): Promise<OutMessage> {
    const game = this._gameRepository.get(channel.id)

    if (game === undefined)
      return fromText(this._locale.gameNotFound)

    if (game.owner.id !== account.id)
      return fromText(this._locale.gameNotOwner)

    if (game.started)
      return fromText(this._locale.gameAlreadyStarted)

    if (game.players.length < config.uno.minPlayers)
      return fromText(this._locale.gameNotEnoughPlayers)

    game.started = true
    game.startedAt = moment()
    game.turns.shuffle()

    const card = game.deck.drawFirst()

    const controller = new PlayerController(this._gameRepository, this._eventManager, this._modeManager, this._locale)
    await controller.play(game, { id: -1, cards: [card] }, card)

    this._eventManager.publish("game:started", {
      game, card, player: account
    })

    await this.message(game.id, fromAttachment({
      id: card.stickerId,
      type: AttachmentType.Sticker,
      controllerName: "tg"
    }))

    return new MessageBuilder()
      .addLine(this._locale.gameStarted)
      .addLine(this._locale.nextTurn(game.turns.turn!))
      .addButton({
        text: this._locale.buttonChooseCard,
        switchInline: { current: true, username: "" }
      })
      .build()
  }

  /**
   * Ends the game
   * @param channel
   * @param player
   */
  public end(channel: ChannelInfo, player: PlayerInfo): OutMessage {
    const game = this._gameRepository.get(channel.id)

    if (game === undefined)
      return fromText(this._locale.gameNotFound)

    if (!game.started)
      return fromText(this._locale.gameNotStarted)

    game.started = false

    this._gameRepository.remove(channel.id)
    this._eventManager.publish("game:ended", { game, player })

    return fromText(this._locale.gameEnded)
  }
}