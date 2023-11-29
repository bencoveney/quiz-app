import {
  heading as headingStyles,
  subheading as subheadingStyles,
} from "./header.module.css";

export function Header({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) {
  return (
    <div>
      <span className={subheadingStyles}>{subheading}</span>
      <h1 className={headingStyles}>{heading}</h1>
    </div>
  );
}
