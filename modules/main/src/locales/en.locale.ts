import { locales, ru } from "@replikit/i18n"
import { getColorEmoji } from "@uno_bot/cards"
import { DefaultLocale, displayAccountName, displayCardType, displayElapsedTime } from "@uno_bot/main"

locales.add("en", DefaultLocale, {
  /**
   * Game locales
   */
  gameStarted: "The game is started",
  gameAlreadyStarted: "The game has already started",
  gameCreated: "Created a new game! Join the game with /join and start the game with /start",
  gameClosed: "The game is closed",
  gameNotFound: "No game is running at the moment",
  gameNotOwner: "You are not the game owner",
  gameNotEnoughPlayers: "Not enough players to start the game",
  gameNotStarted: "Game not started yet",
  gameEnded: "Game ended!",
  gameInfo: game => [
    `Turn: ${displayAccountName(game.turns.turn!)}`,
    `Last card: ${getColorEmoji(game.previousCard!.color)} ${displayCardType(game.previousCard!)}`,
    `Time elapsed: ${displayElapsedTime(game.startedAt!, game.turns.turn?.language || "en")}`
  ].join("\n"),

  /**
   * Player locales
   */
  playerJoined: "You joined the game",
  playerLeft: "You left the game",
  playerAlreadyJoined: "You are already in a game",
  playerNotInGame: "Player not in the game",
  playerKicked: "Player kicked from the game",
  playerWon: (account, score) =>
    `${displayAccountName(account)} won the game! (Score: ${score})`,
  playerDraw: (account, count) =>
    `${displayAccountName(account)} drawing ${ru.plural(count, "$ card", "$ cards")}`,
  playerSkipTurn: account =>
    `${displayAccountName(account)} skips the turn`,

  /**
   * Presentation locales
   */
  notInGameTitle: "You are not in the game",
  notInGameDescription: "Enter /create command to create new game or /join command to join to existed game",
  gameNotStartedTitle: "The game wasn't started yet",
  gameNotStartedDescription: "Enter /start command to start the game",
  noDescription: "No description",
  yourCardsTitle: "Your cards",
  chooseColor: "Please choose a color",

  /**
   * Other locales
   */
  uno: "UNO!",
  deckIsEmpty: "There are no more cards in the deck",
  noKickTarget: "No user to kick was found, reply user message to kick him",
  nextTurn: account =>
    `Next turn: ${displayAccountName(account)} (@${account.username})`,
  timeHasNotPassed: seconds =>
    `A new game can only be created ${ru.plural(seconds, "$ second", "$ seconds")} after creation`
})