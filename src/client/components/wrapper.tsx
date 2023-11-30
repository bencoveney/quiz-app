import { PropsWithChildren } from "react";
import {
  wrapper,
  thin as thinStyles,
  wide as wideStyles,
} from "./wrapper.module.css";

interface Props {
  thin?: boolean;
}

export function Wrapper({ children, thin }: PropsWithChildren<Props>) {
  const widthStyles = thin ? thinStyles : wideStyles;
  return <main className={`${wrapper} ${widthStyles}`}>{children}</main>;
}
