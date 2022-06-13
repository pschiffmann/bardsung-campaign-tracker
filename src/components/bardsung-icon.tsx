import { memo } from "react";
import { bemClasses } from "../util/bem-classes.js";

const cls = bemClasses("bct-bardsung-icon");

export type BardsungIconName =
  // PNGs with gold border
  | "Gold-1"
  | "Gold-2"
  | "Gold-3"
  | "Gold-4"
  | "Gold-AOE"
  | "Gold-Active"
  | "Gold-ArmourCard"
  | "Gold-ArmourValue"
  | "Gold-AspectCard"
  | "Gold-AttackCard"
  | "Gold-Bane"
  | "Gold-Battle"
  | "Gold-Bleed"
  | "Gold-Boon"
  | "Gold-Boss"
  | "Gold-Bugbear"
  | "Gold-Burn"
  | "Gold-Cautious"
  | "Gold-Chain"
  | "Gold-Challenge"
  | "Gold-Charm"
  | "Gold-ConsumableCard"
  | "Gold-Corpse"
  | "Gold-Corridor"
  | "Gold-Curse"
  | "Gold-DamageDiceD10"
  | "Gold-DamageDiceD12"
  | "Gold-DamageDiceD4"
  | "Gold-DamageDiceD6"
  | "Gold-DamageDiceD8"
  | "Gold-Defeated"
  | "Gold-Delay"
  | "Gold-Devotion"
  | "Gold-Dodge"
  | "Gold-Duergar"
  | "Gold-Dungeon"
  | "Gold-Echo"
  | "Gold-Enemy"
  | "Gold-EnemyMagicalAdvantage"
  | "Gold-EnemyMagicalDisadvantage"
  | "Gold-EnemyPhysicalAdvantage"
  | "Gold-EnemyPhysicalDisadvantage"
  | "Gold-EnemyTN"
  | "Gold-ExhaustConsumable"
  | "Gold-FateCost"
  | "Gold-FateGenerate"
  | "Gold-Ferocious"
  | "Gold-Firewood"
  | "Gold-FlipCard"
  | "Gold-FlippedCard"
  | "Gold-Frostbite"
  | "Gold-Gas"
  | "Gold-GemSlot1"
  | "Gold-GemSlot2"
  | "Gold-GemSlot3"
  | "Gold-Ghost"
  | "Gold-Gold1"
  | "Gold-Gold3"
  | "Gold-GoldValue"
  | "Gold-Hasten"
  | "Gold-HealingPotion"
  | "Gold-Health"
  | "Gold-HiddenTunnel"
  | "Gold-HinderFatigue"
  | "Gold-Hobgoblin"
  | "Gold-Immediate"
  | "Gold-Infected"
  | "Gold-Level1"
  | "Gold-Level2"
  | "Gold-Level3"
  | "Gold-Lever"
  | "Gold-LightWound"
  | "Gold-Magical"
  | "Gold-Mechanica"
  | "Gold-Mirage"
  | "Gold-Narrative"
  | "Gold-OneUse"
  | "Gold-Party"
  | "Gold-Passive"
  | "Gold-PathOfBeasts"
  | "Gold-PathOfBlood"
  | "Gold-PathOfDamnation"
  | "Gold-PathOfElements"
  | "Gold-PathOfFaith"
  | "Gold-PathOfFlame"
  | "Gold-PathOfHonour"
  | "Gold-PathOfOmens"
  | "Gold-PathOfSerenity"
  | "Gold-PathOfShadow"
  | "Gold-PathOfSpirits"
  | "Gold-PathOfSteel"
  | "Gold-PathOfWilds"
  | "Gold-Physical"
  | "Gold-Pinned"
  | "Gold-Poison"
  | "Gold-Possessed"
  | "Gold-Powerful"
  | "Gold-Pulse"
  | "Gold-Push"
  | "Gold-Quicken"
  | "Gold-Range"
  | "Gold-Reposition"
  | "Gold-Room"
  | "Gold-Rune"
  | "Gold-SeriousWound"
  | "Gold-Shock"
  | "Gold-Silence"
  | "Gold-SkillCard"
  | "Gold-Slow"
  | "Gold-Speed"
  | "Gold-Spirit"
  | "Gold-Spore"
  | "Gold-Squire1Player"
  | "Gold-Stop"
  | "Gold-Stunned"
  | "Gold-Sundered"
  | "Gold-Sustained"
  | "Gold-Timer"
  | "Gold-Toolkit"
  | "Gold-TopperCard"
  | "Gold-ToughnessValue"
  | "Gold-Treasure"
  | "Gold-Undead"
  | "Gold-UnexhaustGoldCost"
  | "Gold-Victory"
  | "Gold-WanderingMonster"
  | "Gold-Water"
  | "Gold-Weaken"
  | "Gold-WeaponCard"
  | "Hero-Generic-CHA"
  | "Hero-Generic-CON"
  | "Hero-Generic-DEX"
  | "Hero-Generic-INT"
  | "Hero-Generic-STR"
  | "Hero-Generic-WIS"
  // PNG with black border
  | "blank"
  // SVG hero class icons
  | "beasts"
  | "blood"
  | "damnation"
  | "elements"
  | "faith"
  | "flame"
  | "honour"
  | "omens"
  | "serenity"
  | "shadow"
  | "spirits"
  | "steel"
  | "wilds";

export interface BardsungIconProps {
  readonly name: BardsungIconName;
  readonly text?: string;
  readonly className?: string;
  onClick?(): void;
}

const BardsungIconMemo = memo<BardsungIconProps>(function BardsungIcon({
  name,
  text,
  className,
  onClick,
}) {
  const url =
    name === "blank"
      ? "https://cardcreator.steamforged.com/icons/bardsungEnemy/BS-Icons-Black-Blank.png"
      : name.startsWith("Gold-") || name.startsWith("Hero-")
      ? `https://cardcreator.steamforged.com/icons/bardsungHero/BS-Icons-${name}.png`
      : `https://cardcreator.steamforged.com/icons/bardsungHero/${name}_selected.svg`;
  return (
    <i
      className={cls.block(className, text && text.length > 2 && "long-text")}
      style={{ backgroundImage: `url("${url}")` }}
      onClick={onClick}
    >
      {text}
    </i>
  );
});

export { BardsungIconMemo as BardsungIcon };
