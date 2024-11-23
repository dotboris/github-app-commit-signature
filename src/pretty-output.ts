import chalk from "chalk";
import { Experiment } from "./runner.js";

const STATUS_WIDTH = 6;
const padStatus = (str: string) =>
  str
    .padStart(str.length + Math.ceil((STATUS_WIDTH - str.length) / 2))
    .padEnd(STATUS_WIDTH);

export const errorStatus = chalk.white.bold.bgRedBright(padStatus("ERR"));
export const okStatus = chalk.grey.bold.bgGreenBright(padStatus("PASS"));
export const notOkStatus = chalk.white.bold.bgRed(padStatus("FAIL"));
export const unknownStatus = chalk.black.bold.bgYellowBright(padStatus("????"));

export function printExperimentResult(
  ctx: {
    config: {
      owner: string;
      repo: string;
    };
  },
  experiment: Experiment,
  result:
    | { type: "error"; error: unknown }
    | {
        type: "ok";
        commit: string;
        verification?: { verified: boolean; reason: string };
      }
) {
  const { config } = ctx;
  let reason;
  let status;
  if (result.type === "error") {
    status = errorStatus;
    if (result.error instanceof Error) {
      reason = String(result.error.stack);
    } else {
      reason = String(result.error);
    }
  } else if (result.type === "ok") {
    if (result.verification) {
      reason = result.verification.reason;
      if (result.verification.verified) {
        status = okStatus;
      } else {
        status = notOkStatus;
      }
    } else {
      status = unknownStatus;
      reason = "Commit has no verification object";
    }
  }

  console.log(`${status} ${experiment.name} -> ${reason}`);
  if (result.type === "ok") {
    const details = [
      `Web: https://github.com/${config.owner}/${config.repo}/commit/${result.commit}`,
      `Api: https://api.github.com/repos/${config.owner}/${config.repo}/commits/${result.commit}`,
    ];
    for (const detail of details) {
      console.log(`${" ".repeat(STATUS_WIDTH)} ${detail}`);
    }
  }
}
