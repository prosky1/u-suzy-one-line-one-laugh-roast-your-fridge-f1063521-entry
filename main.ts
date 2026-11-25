import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";
const LINE =
  "My fridge hums all night like it pays rent, then serves me one sad egg and a sauce from 2023.";

function problemsIn(text: string): string[] {
  const found: string[] = [];
  if (text.length < 1 || text.length > 200) {
    found.push(`length ${text.length} outside 1..200`);
  }
  if (text.trim().length === 0) {
    found.push("text is only whitespace");
  }
  if (/[\r\n]/.test(text)) {
    found.push("text is not a single line");
  }
  return found;
}

function emit(text: string): void {
  const problems = problemsIn(text);
  if (problems.length > 0) {
    throw new Error(`entry refused: ${problems.join("; ")}`);
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, text, "utf8");
}

emit(LINE);
