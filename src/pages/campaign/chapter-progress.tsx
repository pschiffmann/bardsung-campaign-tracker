import { memo } from "react";
import { ChapterProgress } from "../../campaign-state/state.js";
import * as content from "../../content/index.js";
import { encounterNumToChar } from "../../content/index.js";
import { bemClasses } from "../../util/bem-classes.js";

const cls = bemClasses("bct-campaign-chapter-progress");

export interface ChapterProgressProps {
  readonly chapter: string;
  readonly progress: ChapterProgress;
}

const ChapterProgressMemo = memo<ChapterProgressProps>(
  function ChapterProgress({ chapter, progress }) {
    const data = content.chapters[chapter];

    return (
      <div className={cls.block()}>
        <h3>{chapter}</h3>
        <h4>Encounters</h4>
        {new Array(data.encounters).fill(null).map((_, i) => (
          <div key={i}>
            <input
              type="checkbox"
              disabled
              checked={progress.completedEncounters.includes(i)}
            />
            {chapter}
            {encounterNumToChar(i)}
          </div>
        ))}
        <h4>Goals</h4>
        {Object.entries(data.goals).map(([description], i) => (
          <div key={i}>
            <input
              type="checkbox"
              disabled
              checked={progress.completedGoals.includes(i)}
            />
            {description}
          </div>
        ))}
      </div>
    );
  }
);

export { ChapterProgressMemo as ChapterProgress };
