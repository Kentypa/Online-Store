import { Navigation } from "@layout/Navigation";
import { FC } from "react";
import Moon from "@icons/moon.svg";

const menu = [
  { link: "/about-game", name: "About Game" },
  { link: "/help-center", name: "Help Center" },
  { link: "rules", name: "Rules" },
];

export const Footer: FC = () => {
  return (
    <footer className="flex justify-between items-center py-4 px-30 w-full bg-subtle-dark mt-auto">
      <div className="flex text-body-large w-full justify-between items-center max-w-[422px] m-auto text-white">
        <Navigation menuItems={menu} />
      </div>
      <div className="flex justify-center size-10 items-center rounded-xl border border-subtle-light">
        <img src={Moon} alt="moon" className="size-5" />
      </div>
    </footer>
  );
};
