import { RepositoryBase, shuffle } from "@uno_bot/main"
import { PlayerInfo } from "@uno_bot/main/typings"

export class TurnManager {
  private readonly _playerRepository: RepositoryBase<PlayerInfo>

  private _turn: PlayerInfo | undefined
  private _reversed: boolean = false
  private _index: number = -1

  /**
   *
   * @param playerRepository
   */
  public constructor(playerRepository: RepositoryBase<PlayerInfo>) {
    this._playerRepository = playerRepository
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
   * Shuffles players
   */
  public shuffle(): PlayerInfo[] { return shuffle(this._playerRepository.all) }

  /**
   * Passes move to next player
   */
  public next(): PlayerInfo {
    if (this._turn) this._turn.drew = false
    this._index += this.reversed ? -1 : 1

    if (this._index >= this._playerRepository.length) {
      this._index = 0
    } else if (this._index < 0) {
      this._index = this._playerRepository.length - 1
    }

    return this._turn = this._playerRepository.all[this._index]
  }
}