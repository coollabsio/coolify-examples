"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  // Build-time public var (baked into bundle)
  const buildPublicVar = process.env.NEXT_PUBLIC_BUILD_PUBLIC_VAR || "default-value";

  // Runtime vars (fetched from server API)
  const [runtimePrivateVar, setRuntimePrivateVar] = useState("loading...");
  const [runtimePublicVar, setRuntimePublicVar] = useState("loading...");

  useEffect(() => {
    console.log("=== Build-time Variables ===");
    console.log("NEXT_PUBLIC_BUILD_PUBLIC_VAR:", buildPublicVar);

    // Fetch runtime vars from server API
    fetch("/api/env")
      .then((res) => res.json())
      .then((data) => {
        setRuntimePrivateVar(data.runtimePrivateVar);
        setRuntimePublicVar(data.runtimePublicVar);
        console.log("=== Runtime Variables ===");
        console.log("RUNTIME_PRIVATE_VAR:", data.runtimePrivateVar);
        console.log("RUNTIME_PUBLIC_VAR:", data.runtimePublicVar);
      })
      .catch(() => {
        setRuntimePrivateVar("error");
        setRuntimePublicVar("error");
      });
  }, [buildPublicVar]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div style={{ padding: "20px", background: "#f0f0f0", margin: "20px", borderRadius: "8px", width: "100%" }}>
          <h2>Environment Variable Test</h2>
          <h3>Build-time (baked into bundle)</h3>
          <p><strong>NEXT_PUBLIC_BUILD_PUBLIC_VAR:</strong> {buildPublicVar}</p>
          <h3>Runtime (read at server startup)</h3>
          <p><strong>RUNTIME_PRIVATE_VAR:</strong> {runtimePrivateVar}</p>
          <p><strong>RUNTIME_PUBLIC_VAR:</strong> {runtimePublicVar}</p>
        </div>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
