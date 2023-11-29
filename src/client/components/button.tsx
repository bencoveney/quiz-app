import { PropsWithChildren } from "react";
import {
  button,
  verticalButtons,
  horizontalButtons,
} from "./button.module.css";

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

export function VerticalButtons({ children }: PropsWithChildren) {
  return <div className={verticalButtons}>{children}</div>;
}

export function HorizontalButtons({ children }: PropsWithChildren) {
  return <div className={horizontalButtons}>{children}</div>;
}
