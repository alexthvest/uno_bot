import { Configuration } from "@replikit/core/typings"

import "@replikit/telegram"
import "@uno_bot/cards"
import "@uno_bot/inline"
import "@uno_bot/main"

const config: Configuration = {
  telegram: {
    token: process.env.TOKEN!
  },
  uno: {
    createWaitTime: 120,
    minPlayers: 2
  }
}

export default config
