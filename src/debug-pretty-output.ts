import { printExperimentResult } from "./pretty-output.js";

printExperimentResult(
  {
    name: "Normal Error",
    run: async () => "",
  },
  { type: "error", error: new Error("oops") }
);
printExperimentResult(
  {
    name: "String Error",
    run: async () => "",
  },
  { type: "error", error: "oops but its a string" }
);
printExperimentResult(
  {
    name: "Number Error",
    run: async () => "",
  },
  { type: "error", error: 42 }
);
printExperimentResult(
  {
    name: "Verified commit",
    run: async () => "",
  },
  { type: "ok", verification: { verified: true, reason: "valid" } }
);
printExperimentResult(
  {
    name: "Unverified commit",
    run: async () => "",
  },
  { type: "ok", verification: { verified: false, reason: "some reason" } }
);
printExperimentResult(
  {
    name: "No verification",
    run: async () => "",
  },
  { type: "ok" }
);
