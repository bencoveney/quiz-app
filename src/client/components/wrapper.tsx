import { PropsWithChildren } from "react";
import {
  wrapper,
  thin as thinStyles,
  wide as wideStyles,
} from "./wrapper.module.css";

export function Wrapper({
  children,
  thin,
}: PropsWithChildren<{ thin?: boolean }>) {
  const widthStyles = thin ? thinStyles : wideStyles;
  return <div className={`${wrapper} ${widthStyles}`}>{children}</div>;
}
