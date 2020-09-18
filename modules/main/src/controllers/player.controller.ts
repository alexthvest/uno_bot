import { config } from "@replikit/core"
import { AccountInfo, ChannelInfo, Identifier, OutMessage } from "@replikit/core/typings"
import { fromText, MessageBuilder } from "@replikit/messages"
import { getCardScore, isOptionCardType } from "@uno_bot/cards"
import { Card } from "@uno_bot/cards/typings"
import { ControllerBase, DefaultLocale, EventManager, GameController, ModeManager, RepositoryBase } from "@uno_bot/main"
import { GameInfo, PlayerCardPlayedContext, PlayerInfo, PlayerLeftContext } from "@uno_bot/main/typings"

export class PlayerController extends ControllerBase {
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
    this._eventManager = eventManager
    this._modeManager = modeManager
    this._locale = locale
  }

  /**
   * Adds player to the game
   * @param channel
   * @param account
   */
  public join(channel: ChannelInfo, account: AccountInfo): OutMessage {
    const game = this._gameRepository.get(channel.id)

    if (game === undefined)
      return fromText(this._locale.gameNotFound)

    if (this._gameRepository.has(game => game.players.contains(account.id)))
      return fromText(this._locale.playerAlreadyJoined)

    if (game.started)
      return fromText(this._locale.gameAlreadyStarted)

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
   * @param channel
   * @param accountId
   */
  public async leave(channel: ChannelInfo, accountId: Identifier): Promise<OutMessage> {
    const game = this._gameRepository.get(channel.id)

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
  private onPlayerLeft(context: PlayerLeftContext): Promise<unknown> | unknown {
    const { game } = context

    if (!game.started)
      return

    for (const card of context.player.cards) {
      game.score += getCardScore(card.type)
    }

    if (game.players.length < config.uno.minPlayers) {
      const wonMessage = this.won(game.channel, game.players.all[0])
      this._gameRepository.remove(game.id)

      return this.message(game.id, wonMessage)
    }

    if (game.turns.turn?.id === context.player.id) {
      const nextPlayer = game.turns.next()
      return this.message(game.id, fromText(this._locale.nextTurn(nextPlayer)))
    }
  }

  /**
   * Kicks player from game
   * @param channel
   * @param account
   * @param target
   */
  public async kick(channel: ChannelInfo, account: AccountInfo, target: AccountInfo | undefined): Promise<OutMessage> {
    const game = this._gameRepository.get(channel.id)

    if (game === undefined)
      return fromText(this._locale.gameNotFound)

    if (game.owner.id !== account.id)
      return fromText(this._locale.gameNotOwner)

    if (target?.id === undefined)
      return fromText(this._locale.noKickTarget)

    if (!game.players.contains(target.id))
      return fromText(this._locale.playerNotInGame)

    await this.leave(channel, target.id)

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
      return

    if (player.id !== -1 && !this._modeManager.playable(game, card))
      return

    if (isOptionCardType(card.type)) {
      await this._modeManager.play(game, player, card)
      return
    }

    player.cards.remove(card)
    game.deck.discard(card)
    game.previousCard = card

    await this._modeManager.play(game, player, card)

    this._eventManager.subscribeOnce("player:card:played", this.onCardPlayed.bind(this))
    this._eventManager.publish("player:card:played", { game, player, card })

    if (!game.started) return

    const nextPlayer = game.turns.next()
    this._eventManager.publish("player:turn", { game, player: nextPlayer })

    return new MessageBuilder()
      .addText(this._locale.nextTurn(nextPlayer))
      .addButton({
        text: this._locale.buttonChooseCard,
        switchInline: { current: true, username: "" }
      })
      .build()
  }

  /**
   *
   * @param channel
   * @param player
   */
  public won(channel: ChannelInfo, player: PlayerInfo): OutMessage {
    const game = this._gameRepository.get(channel.id)

    if (game === undefined)
      return fromText(this._locale.gameNotFound)

    if (!game.started)
      return fromText(this._locale.gameNotStarted)

    game.score += game.players.all.filter(p => p.id !== player.id).reduce((score, player) => {
      for (const card of player.cards) {
        score += getCardScore(card.type)
      }
      return score
    }, 0)

    this._eventManager.publish("player:won", { game, player, score: game.score })
    return fromText(this._locale.playerWon(player, game.score))
  }

  /**
   * Handles card played event
   * @param context
   */
  private async onCardPlayed(context: PlayerCardPlayedContext): Promise<unknown> {
    const { game, player } = context

    if (game.turns.turn && player.cards.length === 0) {
      const gameController = new GameController(this._gameRepository, this._eventManager, this._modeManager, this._locale)

      const wonMessage = this.won(game.channel, player)
      const endMessage = gameController.end(game.channel, player)

      await this.message(game.id, wonMessage)
      return this.message(game.id, endMessage)
    }

    if (game.turns.turn && player.cards.length === 1) {
      return this.message(game.id, fromText(this._locale.uno))
    }
  }
}