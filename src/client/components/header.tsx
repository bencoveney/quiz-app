import {
  heading as headingStyles,
  subheading as subheadingStyles,
} from "./header.module.css";

interface Props {
  heading: string;
  subheading: string;
}

export function Header({ heading, subheading }: Props) {
  return (
    <header>
      <span className={subheadingStyles}>{subheading}</span>
      <h1 className={headingStyles}>{heading}</h1>
    </header>
  );
}
