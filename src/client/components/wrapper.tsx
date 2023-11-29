import { PropsWithChildren } from "react";
import { wrapper } from "./wrapper.module.css";

export function Wrapper({ children }: PropsWithChildren) {
  return <div className={wrapper}>{children}</div>;
}
