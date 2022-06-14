import { FC } from "react";
import { Header } from "../components/header.js";
import { bemClasses } from "../util/bem-classes.js";

const cls = bemClasses("bct-glossary");

export const Glossary: FC = () => {
  return (
    <div className={cls.block()}>
      <Header title="Glossary – Bardsung Campaign Tracker" />
      <p>
        Sources: <em>[RB10]</em> = Rulebook page 10, <em>[AB15]</em> = Adventure
        book page 15.
      </p>
      <dl>
        <dt>Action roll</dt>
        <dd>
          A d20 roll where the dice roll must be equal to or higher than the
          target number (TN). The hero characteristic modifier is added to the
          dice roll.
          <Source page="RB10" />
        </dd>
        <dt>Advantage/disadvantage</dt>
        <dd>
          If an action roll has advantage/disadvantage, roll two d20 and use the
          highest/lowest result.
          <Source page="RB10" />
        </dd>
        <dt>Rerolls</dt>
        <dd>
          <Source page="RB10" />
        </dd>
      </dl>
    </div>
  );
};

const Source: FC<{ readonly page: string }> = ({ page }) => {
  return <span className={cls.element("source")}> [{page}]</span>;
};
