import { memo } from "react";
import { CampaignState } from "../../campaign-state/state.js";
import { BardsungIcon } from "../../components/bardsung-icon.js";
import { bemClasses } from "../../util/bem-classes.js";
import { useDispatch } from "./use-dispatch.js";

const cls = bemClasses("bct-campaign-tokens");

export interface TokensProps {
  readonly tokens: CampaignState["tokens"];
}

const TokensMemo = memo<TokensProps>(function Tokens({ tokens }) {
  const dispatch = useDispatch();

  function exhaustToken(token: any) {
    if (confirm(`Exhaust a ${token.replace("-", " ")} token?`)) {
      dispatch({
        type: "exhaust-token",
        timestamp: new Date().toISOString(),
        token,
      });
    }
  }

  function buyToken(token: any) {
    if (confirm(`Spend 7 gold to buy a ${token.replace("-", " ")} token?`)) {
      dispatch({
        type: "buy-token",
        timestamp: new Date().toISOString(),
        token,
      });
    }
  }

  return (
    <div className={cls.block()}>
      {Object.entries(icons).map(([type, icon]) => (
        <div key={type} className={cls.element("group")}>
          {three.map((n) => {
            const exhausted = tokens[type as keyof typeof icons] < n;
            return (
              <BardsungIcon
                key={n}
                className={cls.element("token", null, exhausted && "exhausted")}
                name={icon}
                onClick={() =>
                  exhausted ? buyToken(type) : exhaustToken(type)
                }
              />
            );
          })}
        </div>
      ))}
    </div>
  );
});

const icons = {
  charm: "Gold-Charm",
  "healing-potion": "Gold-HealingPotion",
  toolkit: "Gold-Toolkit",
  firewood: "Gold-Firewood",
} as const;
const three = [1, 2, 3];

export { TokensMemo as Tokens };
