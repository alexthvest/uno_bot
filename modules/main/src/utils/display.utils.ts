import { AccountInfo } from "@replikit/core/typings"
import { Card } from "@uno_bot/cards/typings"
import moment, { Moment } from "moment"

/**
 * Returns account full name
 * @param account
 */
export function displayAccountName(account: AccountInfo): string {
  return `${account.firstName} ${account.lastName}`.replace("undefined", "").trim()
}

/**
 * Returns card type display string
 * @param card
 */
export function displayCardType(card: Card): string {
  return card.type.capitalize()
}

/**
 * Returns elapsed time from game start
 * @param start
 * @param language
 */
export function displayElapsedTime(start: Moment, language: string): string {
  const duration = moment.duration(moment().diff(start)).asMilliseconds()
  return moment.utc(duration).format("HH:mm:ss")
}