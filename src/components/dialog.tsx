import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import { bemClasses } from "../util/bem-classes.js";

const cls = bemClasses("bct-dialog");

export interface DialogProps {
  readonly title: string;
  readonly children: ReactNode;
  readonly className?: string;
  onClose(): void;
}

export const Dialog: FC<DialogProps> = ({
  title,
  children,
  className,
  onClose,
}) => {
  return createPortal(
    <div className={cls.block()}>
      <div className={cls.element("backdrop")} onClick={onClose} />
      <div className={cls.element("surface")}>
        <div className={cls.element("title")}>{title}</div>
        <div className={cls.element("body", className)}>{children}</div>
      </div>
    </div>,
    document.body
  );
};
