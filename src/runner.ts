import { App } from "octokit";
import { Config } from "./config.js";
import { getInstallationId } from "./utils.js";
import { printExperimentResult } from "./pretty-output.js";

export interface InputContext {
  config: Config;
  ghApp: InstanceType<typeof App>;
}

export interface ExperimentContext extends InputContext {
  branch: string;
}

export interface Experiment {
  name: string;
  run: (ctx: ExperimentContext) => Promise<string>;
}

export async function runExperiment(
  inputCtx: InputContext,
  experiment: Experiment
) {
  const slug = experiment.name
    .replaceAll(/[^A-Za-z0-9]/g, "-")
    .replaceAll(/-+/g, "-")
    .toLowerCase();
  const branch = `experiments/${slug}/${new Date().getTime()}`;

  const ctx = {
    ...inputCtx,
    branch,
  };

  try {
    const commit = await experiment.run(ctx);

    const { ghApp, config } = inputCtx;
    const octokit = await ghApp.getInstallationOctokit(
      await getInstallationId(ghApp, config.owner)
    );

    const res = await octokit.rest.repos.getCommit({
      owner: config.owner,
      repo: config.repo,
      ref: commit,
    });

    printExperimentResult(ctx, experiment, {
      type: "ok",
      commit,
      verification: res.data.commit.verification,
    });
  } catch (error) {
    printExperimentResult(ctx, experiment, { type: "error", error });
  }
}
