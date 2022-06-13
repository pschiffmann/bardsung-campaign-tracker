import { createContext, Dispatch, useContext } from "react";
import { HistoryEntry } from "../../campaign-state/index.js";

export const DispatchContext = createContext<Dispatch<HistoryEntry> | null>(
  null
);

export function useDispatch() {
  return useContext(DispatchContext)!;
}
