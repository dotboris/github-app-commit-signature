import { Experiment } from "../runner.js";
import { createExperimentBranch, getInstallationId } from "../utils.js";

export const appUsingApiExperiments: Experiment[] = [
  {
    name: "App using API: create file (no author, no committer)",
    run: async ({ ghApp, config }) => {
      const octokit = await ghApp.getInstallationOctokit(
        await getInstallationId(ghApp, config.owner)
      );

      const { branch } = await createExperimentBranch(
        octokit,
        config.owner,
        config.repo
      );

      let content = new Date().toISOString();
      content = Buffer.from(content).toString("base64");

      const res = await octokit.rest.repos.createOrUpdateFileContents({
        owner: config.owner,
        repo: config.repo,
        branch,
        message: "test: create file with no author",
        path: "create-file-no-author.txt",
        content,
      });

      if (!res.data.commit.sha) {
        throw Error("Commit has no sha");
      }

      return res.data.commit.sha;
    },
  },
];
