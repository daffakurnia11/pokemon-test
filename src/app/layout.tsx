"use client";

import Navigation from "@/components/Navigation";
import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { inter } from "@/utils/fonts";
import Message from "@/components/Message";
import { Provider } from "jotai";
import { setMessageContent } from "@/utils/atoms";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={setMessageContent}>
          <div className="min-h-dvh bg-slate-200 flex items-center justify-center">
            <Navigation />
            {children}
          </div>
          <Message />
        </Provider>
      </body>
    </html>
  );
}
