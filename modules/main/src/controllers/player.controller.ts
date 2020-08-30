import { config, resolveController } from "@replikit/core"
import { AccountInfo, OutMessage } from "@replikit/core/typings"
import { fromText } from "@replikit/messages"
import { TelegramController } from "@replikit/telegram"
import { CardScores, DefaultLocale, EventManager, GameController, ModeManager, RepositoryBase } from "@uno_bot/main"
import { Card, GameInfo, PlayerCardPlayedContext, PlayerInfo, PlayerLeftContext } from "@uno_bot/main/typings"

export class PlayerController {
  private readonly _gameRepository: RepositoryBase<GameInfo>
  private readonly _eventManager: EventManager
  private readonly _modeManager: ModeManager
  private readonly _locale: DefaultLocale

  private readonly _controller: TelegramController

  /**
   *
   * @param gameRepository
   * @param eventManager
   * @param modeManager
   * @param locale
   */
  public constructor(gameRepository: RepositoryBase<GameInfo>, eventManager: EventManager,
                     modeManager: ModeManager, locale: DefaultLocale) {
    this._gameRepository = gameRepository
    this._eventManager = eventManager
    this._modeManager = modeManager
    this._locale = locale

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
      return fromText(this._locale.gameNotFound)

    if (this._gameRepository.has(game => game.players.contains(account.id)))
      return fromText(this._locale.playerAlreadyJoined)

    if (game.deck.empty)
      return fromText(this._locale.deckIsEmpty)

    const player = game.players.add({
      ...account,
      cards: game.deck.drawFew(7)
    })

    this._eventManager.publish("player:joined", {
      game, player
    })

    return fromText(this._locale.playerJoined)
  }

  /**
   * Removes user from the game
   * @param channelId
   * @param accountId
   */
  public async leave(channelId: number, accountId: number): Promise<OutMessage> {
    const game = this._gameRepository.get(channelId)

    if (game === undefined)
      return fromText(this._locale.gameNotFound)

    if (!game.players.contains(accountId))
      return fromText(this._locale.playerNotInGame)

    const player = game.players.get(accountId)!

    game.deck.discard(...player.cards)
    game.players.remove(accountId)

    this._eventManager.subscribeOnce("player:left", this.onPlayerLeft.bind(this))
    this._eventManager.publish("player:left", { game, player })

    return fromText(this._locale.playerLeft)
  }

  /**
   * Handles player left event
   * @param context
   */
  private onPlayerLeft(context: PlayerLeftContext): Promise<unknown> {
    const { game } = context

    if (!game.started)
      return Promise.resolve()

    if (game.players.length < config.uno.minPlayers) {
      this._gameRepository.remove(game.id)
      return this._controller.sendMessage(game.id, fromText(this._locale.gameNotEnoughPlayers))
    }

    const nextPlayer = game.turns.next()
    return this._controller.sendMessage(game.id, fromText(this._locale.nextTurn(nextPlayer)))
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
      return fromText(this._locale.gameNotFound)

    if (game.ownerId !== account.id)
      return fromText(this._locale.gameNotOwner)

    if (target?.id === undefined)
      return fromText(this._locale.noKickTarget)

    if (!game.players.contains(target.id))
      return fromText(this._locale.playerNotInGame)

    await this.leave(channelId, target.id)

    this._eventManager.publish("player:kicked", {
      game, player: game.players.get(target.id)!
    })

    return fromText(this._locale.playerKicked)
  }

  /**
   * Plays card
   * @param game
   * @param player
   * @param card
   */
  public async play(game: GameInfo, player: PlayerInfo, card: Card): Promise<OutMessage | undefined> {
    if (player.id !== -1 && game.turns.turn?.id !== player.id)
      return fromText(this._locale.gameInfo(game))

    if (player.id !== -1 && !this._modeManager.playable(game, card))
      return

    await this._modeManager.play(game, player, card)

    if (card.types.option === undefined) {
      player.cards.remove(card)

      game.deck.discard(card)
      game.previousCard = card

      this._eventManager.subscribeOnce("player:card:played", this.onCardPlayed.bind(this))
      this._eventManager.publish("player:card:played", { game, player, card })

      if (!game.started) return

      const nextPlayer = game.turns.next()
      this._eventManager.publish("player:turn", { game, player: nextPlayer })

      return fromText(this._locale.nextTurn(nextPlayer))
    }
  }

  /**
   *
   * @param channelId
   * @param player
   */
  public won(channelId: number, player: PlayerInfo): OutMessage {
    const game = this._gameRepository.get(channelId)

    if (game === undefined)
      return fromText(this._locale.gameNotFound)

    if (!game.started)
      return fromText(this._locale.gameNotStarted)

    const score = game.players.all.filter(p => p.id !== player.id).reduce((score, player) => {
      for (const card of player.cards) {
        score += CardScores[card.types.default || card.types.special || ""]
      }
      return score
    }, 0)

    this._eventManager.publish("player:won", { game, player, score })
    return fromText(this._locale.playerWon(player, score))
  }

  /**
   * Handles card played event
   * @param context
   */
  private async onCardPlayed(context: PlayerCardPlayedContext): Promise<unknown> {
    const { game, player } = context

    if (game.turns.turn && player.cards.length === 0) {
      const gameController = new GameController(this._gameRepository, this._eventManager, this._modeManager, this._locale)

      const wonMessage = this.won(game.id, player)
      const endMessage = gameController.end(game.id, player)

      await this._controller.sendMessage(game.id, wonMessage)
      return this._controller.sendMessage(game.id, endMessage)
    }

    if (game.turns.turn && player.cards.length === 1) {
      return this._controller.sendMessage(game.id, fromText(this._locale.uno))
    }
  }
}