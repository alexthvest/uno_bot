import { InlineQueryChosenContext, InlineQueryReceivedContext, Router } from "@replikit/router"
import { NextHandler } from "@replikit/router/typings"
import { InlineEvent, InlineQueryDataResult } from "@uno_bot/main/typings"
import { EventEmitter } from "events"
import { v4 as uuid } from "uuid"

export class InlineManager {
  private readonly _events: InlineEvent<unknown>[] = []
  private readonly _emitter: EventEmitter = new EventEmitter()

  /**
   *
   * @param router
   */
  constructor(router: Router) {
    router.of("inline-query:received").use(this.onInlineQueryReceived.bind(this))
    router.of("inline-query:chosen").use(this.onInlineQueryChosen.bind(this))
  }

  /**
   * Sends inline menu and returns result
   * @param accountId
   * @param results
   */
  public inline<T>(accountId: number, results: InlineQueryDataResult<T>[]): Promise<T> {
    return new Promise(resolve => {
      const event: InlineEvent<T> = { id: uuid(), accountId, results }
      this._events.push(event)

      this._emitter.once(event.id, (data: T) => {
        const index = this._events.findIndex(e => e.id === event.id)
        this._events.splice(index, 1)

        return resolve(data)
      })
    })
  }

  /**
   * Sends inline menu to existed inline query context
   * @param context
   * @param results
   */
  public async inlineWithContext<T>(context: InlineQueryReceivedContext, results: InlineQueryDataResult<T>[]): Promise<T> {
    await context.answer({ results, cacheTime: 0 })
    return this.inline(context.account.id, results)
  }

  /**
   * Handles inline query event
   * @param context
   * @param next
   * @private
   */
  private onInlineQueryReceived(context: InlineQueryReceivedContext, next: NextHandler): Promise<unknown> | unknown {
    const event = this._events.find(event => event.accountId === context.account.id)
    if (event === undefined) return next()

    return context.answer({ results: event.results, cacheTime: 0 })
  }

  /**
   * Handles inline query choose event
   * @param context
   * @param next
   * @private
   */
  private onInlineQueryChosen(context: InlineQueryChosenContext, next: NextHandler): Promise<unknown> | unknown {
    const event = this._events.find(event => event.accountId === context.account.id)
    if (event === undefined) return next()

    const { data } = event.results.find(result => result.id === context.result.id)!
    return this._emitter.emit(event.id, data)
  }
}