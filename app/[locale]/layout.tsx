import { ThemeProvider } from "@/components/theme-provider";
import { inter, switzer } from "@/styles/fonts";
import "@/styles/globals.css";
import { cn } from "@7qr.codes/utils";
import { GoogleTagManager } from "@next/third-parties/google";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { constructMetadata } from "#/lib/utils";
import Providers from "./providers";

export async function generateMetadata({
  params: { locale },
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return constructMetadata({
    title: t("Home.title"),
    description: t("Home.description"),
    image: t("Home.image"),
  });
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} className={cn(switzer.variable, inter.variable)}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
      <GoogleTagManager
        gtmId={process.env.NEXT_PUBLIC_GTM_CONTAINER_ID as string}
      />
    </html>
  );
}
