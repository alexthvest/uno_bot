import { resolveController } from "@replikit/core"
import { AccountInfo, OutMessage } from "@replikit/core/typings"
import { fromText } from "@replikit/messages"
import { TelegramController } from "@replikit/telegram"
import { CardScores, CardType, EventManager, ModeManager, RepositoryBase } from "@uno_bot/main"
import { Card, GameInfo, PlayerCardPlayedContext, PlayerInfo, PlayerLeftContext } from "@uno_bot/main/typings"

export class PlayerController {
  private readonly _gameRepository: RepositoryBase<GameInfo>
  private readonly _eventManager: EventManager
  private readonly _modeManager: ModeManager
  private readonly _controller: TelegramController

  /**
   *
   * @param gameRepository
   * @param eventManager
   * @param modeManager
   */
  constructor(gameRepository: RepositoryBase<GameInfo>, eventManager: EventManager, modeManager: ModeManager) {
    this._gameRepository = gameRepository
    this._eventManager = eventManager
    this._modeManager = modeManager
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
      return fromText("GAME_NOT_FOUND")

    if (this._gameRepository.has(game => game.players.contains(account.id)))
      return fromText("PLAYER_ALREADY_IN_GAME")

    // TODO: Add deck empty check

    const player = game.players.add({
      ...account,
      cards: game.deck.drawFew(7)
    })

    this._eventManager.publish("player:joined", {
      game, player
    })

    return fromText("PLAYER_JOINED")
  }

  /**
   * Removes user from the game
   * @param channelId
   * @param accountId
   */
  public async leave(channelId: number, accountId: number): Promise<OutMessage> {
    const game = this._gameRepository.get(channelId)

    if (game === undefined)
      return fromText("GAME_NOT_FOUND")

    if (!game.players.contains(accountId))
      return fromText("PLAYER_NOT_IN_GAME")

    const player = game.players.get(accountId)!

    game.deck.discard(...player.cards)
    game.players.remove(accountId)

    this._eventManager.subscribeOnce("player:left", this.onPlayerLeft.bind(this))
    this._eventManager.publish("player:left", { game, player })

    return fromText("PLAYER_LEFT_GAME")
  }

  /**
   * Handles player left event
   * @param context
   */
  private onPlayerLeft(context: PlayerLeftContext): Promise<unknown> {
    const { game } = context

    if (!game.started)
      return Promise.resolve()

    if (game.players.length < 2) {
      this._gameRepository.remove(game.id)
      return this._controller.sendMessage(game.id, fromText("NOT_ENOUGH_PLAYER_TO_CONTINUE_GAME"))
    }

    game.turns.next()
    return this._controller.sendMessage(game.id, fromText("NEXT_PLAYER_TURN"))
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
      return fromText("GAME_NOT_FOUND")

    if (game.ownerId !== account.id)
      return fromText("NOT_GAME_OWNER")

    if (target?.id === undefined)
      return fromText("NO_KICK_TARGET")

    if (!game.players.contains(target.id))
      return fromText("PLAYER_NOT_IN_GAME")

    await this.leave(channelId, target.id)

    this._eventManager.publish("player:kicked", {
      game, player: game.players.get(target.id)!
    })

    return fromText("PLAYER_KICKED")
  }

  /**
   * Plays card
   * @param game
   * @param player
   * @param card
   */
  public async play(game: GameInfo, player: PlayerInfo, card: Card): Promise<OutMessage | undefined> {
    await this._modeManager.play(game, player, card)

    this._eventManager.subscribe("player:card:played", this.onCardPlayed.bind(this))
    this._eventManager.publish("player:card:played", { game, player, card })

    if (card.types.option) return
    player.cards.remove(card)

    game.deck.discard(card)
    game.previousCard = card

    const nextPlayer = game.turns.next()
    return fromText(`NEXT_PLAYER_TURN ${nextPlayer.firstName}`)
  }

  /**
   * Handles card played event
   * @param context
   */
  private onCardPlayed(context: PlayerCardPlayedContext): unknown {
    if (context.game.turns.turn && context.player.cards.length === 0) {
      const score = context.game.players.all.filter(p => p.id !== context.player.id).reduce((score, player) => {
        for (const card of player.cards) {
          score += CardScores[card.types.default || card.types.special || ""]
        }
        return score
      }, 0)

      this._eventManager.publish("game:closed", { ...context })
      this._eventManager.publish("player:won", { ...context, score })

      context.game.started = false
      this._gameRepository.remove(context.game.id)

      return this._controller.sendMessage(context.game.id, fromText(`Player won!\nScore: ${score}`))
    }

    if (context.game.turns.turn && context.player.cards.length === 1) {
      return this._controller.sendMessage(context.game.id, fromText("UNO!"))
    }
  }
}