import { RepositoryBase, shuffle } from "@uno_bot/main"
import { PlayerInfo } from "@uno_bot/main/typings"

export class TurnManager {
  private _turn: PlayerInfo | undefined
  private _reversed: boolean = false

  private _index: number = -1
  private readonly _players: RepositoryBase<PlayerInfo>

  /**
   *
   * @param players
   */
  constructor(players: RepositoryBase<PlayerInfo>) {
    this._players = players
    shuffle(this._players.all)
  }

  /**
   * Returns turn player
   */
  public get turn(): PlayerInfo | undefined { return this._turn }

  /**
   * Returns true if game reversed
   */
  public get reversed(): boolean { return this._reversed }

  /**
   * Reverses game turns
   */
  public reverse(): boolean { return this._reversed = !this._reversed }

  /**
   * Passes move to next player
   */
  public next(): PlayerInfo {
    if (this._turn) this._turn.drew = false
    this._index += this.reversed ? -1 : 1

    if (this._index >= this._players.length) {
      this._index = 0
    } else if (this._index < 0) {
      this._index = this._players.length - 1
    }

    return this._turn = this._players.all[this._index]
  }
}