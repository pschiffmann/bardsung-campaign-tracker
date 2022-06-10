import { get, keys, set } from "idb-keyval";
import { History } from "./history.js";

export function fetchCampaignNames(): Promise<string[]> {
  return keys();
}

export function fetchCampaignHistory(name: string): Promise<History> {
  return get(name);
}

export async function saveCampaignHistory(name: string, history: History) {
  await set(name, history);
}
