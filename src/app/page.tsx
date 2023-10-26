/* eslint-disable @next/next/no-img-element */
"use client";

import { btnStyle } from "@/components/ui";
import Link from "next/link";
import { motion } from "framer-motion";
import { EnvelopeSimple } from "@phosphor-icons/react";

export default function Home() {
  return (
    <main className="w-[min(640px,_100%)] mx-auto">
      <motion.div
        className="min-h-[80vh] flex flex-col items-stretch justify-center gap-6 p-6"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-black/40 to-black font-bold text-5xl">
          Email Future You
        </h1>
        <p className="text-md text-black/50">
          Stay connected with the most important person in your life: your
          future self. Leave notes, reminders, and heartfelt messages that will
          surprise and inspire you when they&apos;re needed most.
        </p>
        <div className="flex flex-row gap-2">
          <Link href="/form" className={btnStyle}>
            <EnvelopeSimple weight="duotone" />
            <span>Start</span>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
