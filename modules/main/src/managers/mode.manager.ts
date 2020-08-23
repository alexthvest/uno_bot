import { Card, Mode, ModeRuleContext } from "@uno_bot/main/typings"

export class ModeManager {
  private readonly _modes: Mode[]

  /**
   * Returns all registered modes
   */
  public get modes(): Mode[] { return this._modes }

  /**
   *
   * @param modes
   */
  constructor(...modes: Mode[]) {
    this._modes = modes
  }

  /**
   * Checks if card is playable
   * @param card
   * @param modes
   */
  public playable(card: Card, modes: Mode[]): boolean {
    throw new Error("Not implemented")
  }

  /**
   * Plays the card
   * @param card
   * @param context
   */
  public play(card: Card, context: ModeRuleContext): Promise<unknown> | unknown {
    throw new Error("Not implemented")
  }
}