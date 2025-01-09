import { authentication, createDirectus, rest } from "@directus/sdk";

const directus = createDirectus("https://directus.example.com")
  .with(authentication())
  .with(
    rest({
      onRequest: (options) => ({ ...options, cache: "no-store" }),
    })
  );

export default directus;
