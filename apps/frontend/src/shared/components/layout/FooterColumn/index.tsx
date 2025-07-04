import { FC, ReactNode } from "react";
import { Link } from "react-router";

export type FooterColumnProps = {
  title: ReactNode;
  links: { label: ReactNode; address: string }[];
};

export const FooterColumn: FC<FooterColumnProps> = ({ title, links }) => (
  <div className="flex flex-col gap-6 last:text-right last:ml-auto">
    <p className="text-white text-body-paragraph">{title}</p>
    <ul className="text-background text-body-small flex flex-col gap-3">
      {links.map((link, index) => (
        <li key={index}>
          <Link to={link.address}>{link.label}</Link>
        </li>
      ))}
    </ul>
  </div>
);
