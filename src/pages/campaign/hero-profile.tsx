import { FC, useState } from "react";
import { HeroState } from "../../campaign-state/index.js";
import { BardsungIcon } from "../../components/bardsung-icon.js";
import {
  AbilityCard,
  HeroProfileCard,
  ItemCard,
} from "../../components/cards.js";
import { Dialog } from "../../components/dialog.js";
import { abilities, AbilityName } from "../../content/abilities.js";
import {
  Characteristic,
  characteristics,
  HeroName,
} from "../../content/heroes.js";
import { ItemName } from "../../content/items.js";
import { bemClasses } from "../../util/bem-classes.js";
import { useDispatch } from "./use-dispatch.js";

const cls = bemClasses("bct-campaign-hero-profile");

export interface HeroProfileProps {
  readonly heroName: HeroName;
  readonly heroState: HeroState;
  readonly unassignedAbilities: readonly AbilityName[];
  readonly totalXp: number;
}

export const HeroProfile: FC<HeroProfileProps> = ({
  heroName,
  heroState,
  unassignedAbilities,
  totalXp,
}) => {
  const dispatch = useDispatch();

  function enhanceAbility(name: AbilityName) {
    const { enhanceCost } = abilities[name];
    if (
      confirm(`Enhance ${heroName}'s ability ${name} for ${enhanceCost} XP?`)
    ) {
      dispatch({
        type: "enhance-ability",
        timestamp: new Date().toISOString(),
        hero: heroName,
        ability: name,
      });
    }
  }

  function levelUpCharacteristic(characteristic: Characteristic) {
    const newLevel = heroState.characteristics[characteristic] + 1;
    if (
      confirm(
        `Level up ${heroName}'s ${characteristic.toUpperCase()} for ${newLevel} XP?`
      )
    ) {
      dispatch({
        type: "level-up-characteristic",
        timestamp: new Date().toISOString(),
        hero: heroName,
        characteristic,
      });
    }
  }

  const [dialogContent, setDialogContent] = useState<"abilities" | "items">();

  return (
    <div className={cls.block()}>
      <HeroProfileCard
        className={cls.element("profile-card")}
        name={heroName as HeroName}
      />

      <div className={cls.element("characteristics")}>
        {characteristics.map((characteristic) => (
          <BardsungIcon
            key={characteristic}
            className={cls.element("characteristic", null, characteristic)}
            name={`Hero-Generic-${characteristic.toUpperCase()}` as any}
            text={`+${heroState.characteristics[characteristic]}`}
            onClick={() => levelUpCharacteristic(characteristic)}
          />
        ))}
      </div>

      <div className={cls.element("inventory")}>
        <div className={cls.element("abilities")}>
          {Object.entries(heroState.abilities).map(([name, level]) => (
            <AbilityCard
              key={name}
              className={cls.element("ability")}
              name={name as AbilityName}
              level={level}
              onEnhancePress={() => enhanceAbility(name as AbilityName)}
            />
          ))}
          <button
            className={cls.element("add-card")}
            onClick={() => setDialogContent("abilities")}
          >
            +
          </button>
        </div>
        <div className={cls.element("items")}>
          {heroState.items.map((name) => (
            <ItemCard
              key={name}
              className={cls.element("item")}
              name={name as ItemName}
              level={1}
            />
          ))}
        </div>
        <BardsungIcon
          className={cls.element("xp")}
          name="blank"
          text={`${totalXp - heroState.spentXp} XP`}
        />
      </div>

      {dialogContent === "abilities" && (
        <Dialog
          title="Learn ability"
          onClose={() => setDialogContent(undefined)}
        >
          {unassignedAbilities.map((name) => (
            <AbilityCard key={name} name={name} level={1} />
          ))}
        </Dialog>
      )}
    </div>
  );
};
