import "react-i18next";
import common from "@en/common.json";
import signIn from "@en/sign-in.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof common;
      signIn: typeof signIn;
    };
  }
}
