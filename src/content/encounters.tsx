import { CampaignState } from "../campaign-state/state.js";

export type EncounterName = "1A" | "1B" | "1C" | "2A" | "2B";

export interface Encounter {
  /**
   * Called in between encounters on the last completed encounter. Returns the
   * encounters that can be started now.
   */
  getNextEncounters(state: CampaignState): Iterable<string>;
}

export const encounters: Readonly<Record<EncounterName, Encounter>> = {
  "1A": {
    getNextEncounters() {
      return ["1B"];
    },
  },
  "1B": {
    getNextEncounters() {
      return ["1C", "1D"];
    },
  },
  "1C": {
    getNextEncounters() {
      return ["1D", "1E"];
    },
  },
  "2A": {
    getNextEncounters() {
      return ["2B", "2C"];
    },
  },
  "2B": {
    getNextEncounters() {
      return ["2D"];
    },
  },
};

export const start = ["1A", "2A"];
