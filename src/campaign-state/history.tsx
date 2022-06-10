import * as t from "typed-validators";

const timestamp = t.alias("timestamp", t.string()).addConstraint((value) => {
  const parsed = Date.parse(value);
  if (isNaN(parsed)) return "must be an ISO date string";
});

const heroName = t.oneOf(
  t.string("Stoneheart"),
  t.string("Lightweaver"),
  t.string("Dawnguard"),
  t.string("Nightfeather"),
  t.string("Wyldshell")
);

const startCampaignEntry = t.object({
  type: t.string("start-campaign"),
  timestamp,
  heroes: t.array(heroName),
});
export type StartCampaignEntry = t.ExtractType<typeof startCampaignEntry>;

const startEncounter = t.object({
  type: t.string("start-encounter"),
  timestamp,
});

const historyEntry = t.oneOf(startCampaignEntry, startEncounter);
export type HistoryEntry = t.ExtractType<typeof historyEntry>;

const history = t.array(historyEntry);
export type History = t.ExtractType<typeof history>;
