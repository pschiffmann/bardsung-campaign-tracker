import * as t from "typed-validators";
import { AbilityName } from "../content/abilities.js";
import * as content from "../content/index.js";
import { Characteristic, HeroName } from "../content/index.js";

const timestamp = t.alias("timestamp", t.string()).addConstraint((value) => {
  const parsed = Date.parse(value);
  if (isNaN(parsed)) return "must be an ISO date string";
});

const heroName = t
  .alias<HeroName>("hero-name", t.string() as t.Type<HeroName>)
  .addConstraint((value) => {
    if (!content.heroes.hasOwnProperty(value)) return "not a hero name";
  });
const characteristic = t
  .alias<Characteristic>("characteristic", t.string() as t.Type<Characteristic>)
  .addConstraint((value) => {
    if (!content.characteristics.includes(value)) return "not a characteristic";
  });
const abilityName = t
  .alias<AbilityName>("ability-name", t.string() as t.Type<AbilityName>)
  .addConstraint((value) => {
    if (!content.abilities.hasOwnProperty(value)) return "not an ability name";
  });

const startCampaignEntry = t.object({
  type: t.string("start-campaign"),
  timestamp,
  heroes: t.array(heroName),
});

const startEncounterEntry = t.object({
  type: t.string("start-encounter"),
  timestamp,
});

const enhanceAbilityEntry = t.object({
  type: t.string("enhance-ability"),
  timestamp,
  hero: heroName,
  ability: abilityName,
});

const levelUpCharacteristic = t.object({
  type: t.string("level-up-characteristic"),
  timestamp,
  hero: heroName,
  characteristic,
});

const historyEntry = t.oneOf(
  startCampaignEntry,
  startEncounterEntry,
  enhanceAbilityEntry,
  levelUpCharacteristic
);
export type HistoryEntry = t.ExtractType<typeof historyEntry>;

const history = t.array(historyEntry);
export type History = t.ExtractType<typeof history>;
