type Num = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export type RoomCard = `R${Num}` | `R1${Num}`;
export type BattleCard = `B0${Num}${Num}` | `B1${Num}${Num}`;
export type ChallengeCard = `C0${Num}${Num}` | `C1${Num}${Num}`;
