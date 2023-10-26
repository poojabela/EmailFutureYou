import "./globals.css";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";

const sans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EmailFutureYou",
  icons: "logo.svg",
  openGraph: {
    title: "EmailFutureYou",
    images: ["og.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={[
          sans.className,
          "bg-[#f1f5f9] selection:text-white selection:bg-black/30",
        ].join(" ")}
      >
        {children}
      </body>
    </html>
  );
}
