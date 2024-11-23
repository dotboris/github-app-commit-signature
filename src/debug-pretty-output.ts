import { printExperimentResult } from "./pretty-output.js";

const ctx = {
  config: {
    owner: "test",
    repo: "test",
  },
};

printExperimentResult(
  ctx,
  {
    name: "Normal Error",
    run: async () => "",
  },
  { type: "error", error: new Error("oops") }
);
printExperimentResult(
  ctx,
  {
    name: "String Error",
    run: async () => "",
  },
  { type: "error", error: "oops but its a string" }
);
printExperimentResult(
  ctx,
  {
    name: "Number Error",
    run: async () => "",
  },
  { type: "error", error: 42 }
);
printExperimentResult(
  ctx,
  {
    name: "Verified commit",
    run: async () => "",
  },
  {
    type: "ok",
    commit: "bogus",
    verification: { verified: true, reason: "valid" },
  }
);
printExperimentResult(
  ctx,
  {
    name: "Unverified commit",
    run: async () => "",
  },
  {
    type: "ok",
    commit: "bogus",
    verification: { verified: false, reason: "some reason" },
  }
);
printExperimentResult(
  ctx,
  {
    name: "No verification",
    run: async () => "",
  },
  { type: "ok", commit: "bogus" }
);
