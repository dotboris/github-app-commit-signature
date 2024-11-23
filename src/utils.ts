import { Octokit, type App } from "octokit";

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
  octokit: Octokit,
  owner: string,
  repo: string
) {
  const branch = `experiments/${new Date().getTime()}`;
  const mainBranchRes = await octokit.rest.repos.getBranch({
    owner,
    repo,
    branch: "main",
  });

  const res = await octokit.rest.git.createRef({
    owner,
    repo,
    ref: `refs/heads/${branch}`,
    sha: mainBranchRes.data.commit.sha,
  });

  return { branch, res };
}
