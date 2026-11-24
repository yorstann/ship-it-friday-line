import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "Ship It Friday" bounty:
// the funniest one-line git commit message an AI coding
// agent would write right before breaking production on a
// Friday. Pass 2: the message is split after the reckless
// trade — what was removed and what replaced it — so the
// parenthetical kicker lands last. It reads like a real
// commit log line (terse, imperative, self-incriminating)
// rather than an error report or a status update, which is
// what keeps it distinct from the sibling entries.
// buildEntryLine() is the single source of truth for the exact text;
// nothing below duplicates the message.
const ENTRY_BEATS = [
  "ship it: removed the safety check, added confidence,",
  "will fix in prod (again)",
] as const;

export function buildEntryLine(): string {
  return ENTRY_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 159;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
