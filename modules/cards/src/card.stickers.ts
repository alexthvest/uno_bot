import { CardColor, CardDefaultType, CardOptionType, CardSpecialType } from "@uno_bot/cards"

export const ColorEmoji: { [key: string]: string } = {
  [CardColor.Red]: "🟥",
  [CardColor.Green]: "🟩",
  [CardColor.Blue]: "🟦",
  [CardColor.Yellow]: "🟨",
  [CardColor.Black]: "⬛"
}

export const CardScores: { [key: string]: number } = {
  [CardDefaultType.Zero]: 0,
  [CardDefaultType.One]: 1,
  [CardDefaultType.Two]: 2,
  [CardDefaultType.Three]: 3,
  [CardDefaultType.Four]: 4,
  [CardDefaultType.Five]: 5,
  [CardDefaultType.Six]: 6,
  [CardDefaultType.Seven]: 7,
  [CardDefaultType.Eight]: 8,
  [CardDefaultType.Nine]: 9,
  [CardDefaultType.Skip]: 20,
  [CardDefaultType.DrawTwo]: 20,
  [CardDefaultType.Reverse]: 20,
  [CardSpecialType.Color]: 50,
  [CardSpecialType.DrawFour]: 50
}

export const CardStickers: { [key: string]: { [key: string]: string[] } } = {
  [CardColor.Red]: {
    [CardDefaultType.Zero]: [
      "BQADBAADEQIAAl9XmQABiUfr1hz-zT8C",
      "BQADBAADfQIAAl9XmQABWrxoiXcsg0EC"
    ],
    [CardDefaultType.One]: [
      "BQADBAADEwIAAl9XmQAB5bWfwJGs6Q0C",
      "BQADBAADfwIAAl9XmQABlav-bkgSgRcC"
    ],
    [CardDefaultType.Two]: [
      "BQADBAADFQIAAl9XmQABHR4mg9Ifjw0C",
      "BQADBAADgQIAAl9XmQABDjZkqfJ4AdAC"
    ],
    [CardDefaultType.Three]: [
      "BQADBAADFwIAAl9XmQABYBx5O_PG2QIC",
      "BQADBAADgwIAAl9XmQABT7lH7VVcy3MC"
    ],
    [CardDefaultType.Four]: [
      "BQADBAADGQIAAl9XmQABTQpGrlvet3cC",
      "BQADBAADhQIAAl9XmQAB1arPC5x0LrwC"
    ],
    [CardDefaultType.Five]: [
      "BQADBAADGwIAAl9XmQABbdLt4gdntBQC",
      "BQADBAADhwIAAl9XmQABWvs7xkCDldkC"
    ],
    [CardDefaultType.Six]: [
      "BQADBAADHQIAAl9XmQABqEI274p3lSoC",
      "BQADBAADiQIAAl9XmQABjwABH5ZonWn8Ag"
    ],
    [CardDefaultType.Seven]: [
      "BQADBAADHwIAAl9XmQABCw8u67Q4EK4C",
      "BQADBAADiwIAAl9XmQABjekJfm4fBDIC"
    ],
    [CardDefaultType.Eight]: [
      "BQADBAADIQIAAl9XmQAB8iDJmLxp8ogC",
      "BQADBAADjQIAAl9XmQABqFjchpsJeEkC"
    ],
    [CardDefaultType.Nine]: [
      "BQADBAADIwIAAl9XmQAB_HCAww1kNGYC",
      "BQADBAADjwIAAl9XmQAB-sKdcgABdNKDAg"
    ],
    [CardDefaultType.DrawTwo]: [
      "BQADBAADJQIAAl9XmQABuz0OZ4l3k6MC",
      "BQADBAADkQIAAl9XmQABtw9RPVDHZOQC"
    ],
    [CardDefaultType.Skip]: [
      "BQADBAADKQIAAl9XmQAC2AL5Ok_ULwI",
      "BQADBAADlQIAAl9XmQABtG2GixCxtX4C"
    ],
    [CardDefaultType.Reverse]: [
      "BQADBAADJwIAAl9XmQABu2tIeQTpDvUC",
      "BQADBAADkwIAAl9XmQABz2qyEbabnVsC"
    ]
  },
  [CardColor.Green]: {
    [CardDefaultType.Zero]: [
      "BQADBAAD9wEAAl9XmQABb8CaxxsQ-Y8C",
      "BQADBAADYwIAAl9XmQABGD5a9oG7Yg4C"
    ],
    [CardDefaultType.One]: [
      "BQADBAAD-QEAAl9XmQAB9B6ti_j6UB0C",
      "BQADBAADZQIAAl9XmQABqwABZHAXZIg0Ag"
    ],
    [CardDefaultType.Two]: [
      "BQADBAAD-wEAAl9XmQABYpLjOzbRz8EC",
      "BQADBAADZwIAAl9XmQABTI3mrEhojRkC"
    ],
    [CardDefaultType.Three]: [
      "BQADBAAD_QEAAl9XmQABKvc2ZCiY-D8C",
      "BQADBAADaQIAAl9XmQABVi3rUyzWS3YC"
    ],
    [CardDefaultType.Four]: [
      "BQADBAAD_wEAAl9XmQABJB52wzPdHssC",
      "BQADBAADawIAAl9XmQABZIf5ThaXnpUC"
    ],
    [CardDefaultType.Five]: [
      "BQADBAADAQIAAl9XmQABp_Ep1I4GA2cC",
      "BQADBAADbQIAAl9XmQABNndVJSQCenIC"
    ],
    [CardDefaultType.Six]: [
      "BQADBAADAwIAAl9XmQABaaMxxa4MihwC",
      "BQADBAADbwIAAl9XmQABpoy1c4ZkrvwC"
    ],
    [CardDefaultType.Seven]: [
      "BQADBAADBQIAAl9XmQABv5Q264Crz8gC",
      "BQADBAADcQIAAl9XmQABDeaT5fzxwREC"
    ],
    [CardDefaultType.Eight]: [
      "BQADBAADBwIAAl9XmQABjMH-X9UHh8sC",
      "BQADBAADcwIAAl9XmQABLIQ06ZM5NnAC"
    ],
    [CardDefaultType.Nine]: [
      "BQADBAADCQIAAl9XmQAB26fZ2fW7vM0C",
      "BQADBAADdQIAAl9XmQABel-mC7eXGsMC"
    ],
    [CardDefaultType.DrawTwo]: [
      "BQADBAADCwIAAl9XmQAB64jIZrgXrQUC",
      "BQADBAADdwIAAl9XmQABOHEpxSztCf8C"
    ],
    [CardDefaultType.Skip]: [
      "BQADBAADDwIAAl9XmQAB17yhhnh46VQC",
      "BQADBAADewIAAl9XmQABDaQdMxjjPsoC"
    ],
    [CardDefaultType.Reverse]: [
      "BQADBAADDQIAAl9XmQAB_xcaab0DkegC",
      "BQADBAADeQIAAl9XmQABek1lGz7SJNAC"
    ]
  },
  [CardColor.Blue]: {
    [CardDefaultType.Zero]: [
      "BQADBAAD2QEAAl9XmQAB--inQsYcLTsC",
      "BQADBAADRQIAAl9XmQAB1IfkQ5xAiK4C"
    ],
    [CardDefaultType.One]: [
      "BQADBAAD2wEAAl9XmQABBzh4U-rFicEC",
      "BQADBAADRwIAAl9XmQABbWvhTeKBii4C"
    ],
    [CardDefaultType.Two]: [
      "BQADBAAD3QEAAl9XmQABo3l6TT0MzKwC",
      "BQADBAADSQIAAl9XmQABS1djHgyQokMC"
    ],
    [CardDefaultType.Three]: [
      "BQADBAAD3wEAAl9XmQAB2y-3TSapRtIC",
      "BQADBAADSwIAAl9XmQABwQ6VTbgY-MIC"
    ],
    [CardDefaultType.Four]: [
      "BQADBAAD4QEAAl9XmQABT6nhOuolqKYC",
      "BQADBAADTQIAAl9XmQABAlKUYha8YccC"
    ],
    [CardDefaultType.Five]: [
      "BQADBAAD4wEAAl9XmQABwRfmekGnpn0C",
      "BQADBAADTwIAAl9XmQABMvx8xVDnhUEC"
    ],
    [CardDefaultType.Six]: [
      "BQADBAAD5QEAAl9XmQABQITgUsEsqxsC",
      "BQADBAADUQIAAl9XmQABDEbhP1Zd31kC"
    ],
    [CardDefaultType.Seven]: [
      "BQADBAAD5wEAAl9XmQABVhPF6EcfWjEC",
      "BQADBAADUwIAAl9XmQABXb5XQBBaAnIC"
    ],
    [CardDefaultType.Eight]: [
      "BQADBAAD6QEAAl9XmQABP6baig0pIvYC",
      "BQADBAADVQIAAl9XmQABgL5HRDLvrjgC"
    ],
    [CardDefaultType.Nine]: [
      "BQADBAAD6wEAAl9XmQAB0CQdsQs_pXIC",
      "BQADBAADVwIAAl9XmQABtO3XDQWZLtYC"
    ],
    [CardDefaultType.DrawTwo]: [
      "BQADBAAD7QEAAl9XmQAB00Wii7R3gDUC",
      "BQADBAADWQIAAl9XmQAB2kk__6_2IhMC"
    ],
    [CardDefaultType.Skip]: [
      "BQADBAAD8QEAAl9XmQAB_RJHYKqlc-wC",
      "BQADBAADXQIAAl9XmQABEGJI6CaH3vcC"
    ],
    [CardDefaultType.Reverse]: [
      "BQADBAAD7wEAAl9XmQABo7D0B9NUPmYC",
      "BQADBAADWwIAAl9XmQAB_kZA6UdHXU8C"
    ]
  },
  [CardColor.Yellow]: {
    [CardDefaultType.Zero]: [
      "BQADBAADKwIAAl9XmQAB_nWoNKe8DOQC",
      "BQADBAADlwIAAl9XmQABAb3ZwTGS1lMC"
    ],
    [CardDefaultType.One]: [
      "BQADBAADLQIAAl9XmQABVprAGUDKgOQC",
      "BQADBAADmQIAAl9XmQAB9v5qJk9R0x8C"
    ],
    [CardDefaultType.Two]: [
      "BQADBAADLwIAAl9XmQABqyT4_YTm54EC",
      "BQADBAADmwIAAl9XmQABCsgpRHC2g-cC"
    ],
    [CardDefaultType.Three]: [
      "BQADBAADMQIAAl9XmQABGC-Xxg_N6fIC",
      "BQADBAADnQIAAl9XmQAB3kLLXCv-qY0C"
    ],
    [CardDefaultType.Four]: [
      "BQADBAADMwIAAl9XmQABbc-ZGL8kApAC",
      "BQADBAADnwIAAl9XmQAB7R_y-NexNLIC"
    ],
    [CardDefaultType.Five]: [
      "BQADBAADNQIAAl9XmQAB67QJZIF6XAcC",
      "BQADBAADoQIAAl9XmQABl-7mwsjD-cMC"
    ],
    [CardDefaultType.Six]: [
      "BQADBAADNwIAAl9XmQABJg_7XXoITsoC",
      "BQADBAADowIAAl9XmQABwbVsyv2MfPkC"
    ],
    [CardDefaultType.Seven]: [
      "BQADBAADOQIAAl9XmQABVrd7OcS2k34C",
      "BQADBAADpQIAAl9XmQABoBqC0JsemVwC"
    ],
    [CardDefaultType.Eight]: [
      "BQADBAADOwIAAl9XmQABRpJSahBWk3EC",
      "BQADBAADpwIAAl9XmQABpkwAAeh9ldlHAg"
    ],
    [CardDefaultType.Nine]: [
      "BQADBAADPQIAAl9XmQAB9MwJWKLJogYC",
      "BQADBAADqQIAAl9XmQABpSBEUfd4IM8C"
    ],
    [CardDefaultType.DrawTwo]: [
      "BQADBAADPwIAAl9XmQABaPYK8oYg84cC",
      "BQADBAADqwIAAl9XmQABMt-2zW0VYb4C"
    ],
    [CardDefaultType.Skip]: [
      "BQADBAADQwIAAl9XmQABO_AZKtxY6IMC",
      "BQADBAADrwIAAl9XmQABIDf-_TuuxtEC"
    ],
    [CardDefaultType.Reverse]: [
      "BQADBAADQQIAAl9XmQABZdQFahGG6UQC",
      "BQADBAADrQIAAl9XmQABm9M0Zh-_UwkC"
    ]
  },
  [CardColor.Black]: {
    [CardSpecialType.DrawFour]: [
      "BQADBAAD9QEAAl9XmQABVlkSNfhn76cC",
      "BQADBAADYQIAAl9XmQAB_HWlvZIscDEC"
    ],
    [CardSpecialType.Color]: [
      "BQADBAAD8wEAAl9XmQABl9rUOPqx4E4C",
      "BQADBAADXwIAAl9XmQABY_ksDdMex-wC"
    ]
  },
  [CardColor.Option]: {
    [CardOptionType.Draw]: ["BQADBAAD-AIAAl9XmQABxEjEcFM-VHIC"],
    [CardOptionType.Pass]: ["BQADBAAD-gIAAl9XmQABcEkAAbaZ4SicAg"]
  }
}