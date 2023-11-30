import { PropsWithChildren } from "react";
import { button, buttonBar } from "./button.module.css";

interface Props extends PropsWithChildren {
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ children, disabled, onClick }: Props) {
  return (
    <button disabled={disabled} className={button} onClick={onClick}>
      {children}
    </button>
  );
}

export function ButtonBar({ children }: PropsWithChildren) {
  return <div className={buttonBar}>{children}</div>;
}
