import { FC } from "react";
import logo from "@images/logo-main.jpeg";

type LogoProps = {
  className?: string;
};

export const Logo: FC<LogoProps> = ({ className }) => {
  return <img alt="logo" className={`${className} rounded-lg`} src={logo} />;
};
