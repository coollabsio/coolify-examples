import type { RequestHandler } from "@builder.io/qwik-city";

const RUNTIME_PRIVATE_VAR = process.env.RUNTIME_PRIVATE_VAR || "default-value";
const RUNTIME_PUBLIC_VAR = process.env.RUNTIME_PUBLIC_VAR || "default-value";

export const onGet: RequestHandler = async ({ json }) => {
  json(200, {
    runtimePrivateVar: RUNTIME_PRIVATE_VAR,
    runtimePublicVar: RUNTIME_PUBLIC_VAR,
  });
};
