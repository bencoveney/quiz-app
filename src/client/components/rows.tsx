import { PropsWithChildren } from "react";
import { rows } from "./rows.module.css";

export function Rows({ children }: PropsWithChildren) {
  return <div className={rows}>{children}</div>;
}
