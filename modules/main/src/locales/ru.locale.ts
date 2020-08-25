import { locales, ru } from "@replikit/i18n"
import { ColorEmoji, DefaultLocale, displayAccountName, displayCardType, displayElapsedTime } from "@uno_bot/main"

locales.add("ru", DefaultLocale, {
  /**
   * Game locales
   */
  gameStarted: "Началась новая игра",
  gameAlreadyStarted: "Игра уже началась",
  gameCreated: "Создана новая игра! Присоединитесь к ней командой /join и начните, написав /start",
  gameClosed: "Игра закрыта",
  gameNotFound: "Нет активных игр в данный момент. Создайте новую, написав /create",
  gameNotOwner: "Вы не владелец игры",
  gameNotEnoughPlayers: "Недостаточно игроков чтобы начать игру",
  gameEnded: "Игра окончена!",
  gameInfo: game => [
    `Ход: ${displayAccountName(game.turns.turn!)}`,
    `Последняя карта: ${ColorEmoji[game.previousCard!.color]} ${displayCardType(game.previousCard!)}`,
    `Времени прошло: ${displayElapsedTime(game.startedAt!, game.turns.turn?.language || "en")}`
  ].join("\n"),

  /**
   * Player locales
   */
  playerJoined: "Вы присоединились к игре",
  playerLeft: "Вы покинули игру",
  playerAlreadyJoined: "Вы уже присоединились к игре",
  playerNotInGame: "Игрок не находится в игре",
  playerKicked: "Пользователь кикнут из игры",
  playerWon: account =>
    `${displayAccountName(account)} победил!`,
  playerDraw: (account, count) =>
    `${displayAccountName(account)} берет ${ru.plural(count, "$ карту", "$ карты")}`,
  playerSkipTurn: account =>
    `${displayAccountName(account)} пропускает ход`,

  /**
   * Presentation locales
   */
  notInGameTitle: "Вы не находитесь в игре",
  notInGameDescription: "Напишите /create чтобы создать новую игру или /join чтобы присоединитья к существующей",
  gameNotStartedTitle: "Игра еще не началась",
  gameNotStartedDescription: "Напишите /start чтобы начать игру",
  noDescription: "Нет описания",
  yourCardsTitle: "Ваши карты",
  chooseColor: "Пожалуйста, выберите цвет",

  /**
   * Other locales
   */
  uno: "UNO!",
  deckIsEmpty: "В колоде больше нет карт",
  noKickTarget: "Пользователь не найден, ответьте на сообщение чтобы кикнуть игрока",
  nextTurn: account =>
    `Следующий игрок: ${displayAccountName(account)} (@${account.username})`,
  timeHasNotPassed: minutes =>
    `Новую игру можно создать только через  ${ru.plural(minutes, "$ минута", "$ минуты", "$ минут")} после создания`
})