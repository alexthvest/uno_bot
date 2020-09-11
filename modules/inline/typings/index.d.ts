import { InlineQueryResult, Identifier } from "@replikit/core/typings"

export interface InlineEvent<T> {
  id: string
  accountId: Identifier
  results: InlineQueryDataResult<T>[]

  once?: boolean
  showed?: boolean
}

export interface InlineEventOptions<T> {
  results: InlineQueryDataResult<T>[]
  once?: boolean
}

export type InlineQueryDataResult<T> = InlineQueryResult & {
  data: T
}