import { AccountInfo } from "@replikit/core/typings"
import { Card } from "@uno_bot/main/typings"
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
  return (card.types.default || card.types.special || "").capitalize()
}

/**
 * Returns elapsed time from game start
 * @param start
 * @param language
 */
export function displayElapsedTime(start: Moment, language: string): string {
  moment.locale(language)
  return moment.duration(moment().diff(start)).humanize()
}