import { FormEvent, ReactNode } from "react";
import { ComponentWithChildren } from "@shared-types/components/component-with-children";
import { Form } from "@forms/Form";
import { Button } from "@ui/Button";
import SiteLogo from "@icons/logo-website.svg?react";

type RecoveryPageLayoutProps = {
  title: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  submitDisabled: boolean;
  buttonText: string;
  icon: ReactNode;
};

export const RecoveryPageLayout: ComponentWithChildren<
  RecoveryPageLayoutProps
> = ({ title, handleSubmit, children, submitDisabled, buttonText, icon }) => (
  <div className="mt-30 flex flex-col gap-17.5 items-center">
    <SiteLogo className="fill-primary size-30" />
    <h3 className="text-display-smallest">{title}</h3>
    <Form
      handleSubmit={handleSubmit}
      className="flex flex-col max-w-112 w-full"
    >
      <div className="flex flex-col gap-8.75">
        {children}
        <Button
          type="submit"
          disabled={submitDisabled}
          className="text-body-paragraph text-white p-3 w-full flex justify-center rounded-4xl bg-primary"
        >
          {icon}
          <span className="ml-2">{buttonText}</span>
        </Button>
      </div>
    </Form>
  </div>
);
