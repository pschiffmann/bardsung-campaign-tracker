import { DeepWritable } from "ts-essentials";
import * as content from "../content/index.js";
import { HistoryEntry } from "./history.js";
import { CampaignState } from "./state.js";

export function reduce(
  prev: CampaignState,
  action: HistoryEntry
): CampaignState {
  try {
    return reducers[action.type](prev, action as any);
  } catch (e) {
    alert(e instanceof Error ? e.message : `${e}`);
    throw e;
  }
}

type EntryOfType<E, T> = E extends { readonly type: T } ? E : never;

type Reducers = {
  [K in HistoryEntry["type"]]: (
    prev: CampaignState,
    action: EntryOfType<HistoryEntry, K>
  ) => CampaignState;
};

const reducers: Reducers = {
  "start-campaign"(prev, action) {
    const heroes: DeepWritable<CampaignState["heroes"]> = {};
    const unassignedAbilities = new Set(prev.unassignedAbilities);
    for (const name of action.heroes) {
      const heroData = content.heroes[name];
      heroes[name] = {
        characteristics: {
          str: 0,
          dex: 0,
          int: 0,
          wis: 0,
          con: 0,
          cha: 0,
          ...heroData.startCharacteristics,
        },
        abilities: {},
        items: {},
        spentXp: 0,
      };
      for (const ability of heroData.startAbilities) {
        heroes[name]!.abilities[ability] = 1;
        unassignedAbilities.delete(ability);
      }
      for (const item of heroData.startItems) {
        heroes[name]!.items[item] = 1;
      }
    }
    return { ...prev, heroes, unassignedAbilities: [...unassignedAbilities] };
  },
  "start-encounter"(prev, action) {
    return prev;
  },
  "enhance-ability"(prev, action) {
    const hero = prev.heroes[action.hero]!;
    const abilityData = content.abilities[action.ability];
    if (hero.abilities[action.ability] !== 1) {
      throw new Error("Can't enhance this ability.");
    }
    if (prev.totalXp - hero.spentXp < abilityData.enhanceCost) {
      throw new Error("Not enough XP.");
    }
    return {
      ...prev,
      heroes: {
        ...prev.heroes,
        [action.hero]: {
          ...hero,
          abilities: { ...hero.abilities, [action.ability]: 2 },
          spentXp: hero.spentXp + abilityData.enhanceCost,
        },
      },
    };
  },
  "level-up-characteristic"(prev, action) {
    const hero = prev.heroes[action.hero]!;
    const newLevel = hero.characteristics[action.characteristic] + 1;
    if (prev.totalXp - hero.spentXp < newLevel) {
      throw new Error("Not enough XP.");
    }
    return {
      ...prev,
      heroes: {
        ...prev.heroes,
        [action.hero]: {
          ...hero,
          characteristics: {
            ...hero.characteristics,
            [action.characteristic]: newLevel,
          },
          spentXp: hero.spentXp + newLevel,
        },
      },
    };
  },
};
