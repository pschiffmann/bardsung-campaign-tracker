import * as $Promise from "@pschiffmann/std/promise";
import { History } from "./history.js";
import { reduce } from "./reduce.js";
import { CampaignState, initCampaignState } from "./state.js";

export * from "./history.js";
export * from "./persistence.js";
export { reduce } from "./reduce.js";
export { type CampaignState, type HeroState } from "./state.js";

export async function replayCampaignHistory(
  history: History,
  signal: AbortSignal
): Promise<CampaignState> {
  let result = initCampaignState();
  let batchStarted: number | undefined;
  for (const entry of history) {
    if (signal.aborted) break;

    batchStarted ??= Date.now();
    result = reduce(result, entry);

    if (Date.now() - batchStarted > 16) {
      batchStarted = undefined;
      await $Promise.wait(10);
    }
  }
  return result;
}
