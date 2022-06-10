import { FC } from "react";
import { BardsungIcon } from "../../components/bardsung-icon.js";
import {
  AbilityCard,
  HeroProfileCard,
  ItemCard,
} from "../../components/cards.js";
import { bemClasses } from "../../util/bem-classes.js";

const cls = bemClasses("bct-campaign-hero-profile");

export interface HeroProfileProps {
  readonly name: string;
}

export const HeroProfile: FC<HeroProfileProps> = ({ name }) => {
  return (
    <div className={cls.block()}>
      <HeroProfileCard
        className={cls.element("profile-card")}
        name={name as any}
      />

      <div className={cls.element("characteristics")}>
        {characteristicsNames.map((characteristic) => (
          <BardsungIcon
            className={cls.element("characteristic", null, characteristic)}
            name={`Hero-Generic-${characteristic.toUpperCase()}` as any}
            text="+0"
          />
        ))}
      </div>

      <div className={cls.element("inventory")}>
        <div className={cls.element("abilities")}>
          <AbilityCard
            className={cls.element("ability")}
            name="Guiding Strike"
          />
          <AbilityCard className={cls.element("ability")} name="Steadfast" />
          <AbilityCard className={cls.element("ability")} name="Fear of God" />
        </div>
        <div className={cls.element("items")}>
          <ItemCard
            className={cls.element("item")}
            name="Blessed Mace"
            level={1}
          />
          <ItemCard
            className={cls.element("item")}
            name="Sunshield"
            level={2}
          />
        </div>
        <BardsungIcon className={cls.element("xp")} name="blank" text="2 XP" />
      </div>
    </div>
  );
};

const characteristicsNames = [
  "str",
  "dex",
  "int",
  "wis",
  "con",
  "cha",
] as const;
