import { InlineQueryResult } from "@replikit/core/typings"

export interface InlineEvent<T> {
  id: string
  accountId: number
  results: InlineQueryDataResult<T>[]
}

export type InlineQueryDataResult<T> = InlineQueryResult & {
  data: T
}