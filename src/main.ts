import { App as GitHubApp } from "octokit";
import { loadConfig } from "./config.js";
import { runExperiment } from "./runner.js";
import { appUsingApiExperiments } from "./experiments/app-using-api.js";

const EXPERIMENTS = [...appUsingApiExperiments];

await main();

async function main() {
  const config = await loadConfig();

  const ghApp = new GitHubApp({
    appId: config.githubApp.appId,
    privateKey: config.githubApp.privateKey,
  });
  const ctx = { config, ghApp };

  for (const experiment of EXPERIMENTS) {
    await runExperiment(ctx, experiment);
  }
}
