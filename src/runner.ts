import { App } from "octokit";
import { Config } from "./config.js";
import { getInstallationId } from "./utils.js";
import { printExperimentResult } from "./pretty-output.js";

export interface InputContext {
  config: Config;
  ghApp: InstanceType<typeof App>;
}

export interface ExperimentContext extends InputContext {}

export interface Experiment {
  name: string;
  run: (ctx: ExperimentContext) => Promise<string>;
}

export async function runExperiment(ctx: InputContext, experiment: Experiment) {
  try {
    const commit = await experiment.run(ctx);

    const { ghApp, config } = ctx;
    const octokit = await ghApp.getInstallationOctokit(
      await getInstallationId(ghApp, config.owner)
    );

    const res = await octokit.rest.repos.getCommit({
      owner: config.owner,
      repo: config.repo,
      ref: commit,
    });

    printExperimentResult(experiment, {
      type: "ok",
      verification: res.data.commit.verification,
    });
  } catch (error) {
    printExperimentResult(experiment, { type: "error", error });
  }
}
