import { InlineQueryChosenContext, InlineQueryReceivedContext, Router } from "@replikit/router"
import { NextHandler } from "@replikit/router/typings"
import { InlineEvent, InlineEventOptions, InlineQueryDataResult } from "@uno_bot/main/typings"
import { EventEmitter } from "events"
import { v4 as uuid } from "uuid"

export class InlineManager {
  private readonly _storage: InlineEvent<unknown>[] = []
  private readonly _emitter: EventEmitter = new EventEmitter()

  /**
   *
   * @param router
   */
  public constructor(router: Router) {
    router.of("inline-query:received").use(this.onInlineQueryReceived.bind(this))
    router.of("inline-query:chosen").use(this.onInlineQueryChosen.bind(this))
  }

  /**
   * Sends inline menu and returns result
   * @param accountId
   * @param options
   */
  public inline<T>(accountId: number, options: InlineEventOptions<T>): Promise<T> {
    return new Promise(resolve => {
      const event: InlineEvent<T> = { id: uuid(), accountId, results: options.results, once: options.once }
      this._storage.push(event)

      this._emitter.once(event.id, (data: T) => {
        this._storage.remove(event)
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
    const result = this.inline(context.account.id, { results, once: true })
    await this.onInlineQueryReceived(context, () => {})

    return result
  }

  /**
   * Clears all events by account id
   * @param accountId
   */
  public removeEvents(accountId: number): void {
    this._storage.filter(e => e.accountId === accountId).forEach(event => {
      this._emitter.removeAllListeners(event.id)
      this._storage.remove(event)
    })
  }

  /**
   * Handles inline query event
   * @param context
   * @param next
   * @private
   */
  private onInlineQueryReceived(context: InlineQueryReceivedContext, next: NextHandler): Promise<void> | unknown {
    const event = this._storage.find(event => event.accountId === context.account.id)
    if (event === undefined) return next()

    if (event.once && event.showed) {
      this._storage.remove(event)
      return next()
    }

    event.showed = true
    return context.answer({ results: event.results, cacheTime: 0 })
  }

  /**
   * Handles inline query choose event
   * @param context
   * @param next
   * @private
   */
  private onInlineQueryChosen(context: InlineQueryChosenContext, next: NextHandler): Promise<unknown> | unknown {
    const event = this._storage.find(event => event.accountId === context.account.id)
    if (event === undefined) return next()

    const { data } = event.results.find(result => result.id === context.result.id)!
    return this._emitter.emit(event.id, data)
  }
}