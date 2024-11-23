import { Experiment } from "../runner.js";
import {
  createExperimentBranch,
  getInstallationId,
  getPerfectMatchAuthor,
} from "../utils.js";

export const appUsingApiExperiments: Experiment[] = [
  {
    name: "App using API: create file (no author, no committer)",
    run: async (ctx) => {
      const { ghApp, config } = ctx;
      const octokit = await ghApp.getInstallationOctokit(
        await getInstallationId(ghApp, config.owner)
      );

      const { branch } = await createExperimentBranch(ctx, octokit);

      let content = new Date().toISOString();
      content = Buffer.from(content).toString("base64");

      const res = await octokit.rest.repos.createOrUpdateFileContents({
        owner: config.owner,
        repo: config.repo,
        branch,
        message: "experiment commit",
        path: "experiment.txt",
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
    run: async (ctx) => {
      const { ghApp, config } = ctx;
      const octokit = await ghApp.getInstallationOctokit(
        await getInstallationId(ghApp, config.owner)
      );

      const { branch } = await createExperimentBranch(ctx, octokit);

      let content = new Date().toISOString();
      content = Buffer.from(content).toString("base64");

      const res = await octokit.rest.repos.createOrUpdateFileContents({
        owner: config.owner,
        repo: config.repo,
        branch,
        message: "experiment commit",
        path: "experiment.txt",
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
    run: async (ctx) => {
      const { ghApp, config } = ctx;
      const octokit = await ghApp.getInstallationOctokit(
        await getInstallationId(ghApp, config.owner)
      );

      const { branch } = await createExperimentBranch(ctx, octokit);

      let content = new Date().toISOString();
      content = Buffer.from(content).toString("base64");

      const res = await octokit.rest.repos.createOrUpdateFileContents({
        owner: config.owner,
        repo: config.repo,
        branch,
        message: "experiment commit",
        path: "experiment.txt",
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
    name: "App using API: create file (random author & commiter)",
    run: async (ctx) => {
      const { ghApp, config } = ctx;
      const octokit = await ghApp.getInstallationOctokit(
        await getInstallationId(ghApp, config.owner)
      );

      const { branch } = await createExperimentBranch(ctx, octokit);

      let content = new Date().toISOString();
      content = Buffer.from(content).toString("base64");

      const res = await octokit.rest.repos.createOrUpdateFileContents({
        owner: config.owner,
        repo: config.repo,
        branch,
        message: "experiment commit",
        path: "experiment.txt",
        content,
        author: {
          name: "Someone",
          email: "someone@example.com",
        },
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
    run: async (ctx) => {
      const { ghApp, config } = ctx;
      const octokit = await ghApp.getInstallationOctokit(
        await getInstallationId(ghApp, config.owner)
      );

      const { branch } = await createExperimentBranch(ctx, octokit);

      let content = new Date().toISOString();
      content = Buffer.from(content).toString("base64");

      const res = await octokit.rest.repos.createOrUpdateFileContents({
        owner: config.owner,
        repo: config.repo,
        branch,
        message: "experiment commit",
        path: "experiment.txt",
        content,
        author: await getPerfectMatchAuthor(octokit),
      });

      if (!res.data.commit.sha) {
        throw Error("Commit has no sha");
      }

      return res.data.commit.sha;
    },
  },
  {
    name: "App using API: create file (perfect match commiter)",
    run: async (ctx) => {
      const { ghApp, config } = ctx;
      const octokit = await ghApp.getInstallationOctokit(
        await getInstallationId(ghApp, config.owner)
      );

      const { branch } = await createExperimentBranch(ctx, octokit);

      let content = new Date().toISOString();
      content = Buffer.from(content).toString("base64");

      const res = await octokit.rest.repos.createOrUpdateFileContents({
        owner: config.owner,
        repo: config.repo,
        branch,
        message: "experiment commit",
        path: "experiment.txt",
        content,
        committer: await getPerfectMatchAuthor(octokit),
      });

      if (!res.data.commit.sha) {
        throw Error("Commit has no sha");
      }

      return res.data.commit.sha;
    },
  },
  {
    name: "App using API: create file (perfect match author & commiter)",
    run: async (ctx) => {
      const { ghApp, config } = ctx;
      const octokit = await ghApp.getInstallationOctokit(
        await getInstallationId(ghApp, config.owner)
      );

      const { branch } = await createExperimentBranch(ctx, octokit);

      let content = new Date().toISOString();
      content = Buffer.from(content).toString("base64");

      const author = await getPerfectMatchAuthor(octokit);
      const res = await octokit.rest.repos.createOrUpdateFileContents({
        owner: config.owner,
        repo: config.repo,
        branch,
        message: "experiment commit",
        path: "experiment.txt",
        content,
        author: author,
        committer: author,
      });

      if (!res.data.commit.sha) {
        throw Error("Commit has no sha");
      }

      return res.data.commit.sha;
    },
  },
];
