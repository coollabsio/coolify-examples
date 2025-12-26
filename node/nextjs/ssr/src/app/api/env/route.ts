import { NextResponse } from "next/server";

// Runtime env vars (read at server startup)
const RUNTIME_PRIVATE_VAR = process.env.RUNTIME_PRIVATE_VAR || "default-value";
const RUNTIME_PUBLIC_VAR = process.env.RUNTIME_PUBLIC_VAR || "default-value";

console.log("=== Runtime Variables ===");
console.log("RUNTIME_PRIVATE_VAR:", RUNTIME_PRIVATE_VAR);
console.log("RUNTIME_PUBLIC_VAR:", RUNTIME_PUBLIC_VAR);

export async function GET() {
  return NextResponse.json({
    runtimePrivateVar: RUNTIME_PRIVATE_VAR,
    runtimePublicVar: RUNTIME_PUBLIC_VAR,
  });
}
