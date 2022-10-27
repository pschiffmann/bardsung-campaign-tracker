type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type Positive = Exclude<Digit, "0">;

export type RoomCard =
  | `R0${Positive}`
  | `R1${Digit}`
  | `R2${Digit}`
  | `R3${Digit}`;
export type CorridorCard = `P${Positive}` | `P1${Exclude<Digit, "8" | "9">}`;
export type BattleCard =
  | Exclude<`B0${Digit}${Digit}`, "B000">
  | Exclude<`B1${"0" | "1" | "2" | "3"}${Digit}`, "B139">;
export type ChallengeCard =
  | Exclude<`C${"0" | "1"}${Digit}${Digit}`, "C000">
  | `C20${Digit}`
  | `C21${"0" | "1" | "2" | "3" | "4"}`;

export const roomCards: readonly RoomCard[] = new Array(39)
  .fill(null)
  .map((_, i) => `R${(i + 1).toString().padStart(2, "0")}` as RoomCard);
export const corrdiorCards: readonly CorridorCard[] = new Array(17)
  .fill(null)
  .map((_, i) => `P${(i + 1).toString().padStart(2, "0")}` as CorridorCard);
export const battleCards: readonly BattleCard[] = new Array(138)
  .fill(null)
  .map((_, i) => `C${(i + 1).toString().padStart(3, "0")}` as BattleCard);
export const challengeCards: readonly ChallengeCard[] = new Array(214)
  .fill(null)
  .map((_, i) => `C${(i + 1).toString().padStart(3, "0")}` as ChallengeCard);
