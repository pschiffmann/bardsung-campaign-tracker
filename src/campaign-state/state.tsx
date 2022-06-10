export interface CampaignState {
  readonly heroes: {};

  readonly completedEncounters: Set<string>;
  readonly currentEncounter: string | null;
}
