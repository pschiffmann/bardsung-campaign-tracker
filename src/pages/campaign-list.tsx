import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchCampaignNames,
  saveCampaignHistory,
} from "../campaign-state/persistence.js";
import { HeroProfileCard } from "../components/cards.js";
import { Header } from "../components/header.js";
import { LoadingMessage } from "../components/loading-message.js";
import { heroes, HeroName } from "../content/index.js";
import { bemClasses } from "../util/bem-classes.js";

const cls = bemClasses("bct-campaign-list");

export const CampaignList: FC = () => {
  const [campaignNames, setCampaignNames] = useState<string[]>();
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const names = await fetchCampaignNames();
      if (!cancelled) setCampaignNames(names);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const [newCampaignOpen, setNewCampaignOpen] = useState(false);

  return (
    <div className={cls.block()}>
      <Header
        className={cls.element("header")}
        title="Bardsung Campaign Tracker"
      />

      <div className={cls.element("list")}>
        <h2>Your campaigns</h2>
        {!campaignNames ? (
          <LoadingMessage>Loading</LoadingMessage>
        ) : !campaignNames.length ? (
          <p>You have no campaigns.</p>
        ) : (
          <ul className={cls.element("campaigns")}>
            {campaignNames.map((name) => (
              <li key={name} className={cls.element("campaign")}>
                <Link to={name}>{name}</Link>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => setNewCampaignOpen((x) => !x)}
          disabled={!campaignNames}
        >
          New campaign
        </button>
      </div>

      {newCampaignOpen && <NewCampaign existing={campaignNames!} />}
    </div>
  );
};

const NewCampaign: FC<{
  readonly existing: string[];
}> = ({ existing }) => {
  const [createInProgress, setCreateInProgress] = useState(false);

  const [name, setName] = useState("");
  const nameValid = /^[\w ]+$/i.test(name);

  const [selectedHeroes, setSelectedHeroes] = useState(() => new Set<string>());
  const toggleHero = (name: string) =>
    setSelectedHeroes((prev) => {
      if (prev.has(name)) {
        const next = new Set(prev);
        next.delete(name);
        return next;
      } else if (prev.size < 5) {
        const next = new Set(prev);
        next.add(name);
        return next;
      }
      return prev;
    });

  const navigate = useNavigate();
  async function createCampaign() {
    setCreateInProgress(true);
    await saveCampaignHistory(name, [
      {
        type: "start-campaign",
        timestamp: new Date().toISOString(),
        heroes: [...selectedHeroes].sort() as any,
      },
    ]);
    navigate(name);
  }

  return (
    <div className={cls.element("new")}>
      <label>
        Campaign name (latin alphabet, numbers and spaces only)
        <input
          className={cls.element("name-input")}
          type="text"
          value={name}
          disabled={createInProgress}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
      </label>

      <div className={cls.element("hero-cards")}>
        {Object.keys(heroes).map((name) => (
          <HeroProfileCard
            key={name}
            className={cls.element(
              "hero-card",
              null,
              selectedHeroes.has(name) && "selected"
            )}
            name={name as HeroName}
            onPress={createInProgress ? undefined : () => toggleHero(name)}
          />
        ))}
      </div>

      <button
        className={cls.element("create-button")}
        onClick={createCampaign}
        disabled={
          !nameValid ||
          existing.includes(name) ||
          selectedHeroes.size < 2 ||
          createInProgress
        }
      >
        Create campaign
      </button>
    </div>
  );
};
