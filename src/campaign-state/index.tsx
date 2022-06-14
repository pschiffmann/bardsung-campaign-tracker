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
  for (let i = 0; i < history.length; i++) {
    if (signal.aborted) break;
    batchStarted ??= Date.now();

    try {
      result = reduce(result, history[i]);
    } catch (e) {
      throw new Error(
        `Error while replaying history entry ${i}, ` +
          `${JSON.stringify(history[i])}: ` +
          (e instanceof Error ? e.message : `${e}`)
      );
    }

    if (Date.now() - batchStarted > 16) {
      batchStarted = undefined;
      await $Promise.wait(10);
    }
  }
  return result;
}
