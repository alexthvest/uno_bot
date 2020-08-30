import { EventContextMap, EventHandler, EventName } from "@uno_bot/main/typings"
import { EventEmitter } from "events"

export class EventManager {
  private readonly _emitter = new EventEmitter()

  /**
   *
   * @param event
   * @param handler
   */
  public subscribe<T extends EventName>(event: T, handler: EventHandler<T>): EventManager {
    this._emitter.on(event, handler)
    return this
  }

  /**
   *
   * @param event
   * @param handler
   */
  public subscribeOnce<T extends EventName>(event: T, handler: EventHandler<T>): EventManager {
    this._emitter.once(event, handler)
    return this
  }

  /**
   *
   * @param event
   * @param handler
   */
  public unsubscribe<T extends EventName>(event: T, handler: EventHandler<T>): EventManager {
    this._emitter.removeListener(event, handler)
    return this
  }

  /**
   *
   * @param event
   * @param context
   */
  public publish<T extends EventName>(event: T, context: EventContextMap[T]): boolean {
    return this._emitter.emit(event, context)
  }

  /**
   *
   * @param event
   */
  public count<T extends EventName>(event: T): number {
    return this._emitter.listenerCount(event)
  }
}