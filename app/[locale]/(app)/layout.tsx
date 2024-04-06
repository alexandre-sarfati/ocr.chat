import { ReactNode } from "react";

import SimpleFooter from "#/ui/simple-footer";
import SimpleHeader from "#/ui/simple-header";
import { useTranslations } from "next-intl";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  const t = useTranslations("general.header.nav");

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <SimpleHeader />
      {children}
      <SimpleFooter />
    </div>
  );
}
