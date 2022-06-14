import { FC } from "react";
import { useParams } from "react-router-dom";
import { BardsungIcon } from "../../components/bardsung-icon.js";
import { Header } from "../../components/header.js";
import { LoadingMessage } from "../../components/loading-message.js";
import { HeroName } from "../../content/heroes.js";
import { bemClasses } from "../../util/bem-classes.js";
import { ExplorationCardDeck } from "./exploration-card-deck.js";
import { HeroProfile } from "./hero-profile.js";
import { Tokens } from "./tokens.js";
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
          <p className={cls.element("help-text")}>
            Click on a token to exhaust it. Click on an exhausted token while
            not in an encounter to buy it back for 7 gold.
          </p>
          <Tokens tokens={state.tokens} />
          <h2>Decks</h2>
          <p className={cls.element("help-text")}>
            Each discard pile shows the last drawn card. Click on a draw pile to
            draw a random card. Click on a discard pile to shuffle it back into
            the draw pile. Click on a deck name to see the all cards currently
            in the deck. In the deck list, click on card to draw it.
          </p>
          <div className={cls.element("wrap-list")}>
            <ExplorationCardDeck type="room" deck={state.roomDeck} />
            <ExplorationCardDeck type="corridor" deck={state.corridorDeck} />
            <ExplorationCardDeck type="battle" deck={state.battleDeck} />
            <ExplorationCardDeck type="challenge" deck={state.challengeDeck} />
          </div>
          <h2>Stash</h2>
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
