import { CardColor, CardOptionType, CardSpecialType, CardType } from "@uno_bot/main"

export const ColorEmoji: { [key: string]: string } = {
  [CardColor.Red]: "🟥",
  [CardColor.Green]: "🟩",
  [CardColor.Blue]: "🟦",
  [CardColor.Yellow]: "🟨",
  [CardColor.Black]: "⬛"
}

export const CardStickers: { [key: string]: { [key: string]: string[] } } = {
  [CardColor.Red]: {
    [CardType.Zero]: [
      "BQADBAADEQIAAl9XmQABiUfr1hz-zT8C",
      "BQADBAADfQIAAl9XmQABWrxoiXcsg0EC"
    ],
    [CardType.One]: [
      "BQADBAADEwIAAl9XmQAB5bWfwJGs6Q0C",
      "BQADBAADfwIAAl9XmQABlav-bkgSgRcC"
    ],
    [CardType.Two]: [
      "BQADBAADFQIAAl9XmQABHR4mg9Ifjw0C",
      "BQADBAADgQIAAl9XmQABDjZkqfJ4AdAC"
    ],
    [CardType.Three]: [
      "BQADBAADFwIAAl9XmQABYBx5O_PG2QIC",
      "BQADBAADgwIAAl9XmQABT7lH7VVcy3MC"
    ],
    [CardType.Four]: [
      "BQADBAADGQIAAl9XmQABTQpGrlvet3cC",
      "BQADBAADhQIAAl9XmQAB1arPC5x0LrwC"
    ],
    [CardType.Five]: [
      "BQADBAADGwIAAl9XmQABbdLt4gdntBQC",
      "BQADBAADhwIAAl9XmQABWvs7xkCDldkC"
    ],
    [CardType.Six]: [
      "BQADBAADHQIAAl9XmQABqEI274p3lSoC",
      "BQADBAADiQIAAl9XmQABjwABH5ZonWn8Ag"
    ],
    [CardType.Seven]: [
      "BQADBAADHwIAAl9XmQABCw8u67Q4EK4C",
      "BQADBAADiwIAAl9XmQABjekJfm4fBDIC"
    ],
    [CardType.Eight]: [
      "BQADBAADIQIAAl9XmQAB8iDJmLxp8ogC",
      "BQADBAADjQIAAl9XmQABqFjchpsJeEkC"
    ],
    [CardType.Nine]: [
      "BQADBAADIwIAAl9XmQAB_HCAww1kNGYC",
      "BQADBAADjwIAAl9XmQAB-sKdcgABdNKDAg"
    ],
    [CardType.DrawTwo]: [
      "BQADBAADJQIAAl9XmQABuz0OZ4l3k6MC",
      "BQADBAADkQIAAl9XmQABtw9RPVDHZOQC"
    ],
    [CardType.Skip]: [
      "BQADBAADKQIAAl9XmQAC2AL5Ok_ULwI",
      "BQADBAADlQIAAl9XmQABtG2GixCxtX4C"
    ],
    [CardType.Reverse]: [
      "BQADBAADJwIAAl9XmQABu2tIeQTpDvUC",
      "BQADBAADkwIAAl9XmQABz2qyEbabnVsC"
    ]
  },
  [CardColor.Green]: {
    [CardType.Zero]: [
      "BQADBAAD9wEAAl9XmQABb8CaxxsQ-Y8C",
      "BQADBAADYwIAAl9XmQABGD5a9oG7Yg4C"
    ],
    [CardType.One]: [
      "BQADBAAD-QEAAl9XmQAB9B6ti_j6UB0C",
      "BQADBAADZQIAAl9XmQABqwABZHAXZIg0Ag"
    ],
    [CardType.Two]: [
      "BQADBAAD-wEAAl9XmQABYpLjOzbRz8EC",
      "BQADBAADZwIAAl9XmQABTI3mrEhojRkC"
    ],
    [CardType.Three]: [
      "BQADBAAD_QEAAl9XmQABKvc2ZCiY-D8C",
      "BQADBAADaQIAAl9XmQABVi3rUyzWS3YC"
    ],
    [CardType.Four]: [
      "BQADBAAD_wEAAl9XmQABJB52wzPdHssC",
      "BQADBAADawIAAl9XmQABZIf5ThaXnpUC"
    ],
    [CardType.Five]: [
      "BQADBAADAQIAAl9XmQABp_Ep1I4GA2cC",
      "BQADBAADbQIAAl9XmQABNndVJSQCenIC"
    ],
    [CardType.Six]: [
      "BQADBAADAwIAAl9XmQABaaMxxa4MihwC",
      "BQADBAADbwIAAl9XmQABpoy1c4ZkrvwC"
    ],
    [CardType.Seven]: [
      "BQADBAADBQIAAl9XmQABv5Q264Crz8gC",
      "BQADBAADcQIAAl9XmQABDeaT5fzxwREC"
    ],
    [CardType.Eight]: [
      "BQADBAADBwIAAl9XmQABjMH-X9UHh8sC",
      "BQADBAADcwIAAl9XmQABLIQ06ZM5NnAC"
    ],
    [CardType.Nine]: [
      "BQADBAADCQIAAl9XmQAB26fZ2fW7vM0C",
      "BQADBAADdQIAAl9XmQABel-mC7eXGsMC"
    ],
    [CardType.DrawTwo]: [
      "BQADBAADCwIAAl9XmQAB64jIZrgXrQUC",
      "BQADBAADdwIAAl9XmQABOHEpxSztCf8C"
    ],
    [CardType.Skip]: [
      "BQADBAADDwIAAl9XmQAB17yhhnh46VQC",
      "BQADBAADewIAAl9XmQABDaQdMxjjPsoC"
    ],
    [CardType.Reverse]: [
      "BQADBAADDQIAAl9XmQAB_xcaab0DkegC",
      "BQADBAADeQIAAl9XmQABek1lGz7SJNAC"
    ]
  },
  [CardColor.Blue]: {
    [CardType.Zero]: [
      "BQADBAAD2QEAAl9XmQAB--inQsYcLTsC",
      "BQADBAADRQIAAl9XmQAB1IfkQ5xAiK4C"
    ],
    [CardType.One]: [
      "BQADBAAD2wEAAl9XmQABBzh4U-rFicEC",
      "BQADBAADRwIAAl9XmQABbWvhTeKBii4C"
    ],
    [CardType.Two]: [
      "BQADBAAD3QEAAl9XmQABo3l6TT0MzKwC",
      "BQADBAADSQIAAl9XmQABS1djHgyQokMC"
    ],
    [CardType.Three]: [
      "BQADBAAD3wEAAl9XmQAB2y-3TSapRtIC",
      "BQADBAADSwIAAl9XmQABwQ6VTbgY-MIC"
    ],
    [CardType.Four]: [
      "BQADBAAD4QEAAl9XmQABT6nhOuolqKYC",
      "BQADBAADTQIAAl9XmQABAlKUYha8YccC"
    ],
    [CardType.Five]: [
      "BQADBAAD4wEAAl9XmQABwRfmekGnpn0C",
      "BQADBAADTwIAAl9XmQABMvx8xVDnhUEC"
    ],
    [CardType.Six]: [
      "BQADBAAD5QEAAl9XmQABQITgUsEsqxsC",
      "BQADBAADUQIAAl9XmQABDEbhP1Zd31kC"
    ],
    [CardType.Seven]: [
      "BQADBAAD5wEAAl9XmQABVhPF6EcfWjEC",
      "BQADBAADUwIAAl9XmQABXb5XQBBaAnIC"
    ],
    [CardType.Eight]: [
      "BQADBAAD6QEAAl9XmQABP6baig0pIvYC",
      "BQADBAADVQIAAl9XmQABgL5HRDLvrjgC"
    ],
    [CardType.Nine]: [
      "BQADBAAD6wEAAl9XmQAB0CQdsQs_pXIC",
      "BQADBAADVwIAAl9XmQABtO3XDQWZLtYC"
    ],
    [CardType.DrawTwo]: [
      "BQADBAAD7QEAAl9XmQAB00Wii7R3gDUC",
      "BQADBAADWQIAAl9XmQAB2kk__6_2IhMC"
    ],
    [CardType.Skip]: [
      "BQADBAAD8QEAAl9XmQAB_RJHYKqlc-wC",
      "BQADBAADXQIAAl9XmQABEGJI6CaH3vcC"
    ],
    [CardType.Reverse]: [
      "BQADBAAD7wEAAl9XmQABo7D0B9NUPmYC",
      "BQADBAADWwIAAl9XmQAB_kZA6UdHXU8C"
    ]
  },
  [CardColor.Yellow]: {
    [CardType.Zero]: [
      "BQADBAADKwIAAl9XmQAB_nWoNKe8DOQC",
      "BQADBAADlwIAAl9XmQABAb3ZwTGS1lMC"
    ],
    [CardType.One]: [
      "BQADBAADLQIAAl9XmQABVprAGUDKgOQC",
      "BQADBAADmQIAAl9XmQAB9v5qJk9R0x8C"
    ],
    [CardType.Two]: [
      "BQADBAADLwIAAl9XmQABqyT4_YTm54EC",
      "BQADBAADmwIAAl9XmQABCsgpRHC2g-cC"
    ],
    [CardType.Three]: [
      "BQADBAADMQIAAl9XmQABGC-Xxg_N6fIC",
      "BQADBAADnQIAAl9XmQAB3kLLXCv-qY0C"
    ],
    [CardType.Four]: [
      "BQADBAADMwIAAl9XmQABbc-ZGL8kApAC",
      "BQADBAADnwIAAl9XmQAB7R_y-NexNLIC"
    ],
    [CardType.Five]: [
      "BQADBAADNQIAAl9XmQAB67QJZIF6XAcC",
      "BQADBAADoQIAAl9XmQABl-7mwsjD-cMC"
    ],
    [CardType.Six]: [
      "BQADBAADNwIAAl9XmQABJg_7XXoITsoC",
      "BQADBAADowIAAl9XmQABwbVsyv2MfPkC"
    ],
    [CardType.Seven]: [
      "BQADBAADOQIAAl9XmQABVrd7OcS2k34C",
      "BQADBAADpQIAAl9XmQABoBqC0JsemVwC"
    ],
    [CardType.Eight]: [
      "BQADBAADOwIAAl9XmQABRpJSahBWk3EC",
      "BQADBAADpwIAAl9XmQABpkwAAeh9ldlHAg"
    ],
    [CardType.Nine]: [
      "BQADBAADPQIAAl9XmQAB9MwJWKLJogYC",
      "BQADBAADqQIAAl9XmQABpSBEUfd4IM8C"
    ],
    [CardType.DrawTwo]: [
      "BQADBAADPwIAAl9XmQABaPYK8oYg84cC",
      "BQADBAADqwIAAl9XmQABMt-2zW0VYb4C"
    ],
    [CardType.Skip]: [
      "BQADBAADQwIAAl9XmQABO_AZKtxY6IMC",
      "BQADBAADrwIAAl9XmQABIDf-_TuuxtEC"
    ],
    [CardType.Reverse]: [
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