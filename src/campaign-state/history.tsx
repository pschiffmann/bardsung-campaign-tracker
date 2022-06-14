import * as t from "typed-validators";
import { AbilityName } from "../content/abilities.js";
import * as content from "../content/index.js";
import {
  BattleCard,
  ChallengeCard,
  Characteristic,
  CorridorCard,
  HeroName,
  RoomCard,
} from "../content/index.js";

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
const ability = t
  .alias<AbilityName>("ability-name", t.string() as t.Type<AbilityName>)
  .addConstraint((value) => {
    if (!content.abilities.hasOwnProperty(value)) return "not an ability name";
  });
const token = t.oneOf(
  t.string("charm"),
  t.string("healing-potion"),
  t.string("toolkit"),
  t.string("firewood")
);
const battleCardName = t
  .alias("battle-card-name", t.string() as t.Type<BattleCard>)
  .addConstraint((value) => {
    if (!content.battleCards.includes(value)) {
      return "not an aspect battle card";
    }
  });
const roomCardName = t
  .alias("room-card-name", t.string() as t.Type<RoomCard>)
  .addConstraint((value) => {
    if (!content.roomCards.includes(value)) {
      return "not a room card";
    }
  });
const corridorCardName = t
  .alias("corridor-card-name", t.string() as t.Type<CorridorCard>)
  .addConstraint((value) => {
    if (!content.corrdiorCards.includes(value)) {
      return "not a corridor card";
    }
  });
const challengeCardName = t
  .alias("challenge-card-name", t.string() as t.Type<ChallengeCard>)
  .addConstraint((value) => {
    if (!content.challengeCards.includes(value)) {
      return "not an aspect challenge card";
    }
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

const exhaustToken = t.object({
  type: t.string("exhaust-token"),
  timestamp,
  token,
});

const buyToken = t.object({
  type: t.string("buy-token"),
  timestamp,
  token,
});

const drawExplorationCard = t.object({
  type: t.string("draw-exploration-card"),
  timestamp,
  card: t.oneOf(
    roomCardName,
    corridorCardName,
    battleCardName,
    challengeCardName
  ),
});

const shuffleExplorationDeck = t.object({
  type: t.string("shuffle-exploration-deck"),
  timestamp,
  deck: t.oneOf(
    t.string("room"),
    t.string("corridor"),
    t.string("battle"),
    t.string("challenge")
  ),
});

const enhanceAbilityEntry = t.object({
  type: t.string("enhance-ability"),
  timestamp,
  hero: heroName,
  ability: ability,
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
  exhaustToken,
  buyToken,
  drawExplorationCard,
  shuffleExplorationDeck,
  enhanceAbilityEntry,
  levelUpCharacteristic
);
export type HistoryEntry = t.ExtractType<typeof historyEntry>;

export const historyValidator = t.array(historyEntry);
export type History = t.ExtractType<typeof historyValidator>;
