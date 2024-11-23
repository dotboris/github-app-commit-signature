import { z } from "zod";
import { load as loadYaml } from "js-yaml";
import { readFile } from "fs/promises";

const configSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  githubApp: z.object({
    appId: z.number(),
    privateKey: z.string(),
    oauth: z.object({
      clientId: z.string(),
      clientSecret: z.string(),
    }),
  }),
});
export type Config = z.infer<typeof configSchema>;

export async function loadConfig() {
  const content = await readFile("config.yml", { encoding: "utf-8" });
  const yaml = loadYaml(content);
  return configSchema.parse(yaml);
}
