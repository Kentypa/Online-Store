import { FC } from "react";
import { NavLink } from "react-router";

export type ProfileNavigationProps = {
  title: string;
  links: { label: string; address: string }[];
};

export const ProfileNavigation: FC<ProfileNavigationProps> = ({
  links,
  title,
}) => {
  return (
    <div className="flex flex-col gap-3 rounded-4xl text-nowrap p-10 w-full max-w-46 border-2 border-separator">
      <h4 className="text-display-smallest">{title}</h4>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <NavLink
            key={link.label}
            to={link.address}
            className={({ isActive }) =>
              isActive ? "font-semibold underline" : ""
            }
          >
            {link.label}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};
