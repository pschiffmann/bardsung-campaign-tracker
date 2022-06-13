import { FC } from "react";
import { useParams } from "react-router-dom";
import { BardsungIcon } from "../../components/bardsung-icon.js";
import { Header } from "../../components/header.js";
import { LoadingMessage } from "../../components/loading-message.js";
import { HeroName } from "../../content/heroes.js";
import { bemClasses } from "../../util/bem-classes.js";
import { HeroProfile } from "./hero-profile.js";
import { useCampaignState } from "./use-campaign-state.js";
import { DispatchContext } from "./use-dispatch.js";

const cls = bemClasses("bct-campaign");

export const Campaign: FC = () => {
  const { name } = useParams();
  const [state, dispatch] = useCampaignState(name!);

  return (
    <div className={cls.block()}>
      {!state ? (
        <LoadingMessage>Loading</LoadingMessage>
      ) : (
        <DispatchContext.Provider value={dispatch}>
          <Header title={`${name} – Bardsung Campaign Tracker`} />
          <h2>Encounter</h2>
          <h2>Tokens</h2>
          <div className={cls.element("consumable-token-bar")}>
            <div className={cls.element("consumable-token-group")}>
              <BardsungIcon
                className={cls.element("consumable-token")}
                name="Gold-Charm"
              />
              <BardsungIcon
                className={cls.element("consumable-token")}
                name="Gold-Charm"
              />
              <BardsungIcon
                className={cls.element("consumable-token")}
                name="Gold-Charm"
              />
            </div>
            <div className={cls.element("consumable-token-group")}>
              <BardsungIcon
                className={cls.element("consumable-token")}
                name="Gold-HealingPotion"
              />
              <BardsungIcon
                className={cls.element("consumable-token")}
                name="Gold-HealingPotion"
              />
              <BardsungIcon
                className={cls.element("consumable-token")}
                name="Gold-HealingPotion"
              />
            </div>
            <div className={cls.element("consumable-token-group")}>
              <BardsungIcon
                className={cls.element("consumable-token")}
                name="Gold-Toolkit"
              />
              <BardsungIcon
                className={cls.element("consumable-token")}
                name="Gold-Toolkit"
              />
              <BardsungIcon
                className={cls.element("consumable-token", null, "exhausted")}
                name="Gold-Toolkit"
              />
            </div>
            <div className={cls.element("consumable-token-group")}>
              <BardsungIcon
                className={cls.element("consumable-token")}
                name="Gold-Firewood"
              />
              <BardsungIcon
                className={cls.element("consumable-token")}
                name="Gold-Firewood"
              />
              <BardsungIcon
                className={cls.element("consumable-token")}
                name="Gold-Firewood"
              />
            </div>
          </div>
          <h2>Decks</h2>
          <h2>Possessions</h2>
          <div>
            <BardsungIcon name="Gold-GoldValue" text={`${state.gold}`} />
          </div>
          <h2>Heroes</h2>
          {Object.entries(state.heroes).map(([name, heroState]) => (
            <HeroProfile
              key={name}
              heroName={name as HeroName}
              heroState={heroState}
              unassignedAbilities={state.unassignedAbilities}
              totalXp={state.totalXp}
            />
          ))}
        </DispatchContext.Provider>
      )}
    </div>
  );
};
