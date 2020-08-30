import "@replikit/core/typings"

export interface UnoConfiguration {
  /**
   * Sets minimum number of players to start game
   */
  minPlayers?: number

  /**
   * Sets wait time in seconds before new game creation
   */
  createWaitTime?: number
}

declare module "@replikit/core/typings/configuration" {
  export interface Configuration {
    uno?: UnoConfiguration
  }
}