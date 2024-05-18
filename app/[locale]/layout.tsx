import { inter, switzer } from "@/styles/fonts";
import "@/styles/globals.css";
import { GoogleTagManager } from "@next/third-parties/google";

import Providers from "./providers";
import { cn } from "@/lib/utils";

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
        <Providers>{children}</Providers>
      </body>
      <GoogleTagManager
        gtmId={process.env.NEXT_PUBLIC_GTM_CONTAINER_ID as string}
      />
    </html>
  );
}
