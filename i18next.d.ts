
import "i18next";

import en from "./assets/locales/en.json";
import pt from "./assets/locales/pt.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "en";
    resources: {
      en: typeof en;
      pt: typeof pt;
    };
  }
}