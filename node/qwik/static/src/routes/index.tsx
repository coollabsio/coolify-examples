import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const buildPublicVar = import.meta.env.VITE_BUILD_PUBLIC_VAR || "default-value";

  return (
    <>
      <div style={{ padding: "20px", background: "#f0f0f0", margin: "20px", borderRadius: "8px" }}>
        <h2>Environment Variable Test</h2>
        <h3>Build-time (baked into bundle)</h3>
        <p><strong>VITE_BUILD_PUBLIC_VAR:</strong> {buildPublicVar}</p>
        <p style={{ color: "#666", fontSize: "14px" }}>
          Note: Static sites only support build-time env vars (no server at runtime)
        </p>
      </div>
      <h1>Hello from Qwik!</h1>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
