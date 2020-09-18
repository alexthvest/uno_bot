import { AccountInfo } from "@replikit/core/typings"
import { GameInfo } from "@uno_bot/main/typings"

export class DefaultLocale {
  public static readonly namespace = "default:locale"

  /**
   * Game locales
   */
  public gameStarted: string
  public gameAlreadyStarted: string
  public gameCreated: string
  public gameClosed: string
  public gameNotFound: string
  public gameNotOwner: string
  public gameNotEnoughPlayers: string
  public gameNotStarted: string
  public gameEnded: string
  public gameInfo: (game: GameInfo, account: AccountInfo) => string

  /**
   * Player locales
   */
  public playerJoined: string
  public playerLeft: string
  public playerAlreadyJoined: string
  public playerNotInGame: string
  public playerKicked: string
  public playerWon: (account: AccountInfo, score: number) => string
  public playerDraw: (account: AccountInfo, count: number) => string
  public playerSkipTurn: (account: AccountInfo) => string

  /**
   * Presentation locales
   */
  public notInGameTitle: string
  public notInGameDescription: string
  public gameNotStartedTitle: string
  public gameNotStartedDescription: string
  public noDescription: string
  public yourCardsTitle: string
  public chooseColor: string
  public buttonChooseCard: string
  public buttonChooseColor: string

  /**
   * Other locales
   */
  public uno: string
  public deckIsEmpty: string
  public noKickTarget: string
  public nextTurn: (account: AccountInfo) => string
  public timeHasNotPassed: (minutes: number) => string
}