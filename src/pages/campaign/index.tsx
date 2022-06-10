import * as $Promise from "@pschiffmann/std/promise";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { History } from "../../campaign-state/index.js";
import { fetchCampaignHistory } from "../../campaign-state/persistence.js";
import { BardsungIcon } from "../../components/bardsung-icon.js";
import { Header } from "../../components/header.js";
import { LoadingMessage } from "../../components/loading-message.js";
import { bemClasses } from "../../util/bem-classes.js";
import { HeroProfile } from "./hero-profile.js";

const cls = bemClasses("bct-campaign");

export const Campaign: FC = () => {
  const { name } = useParams();
  const [history, setHistory] = useState<History>();
  useEffect(() => {
    let cancelled = false;
    (async () => {
      await $Promise.wait(50);
      if (cancelled) return;
      const history = await fetchCampaignHistory(name!);
      if (cancelled) return;
      setHistory(history);
    })();

    return () => {
      cancelled = true;
      setHistory(undefined);
    };
  }, [name]);

  return (
    <div className={cls.block()}>
      {!history ? (
        <LoadingMessage>Loading</LoadingMessage>
      ) : (
        <>
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
            <BardsungIcon name="Gold-GoldValue" text="13" />
          </div>
          <h2>Heroes</h2>
          <HeroProfile name="Lightweaver" />
        </>
      )}
    </div>
  );
};
