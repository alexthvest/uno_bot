declare interface EventContextMap {}

export type EventName = keyof EventContextMap
export type EventHandler<T extends EventName> = (context: EventContextMap[T]) => unknown