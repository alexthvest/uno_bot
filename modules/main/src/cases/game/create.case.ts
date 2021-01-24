import { config } from "@replikit/core"
import { AccountInfo, ChannelInfo } from "@replikit/core/typings"
import { DefaultLocale, EventManager, RepositoryBase, createGame } from "@uno_bot/main"
import { GameInfo } from "@uno_bot/main/typings"
import moment from "moment"

interface CreateCaseDependecies {
  gameRepository: RepositoryBase<GameInfo>
  eventManager: EventManager
}

export default function buildCase({ gameRepository, eventManager }: CreateCaseDependecies) {
  return (channel: ChannelInfo, account: AccountInfo, locale: DefaultLocale) => {
    let game = gameRepository.get(channel.id)

    if (game && moment().diff(game.createdAt, "seconds") < config.uno.createWaitTime) {
      return locale.timeHasNotPassed(config.uno.createWaitTime)
    }

    if (game && game.started) {
      return locale.gameAlreadyStarted
    }

    game = createGame(channel, account)

    gameRepository.remove(channel.id)
    gameRepository.add(game)

    eventManager.publish("game:created", { game, account })

    return locale.gameCreated
  }
}