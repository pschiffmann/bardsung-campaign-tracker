import * as $Array from "@pschiffmann/std/array";
import * as $Math from "@pschiffmann/std/math";
import * as $String from "@pschiffmann/std/string";
import { memo, useState } from "react";
import { ExplorationCardDeck } from "../../campaign-state/state.js";
import { ExplorationCard } from "../../components/cards.js";
import { Dialog } from "../../components/dialog.js";
import {
  BattleCard,
  ChallengeCard,
  CorridorCard,
  RoomCard,
} from "../../content/index.js";
import { bemClasses } from "../../util/bem-classes.js";
import { useDispatch } from "./use-dispatch.js";

const cls = bemClasses("bct-campaign-exploration-card-deck");

export interface ExplorationCardDeckProps {
  readonly type: "room" | "corridor" | "battle" | "challenge";
  readonly deck: ExplorationCardDeck<
    RoomCard | CorridorCard | BattleCard | ChallengeCard
  >;
}

const ExplorationCardDeckMemo = memo<ExplorationCardDeckProps>(
  function ExplorationCardDeck({ type, deck }) {
    const [dialogOpen, setDialogOpen] = useState(false);

    const dispatch = useDispatch();
    function drawRandomCard() {
      if (confirm(`Draw a random card from the ${type} deck?`)) {
        dispatch({
          type: "draw-exploration-card",
          timestamp: new Date().toISOString(),
          card: deck.drawPile[$Math.getRandomInt(0, deck.drawPile.length)],
        });
      }
    }

    function drawCard(card: string) {
      if (confirm(`Draw card ${card} from the ${type} deck?`)) {
        dispatch({
          type: "draw-exploration-card",
          timestamp: new Date().toISOString(),
          card: card as any,
        });
        setDialogOpen(false);
      }
    }

    function shuffle() {
      if (
        confirm(
          `Shuffle the ${type} deck discard pile back into the draw deck?`
        )
      ) {
        dispatch({
          type: "shuffle-exploration-deck",
          timestamp: new Date().toISOString(),
          deck: type,
        });
      }
    }

    return (
      <div className={cls.block()}>
        <div className={cls.element("deck")}>
          <h3
            className={cls.element("deck-name")}
            onClick={() => setDialogOpen(true)}
          >
            {$String.capitalize(type)} Deck
          </h3>
          {deck.drawPile.length !== 0 ? (
            <ExplorationCard
              className={cls.element("pile")}
              name={
                type === "room"
                  ? "R??"
                  : type === "corridor"
                  ? "P??"
                  : type === "battle"
                  ? "B???"
                  : "C???"
              }
              onPress={drawRandomCard}
            />
          ) : (
            <div className={cls.element("pile", null, "empty")}>Empty</div>
          )}
          {deck.discardPile.length !== 0 ? (
            <ExplorationCard
              className={cls.element("pile")}
              name={$Array.last(deck.discardPile)!}
              onPress={shuffle}
            />
          ) : (
            <div className={cls.element("pile", null, "empty")}>Empty</div>
          )}
          <div className={cls.element("label")}>Draw pile</div>
          <div className={cls.element("label")}>Discard pile</div>
        </div>

        {dialogOpen && (
          <Dialog
            title={`${$String.capitalize(type)} Deck`}
            onClose={() => setDialogOpen(false)}
          >
            {deck.drawPile.length !== 0 && (
              <>
                <h2>Draw pile</h2>
                <div className={cls.element("list")}>
                  {deck.drawPile.map((card) => (
                    <ExplorationCard
                      key={card}
                      name={card}
                      onPress={() => drawCard(card)}
                    />
                  ))}
                </div>
              </>
            )}
            {deck.discardPile.length !== 0 && (
              <>
                <h2>Discard pile</h2>
                <div className={cls.element("list")}>
                  {deck.discardPile.map((card) => (
                    <ExplorationCard key={card} name={card} />
                  ))}
                </div>
              </>
            )}
          </Dialog>
        )}
      </div>
    );
  }
);

export { ExplorationCardDeckMemo as ExplorationCardDeck };
