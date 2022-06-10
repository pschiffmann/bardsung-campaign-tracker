import { FC, ReactNode } from "react";
import { bemClasses } from "../util/bem-classes.js";

const cls = bemClasses("bct-loading-message");

export interface LoadingMessageProps {
  readonly children: ReactNode;
}

export const LoadingMessage: FC<LoadingMessageProps> = ({ children }) => {
  return <div className={cls.block()}>{children}</div>;
};
