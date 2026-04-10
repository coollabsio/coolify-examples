import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const buildPublicVar = import.meta.env.VITE_BUILD_PUBLIC_VAR || "default-value";
  const runtimePrivateVar = useSignal("loading...");
  const runtimePublicVar = useSignal("loading...");

  useVisibleTask$(() => {
    console.log("=== Build-time Variables ===");
    console.log("VITE_BUILD_PUBLIC_VAR:", buildPublicVar);

    fetch("/api/env")
      .then((res) => res.json())
      .then((data) => {
        runtimePrivateVar.value = data.runtimePrivateVar;
        runtimePublicVar.value = data.runtimePublicVar;
        console.log("=== Runtime Variables ===");
        console.log("RUNTIME_PRIVATE_VAR:", data.runtimePrivateVar);
        console.log("RUNTIME_PUBLIC_VAR:", data.runtimePublicVar);
      })
      .catch(() => {
        runtimePrivateVar.value = "error";
        runtimePublicVar.value = "error";
      });
  });

  return (
    <>
      <div style={{ padding: "20px", background: "#f0f0f0", margin: "20px", borderRadius: "8px" }}>
        <h2>Environment Variable Test</h2>
        <h3>Build-time (baked into bundle)</h3>
        <p><strong>VITE_BUILD_PUBLIC_VAR:</strong> {buildPublicVar}</p>
        <h3>Runtime (read at server startup)</h3>
        <p><strong>RUNTIME_PRIVATE_VAR:</strong> {runtimePrivateVar.value}</p>
        <p><strong>RUNTIME_PUBLIC_VAR:</strong> {runtimePublicVar.value}</p>
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
