export enum CardDefaultType {
  Zero = "zero",
  One = "one",
  Two = "two",
  Three = "three",
  Four = "four",
  Five = "five",
  Six = "six",
  Seven = "seven",
  Eight = "eight",
  Nine = "nine",
  DrawTwo = "drawTwo",
  Reverse = "reverse",
  Skip = "skip"
}

export enum CardSpecialType {
  DrawFour = "drawFour",
  Color = "color"
}

export enum CardOptionType {
  Draw = "draw",
  Pass = "pass"
}

export type CardType = CardDefaultType | CardSpecialType | CardOptionType