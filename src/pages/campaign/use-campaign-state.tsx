import * as $Promise from "@pschiffmann/std/promise";
import { Dispatch, useEffect, useState } from "react";
import {
  CampaignState,
  fetchCampaignHistory,
  History,
  HistoryEntry,
  reduce,
  replayCampaignHistory,
  saveCampaignHistory,
} from "../../campaign-state/index.js";

export function useCampaignState(
  name: string
): [state: CampaignState | undefined, dispatch: Dispatch<HistoryEntry>] {
  const [state, setState] = useState<{
    readonly name: string;
    readonly campaignState: CampaignState;
    readonly history: History;
  }>();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        await $Promise.wait(50);
        if (signal.aborted) return;
        const history = await fetchCampaignHistory(name);
        if (signal.aborted) return;
        const campaignState = await replayCampaignHistory(history, signal);
        if (signal.aborted) return;
        setState({ name, campaignState, history });
      } catch (e) {
        alert(
          "Can't read campaign history: " +
            (e instanceof Error ? e.message : `${e}`)
        );
      }
    })();

    return () => {
      controller.abort();
      setState(undefined);
    };
  }, [name]);

  function dispatch(entry: HistoryEntry) {
    if (!state) return;
    try {
      const campaignState = reduce(state.campaignState, entry);
      const history = [...state.history, entry];
      saveCampaignHistory(name, history);
      setState({ name, campaignState, history });
    } catch (e) {
      alert(e instanceof Error ? e.message : `${e}`);
    }
  }

  return [state?.name === name ? state.campaignState : undefined, dispatch];
}
