import { memo } from "react";
import { bemClasses } from "../util/bem-classes.js";

const cls = bemClasses("bct-header");

export interface HeaderProps {
  readonly title: string;
  readonly className?: string;
}

const HeaderMemo = memo<HeaderProps>(function Header({ title, className }) {
  return <header className={cls.block(className)}>{title}</header>;
});

export { HeaderMemo as Header };
