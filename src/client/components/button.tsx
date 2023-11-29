import { PropsWithChildren } from "react";
import { button, buttonBar } from "./button.module.css";

export function Button({
  children,
  disabled,
  onClick,
}: PropsWithChildren<{
  onClick: () => void;
  disabled?: boolean;
}>) {
  return (
    <button disabled={disabled} className={button} onClick={onClick}>
      {children}
    </button>
  );
}

export function ButtonBar({ children }: PropsWithChildren) {
  return <div className={buttonBar}>{children}</div>;
}
