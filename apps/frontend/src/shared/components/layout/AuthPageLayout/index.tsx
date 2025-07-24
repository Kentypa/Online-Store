import { ComponentWithChildren } from "@shared-types/components/component-with-children";
import SiteLogo from "@icons/logo-website.svg?react";

type AuthPageLayoutProps = {
  title: string;
  subtitle: string;
};

export const AuthPageLayout: ComponentWithChildren<AuthPageLayoutProps> = ({
  title,
  subtitle,
  children,
}) => (
  <div className="mt-30 flex flex-col gap-17.5 items-center">
    <SiteLogo className="fill-primary size-30" />
    <h2 className="text-display-medium">{title}</h2>
    <h3 className="text-display-smallest">{subtitle}</h3>
    {children}
  </div>
);
