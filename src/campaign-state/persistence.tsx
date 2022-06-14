import { get, keys, set } from "idb-keyval";
import { History, historyValidator } from "./history.js";

export function fetchCampaignNames(): Promise<string[]> {
  return keys();
}

export async function fetchCampaignHistory(name: string): Promise<History> {
  return historyValidator.assert(await get(name));
}

export async function saveCampaignHistory(name: string, history: History) {
  await set(name, history);
}
