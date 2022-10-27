import { memo, useState } from "react";
import { CampaignState } from "../../campaign-state/index.js";
import * as content from "../../content/index.js";
import { bemClasses } from "../../util/bem-classes.js";
import { useDispatch } from "./use-dispatch.js";

const cls = bemClasses("bct-campaign-current-encounter");

export interface SelectChapterProps {
  readonly chapterProgress: CampaignState["chapterProgress"];
}

const SelectChapterMemo = memo<SelectChapterProps>(function SelectChapter({
  chapterProgress,
}) {
  const dispatch = useDispatch();
  const [chapter, setChapter] = useState("-");

  function selectChapter() {
    if (confirm(`Start chapter ${chapter}?`)) {
      dispatch({
        type: "start-chapter",
        timestamp: new Date().toISOString(),
        chapter,
      });
    }
  }

  return (
    <div className={cls.block()}>
      <select
        value={chapter}
        onChange={(e) => setChapter(e.currentTarget.value)}
      >
        {chapter === "-" && (
          <option value="-" disabled>
            -
          </option>
        )}
        {Object.getOwnPropertyNames(content.chapters).map((chapter) => (
          <option
            key={chapter}
            value={chapter}
            disabled={chapterProgress.hasOwnProperty(chapter)}
          >
            {chapter}
          </option>
        ))}
      </select>
      <button disabled={chapter === "-"} onClick={selectChapter}>
        Start chapter
      </button>
    </div>
  );
});

export { SelectChapterMemo as SelectChapter };
