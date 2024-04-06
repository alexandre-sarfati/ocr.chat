"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
} from "react";

import PostHogPageView from "#/ui/posthog-pageview";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SessionProvider, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { Toaster } from "sonner";

if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  });
}

export const AppContext = createContext<{
  setShowCMDK: Dispatch<SetStateAction<boolean>>;
}>({
  setShowCMDK: () => {},
});

export default function Providers({ children }: { children: ReactNode }) {
  const { systemTheme } = useTheme();

  useEffect(() => {
    if (systemTheme !== "dark" && systemTheme !== "light") {
      return;
    }

    const color = systemTheme === "dark" ? "#121116" : "#fefdff";

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", color);
  }, [systemTheme]);

  return (
    <SessionProvider>
      <Identify />
      <Toaster visibleToasts={1} />
      <PostHogProvider client={posthog}>
        <PostHogPageView />
        {children}
      </PostHogProvider>
      <Analytics />
      <SpeedInsights />
    </SessionProvider>
  );
}

const Identify = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session?.user) {
      posthog.identify(session.user?.id, {
        email: session.user?.email,
        name: session.user?.name,
      });
    }
  }, [session]);

  return null;
};
