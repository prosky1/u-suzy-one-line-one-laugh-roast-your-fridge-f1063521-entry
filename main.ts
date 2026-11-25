// One Line, One Laugh: Roast Your Fridge
// Entrypoint for the make.fun bounty u-suzy-one-line-one-laugh-roast-your-fridge-f1063521.
// The grader runs this file with Node's type stripping, then reads /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_FOLDER = "/output";
const OUTPUT_NAME = "entry.txt";
const SHORTEST_ALLOWED = 1;
const LONGEST_ALLOWED = 200;

// The single roast line this entry submits. Kept verbatim on purpose:
// the judge compares the file contents exactly as written.
const ROAST_LINE =
  "My phone's battery percentage is a suggestion, a vibe, and a small work of fiction.";

function measureCharacters(candidate: string): number {
  // Spread iterates by code point, which is how the gate counts characters.
  return [...candidate].length;
}

function collectGateProblems(candidate: string): string[] {
  const problems: string[] = [];
  const size = measureCharacters(candidate);

  if (size < SHORTEST_ALLOWED) {
    problems.push(`entry is empty (${size} characters, minimum ${SHORTEST_ALLOWED})`);
  }
  if (size > LONGEST_ALLOWED) {
    problems.push(`entry runs long (${size} characters, maximum ${LONGEST_ALLOWED})`);
  }
  if (!/\S/.test(candidate)) {
    problems.push("entry holds nothing but whitespace");
  }
  if (candidate.includes("\n") || candidate.includes("\r")) {
    problems.push("entry must stay on a single line");
  }

  return problems;
}

function publishEntryFile(line: string): string {
  mkdirSync(OUTPUT_FOLDER, { recursive: true });
  const destination = join(OUTPUT_FOLDER, OUTPUT_NAME);
  writeFileSync(destination, line, { encoding: "utf8" });
  return destination;
}

function confirmWrittenFile(destination: string, expected: string): void {
  // Read the file back and audit what actually landed on disk, so a silent
  // encoding or truncation surprise fails here instead of at the gate.
  const landed = readFileSync(destination, { encoding: "utf8" });
  const problems = collectGateProblems(landed);
  if (problems.length > 0) {
    throw new Error(`written entry failed re-check: ${problems.join("; ")}`);
  }
  if (landed !== expected) {
    throw new Error("written entry differs from the intended roast line");
  }
}

function runEntrypoint(): void {
  const problems = collectGateProblems(ROAST_LINE);
  if (problems.length > 0) {
    throw new Error(`roast line rejected before writing: ${problems.join("; ")}`);
  }
  const writtenTo = publishEntryFile(ROAST_LINE);
  confirmWrittenFile(writtenTo, ROAST_LINE);
  const byteSize = Buffer.byteLength(ROAST_LINE, "utf8");
  console.log(
    `wrote ${measureCharacters(ROAST_LINE)} characters (${byteSize} bytes) to ${writtenTo}`,
  );
}

runEntrypoint();
