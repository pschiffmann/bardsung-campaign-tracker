import { HeroPath } from "./heroes.js";

export type AbilityName = "Guiding Strike" | "Steadfast" | "Fear of God";

export interface AbilityData {
  readonly path: HeroPath;
  readonly enhanceCost: number;
}

export const abilities: Record<AbilityName, AbilityData> = {
  "Guiding Strike": {
    path: "faith",
    enhanceCost: 2,
  },
  Steadfast: {
    path: "faith",
    enhanceCost: 2,
  },
  "Fear of God": {
    path: "faith",
    enhanceCost: 2,
  },
};
