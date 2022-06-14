import { FC } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/header.js";
import { bemClasses } from "../util/bem-classes.js";

const cls = bemClasses("bct-disclaimer");

export const Disclaimer: FC = () => {
  return (
    <div className={cls.block()}>
      <Header title="Bardsung Campaign Tracker" />
      <main className={cls.element("main")}>
        <h1>Before you use this tool</h1>
        <h2>Overview</h2>
        <p>
          This is a tool I created to track my campaign progress in{" "}
          <a
            href="https://steamforged.com/products/bardsung-legend-of-the-ancient-forge"
            target="_blank"
          >
            Bardsung
          </a>
          . The trays included with the core game are great when you're playing
          a single campaign; but I'm playing multiple campaigns in parallel, and
          saving the campaign progress including card decks and character
          inventories is a bit tricky. What you see here is my solution to this
          problem.
        </p>
        <h2>Stability</h2>
        <p>
          This tool is in early development and not ready for general use yet!
          Lots of game content is missing and you may encounter bugs. But most
          importantly, the save data format may change in the future, which
          would mean that old campaigns would no longer work. At this point in
          time, use this tool only if you can read the source code and are able
          to debug it yourself if necessary, and be sure to store backups of
          your campaign progress offline.
        </p>
        <h2>Save data and backups</h2>
        <p>
          All campaign data is saved locally on your device, in your web
          browser. Caution: Your browser may autonomously decide to delete this
          data (technical details:{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria"
            target="_blank"
          >
            1
          </a>
          ,{" "}
          <a
            href="https://web.dev/storage-for-the-web/#eviction"
            target="_blank"
          >
            2
          </a>
          ). Do use the export/import feature to download a backup of your
          campaign data and save it in a text file <code>campaign.json</code> on
          your computer.
        </p>
        <h2>Bardsung license</h2>
        <p>
          This is an inofficial community tool. I am in no way associated with
          Steamforged Games or Bardsung.
        </p>
        <h2>Contributions &amp; bug reports</h2>
        <p>
          You can find the source code for this tool on{" "}
          <a
            href="https://github.com/pschiffmann/bardsung-campaign-tracker"
            target="_blank"
          >
            Github
          </a>
          . Feel free to send pull requests or open issues.
        </p>
        <hr />
        <Link to="/campaign">Start a campaign</Link>
      </main>
    </div>
  );
};
