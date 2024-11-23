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
  {
    name: "App using API: create file (random author)",
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
        author: {
          name: "Someone",
          email: "someone@example.com",
        },
      });

      if (!res.data.commit.sha) {
        throw Error("Commit has no sha");
      }

      return res.data.commit.sha;
    },
  },
  {
    name: "App using API: create file (random commiter)",
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
        committer: {
          name: "Someone",
          email: "someone@example.com",
        },
      });

      if (!res.data.commit.sha) {
        throw Error("Commit has no sha");
      }

      return res.data.commit.sha;
    },
  },
  {
    name: "App using API: create file (perfect match author)",
    run: async ({ ghApp, config }) => {
      const octokit = await ghApp.getInstallationOctokit(
        await getInstallationId(ghApp, config.owner)
      );

      const appRes = await ghApp.octokit.request("GET /app");

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
        author: {
          name: `${appRes.data?.slug}[bot]`,
          email: `${config.githubApp.appId}+${appRes.data?.slug}[bot]@users.noreply.github.com`,
        },
      });

      if (!res.data.commit.sha) {
        throw Error("Commit has no sha");
      }

      return res.data.commit.sha;
    },
  },
];
