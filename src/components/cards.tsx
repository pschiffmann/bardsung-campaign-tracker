import { memo } from "react";
import { abilities, AbilityName } from "../content/abilities.js";
import { heroes, HeroName } from "../content/index.js";
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
  readonly number: number;
  readonly type: "room" | "corridor" | "battle" | "challenge";
  readonly className?: string;
}

const ExplorationCardMemo = memo<ExplorationCardProps>(
  function ExplorationCard({ number, type, className }) {
    return (
      <div className={cls.exploration.block(className)}>
        <div className={cls.exploration.element("name")}>
          {type[0].toUpperCase() + number}
        </div>
        <BardsungIcon
          className={cls.exploration.element("level")}
          name={`Gold-${type[0].toUpperCase()}${type.substring(1)}` as any}
        />
      </div>
    );
  }
);

export {
  HeroProfileCardMemo as HeroProfileCard,
  AbilityCardMemo as AbilityCard,
  ItemCardMemo as ItemCard,
  ExplorationCardMemo as ExplorationCard,
};
