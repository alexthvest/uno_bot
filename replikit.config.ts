import { Configuration } from "@replikit/core/typings"

import "@replikit/telegram"
import "@uno_bot/main"

const config: Configuration = {
  telegram: {
    token: process.env.TOKEN!
  },
  uno: {
    minPlayers: 2,
    createWaitTime: 120
  }
}

export default config
