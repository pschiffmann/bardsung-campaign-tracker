import { FC } from "react";
import { useParams } from "react-router-dom";
import { BardsungIcon } from "../../components/bardsung-icon.js";
import { Header } from "../../components/header.js";
import { LoadingMessage } from "../../components/loading-message.js";
import { HeroName } from "../../content/heroes.js";
import * as content from "../../content/index.js";
import { bemClasses } from "../../util/bem-classes.js";
import { ChapterProgress } from "./chapter-progress.js";
import { ExplorationCardDeck } from "./exploration-card-deck.js";
import { HeroProfile } from "./hero-profile.js";
import { SelectChapter } from "./select-chapter.js";
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
          <h2>Current Encounter</h2>
          {!state.currentChapter ? (
            <SelectChapter chapterProgress={state.chapterProgress} />
          ) : (
            "asdf"
          )}

          {Object.getOwnPropertyNames(state.chapterProgress).length !== 0 && (
            <>
              <h2>Completed Encounters</h2>
              <div className={cls.element("wrap-list")}>
                {Object.entries(state.chapterProgress).map(
                  ([chapter, progress]) => (
                    <ChapterProgress chapter={chapter} progress={progress} />
                  )
                )}
              </div>
            </>
          )}

          <h2>Tokens</h2>
          <p className={cls.element("help-text")}>
            Click on a token to exhaust it. Click on an exhausted token while
            not in an encounter to buy it back for 7 gold.
          </p>
          <Tokens tokens={state.tokens} />

          <h2>Reputation: {state.reputation}</h2>
          <p className={cls.element("help-text")}>
            Use custom actions to change reputation.
          </p>

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
            <div>
              <p>Lost treasure: {state.lostTreasure}</p>
              <button>Draw</button>
              <button>Purchase</button>
            </div>
          </div>

          <h2>Stash</h2>
          <p className={cls.element("help-text")}>Lorem ipsum.</p>
          <BardsungIcon name="Gold-GoldValue" text={`${state.gold}`} />

          <h2>Custom action</h2>
          <p className={cls.element("help-text")}>Lorem ipsum.</p>
          <details>
            <summary>Expand</summary>
            <select multiple>
              {content.battleCards.map((card) => (
                <option key={card} value={card}>
                  {card}
                </option>
              ))}
            </select>
          </details>

          <h2>Heroes</h2>
          <p className={cls.element("help-text")}>Lorem ipsum.</p>
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
