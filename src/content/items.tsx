export interface ItemData {}

export type ItemName = "Sapphire" | "Diamond";

export const items: Readonly<Record<ItemName, ItemData>> = {
  Sapphire: {},
  Diamond: {},
};
