import { Octokit, type App } from "octokit";
import { ExperimentContext } from "./runner.js";

export async function getInstallationId(
  ghApp: InstanceType<typeof App>,
  owner: string
) {
  const res: number[] = [];
  await ghApp.eachInstallation(({ installation }) => {
    if (installation.account?.login === owner) {
      res.push(installation.id);
    }
  });

  if (res.length === 0) {
    throw new Error(`Could not find installation for ${owner}`);
  } else if (res.length > 1) {
    throw new Error(`Found more than one installation for ${owner}`);
  } else {
    return res[0];
  }
}

export async function createExperimentBranch(
  { config, branch }: ExperimentContext,
  octokit: Octokit
) {
  const mainBranchRes = await octokit.rest.repos.getBranch({
    owner: config.owner,
    repo: config.repo,
    branch: "main",
  });

  const res = await octokit.rest.git.createRef({
    owner: config.owner,
    repo: config.repo,
    ref: `refs/heads/${branch}`,
    sha: mainBranchRes.data.commit.sha,
  });

  return { branch, res };
}

export async function getPerfectMatchAuthor(octokit: Octokit) {
  const app = await octokit.request("GET /app");
  const name = `${app.data?.slug}[bot]`;
  const user = await octokit.rest.users.getByUsername({ username: name });

  return {
    name,
    email: `${user.data.id}+${name}@users.noreply.github.com`,
  };
}
