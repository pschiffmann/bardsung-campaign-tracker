import { memo } from "react";
import { abilities, AbilityName } from "../content/abilities.js";
import {
  BattleCard,
  ChallengeCard,
  CorridorCard,
  heroes,
  HeroName,
  RoomCard,
} from "../content/index.js";
import { ItemName } from "../content/items.js";
import { bemClasses } from "../util/bem-classes.js";
import { BardsungIcon } from "./bardsung-icon.js";

const cls = {
  heroProfile: bemClasses("bct-hero-profile-card"),
  ability: bemClasses("bct-ability-card"),
  item: bemClasses("bct-item-card"),
  exploration: bemClasses("bct-exploration-card"),
};

interface CardProps {
  readonly className?: string;
  onPress?(): void;
}

export interface HeroProfileCardProps extends CardProps {
  readonly name: HeroName;
}

const HeroProfileCardMemo = memo<HeroProfileCardProps>(
  function HeroProfileCard({ name, className, onPress }) {
    const hero = heroes[name];
    const image = heroImages[name];
    return (
      <div className={cls.heroProfile.block(className)} onClick={onPress}>
        <BardsungIcon
          className={cls.heroProfile.element("path")}
          name={hero.path}
        />
        <div className={cls.heroProfile.element("name")}>{name}</div>
        {image ? (
          <img className={cls.heroProfile.element("image")} src={image} />
        ) : (
          <div className={cls.heroProfile.element("image", null, "missing")}>
            ¯\_(ツ)_/¯
          </div>
        )}
      </div>
    );
  }
);

const heroImages: Record<string, string> = {
  Dawnguard:
    "https://cdn.shopify.com/s/files/1/0602/0156/6449/files/BS-Hero-Dawnguard_600x.png",
  Lightweaver:
    "https://cdn.shopify.com/s/files/1/0602/0156/6449/files/Lightweaver-min-min_600x.png",
  Nightfeather:
    "https://cdn.shopify.com/s/files/1/0602/0156/6449/files/Nightfeather-Mini_600x.png",
  Stoneheart:
    "https://cdn.shopify.com/s/files/1/0602/0156/6449/files/Stoneheart-Mini_600x.png",
  Wyldshell:
    "https://cdn.shopify.com/s/files/1/0602/0156/6449/files/Wyldshell-Mini_600x.png",
};

export interface AbilityCardProps {
  readonly name: AbilityName;
  readonly level: 1 | 2;
  readonly className?: string;
  onEnhancePress?(): void;
}

const AbilityCardMemo = memo<AbilityCardProps>(function AbilityCard({
  name,
  level,
  className,
  onEnhancePress,
}) {
  const ability = abilities[name];
  return (
    <div className={cls.ability.block(className)}>
      <BardsungIcon
        className={cls.ability.element("path")}
        name={ability.path}
      />
      <div className={cls.ability.element("name")}>{name}</div>
      <BardsungIcon
        className={cls.ability.element("level")}
        name={`Gold-Level${level}`}
        text={level === 1 ? `${ability.enhanceCost} XP` : undefined}
        onClick={level === 1 ? onEnhancePress : undefined}
      />
    </div>
  );
});

export interface ItemCardProps {
  readonly name: ItemName;
  readonly level: 1 | 2 | 3;
  readonly className?: string;
}

const ItemCardMemo = memo<ItemCardProps>(function ItemCard({
  name,
  level,
  className,
}) {
  return (
    <div className={cls.item.block(className)}>
      <div className={cls.item.element("name")}>{name}</div>
      <BardsungIcon
        className={cls.item.element("level")}
        name={`Gold-Level${level}`}
      />
    </div>
  );
});

export interface ExplorationCardProps {
  readonly name:
    | RoomCard
    | CorridorCard
    | BattleCard
    | ChallengeCard
    | `${"R" | "P"}??`
    | `${"B" | "C"}???`;
  readonly className?: string;
  onPress?(): void;
}

const ExplorationCardMemo = memo<ExplorationCardProps>(
  function ExplorationCard({ name, className, onPress }) {
    return (
      <div className={cls.exploration.block(className)} onClick={onPress}>
        <BardsungIcon
          className={cls.exploration.element("icon")}
          name={explorationCardIcons[name[0] as "R" | "P" | "B" | "C"]}
          text={name}
        />
      </div>
    );
  }
);

const explorationCardIcons = {
  R: "Gold-Room",
  P: "Gold-Corridor",
  B: "Gold-Battle",
  C: "Gold-Challenge",
} as const;

export {
  HeroProfileCardMemo as HeroProfileCard,
  AbilityCardMemo as AbilityCard,
  ItemCardMemo as ItemCard,
  ExplorationCardMemo as ExplorationCard,
};
