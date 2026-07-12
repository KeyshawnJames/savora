---
description: Scaffold the next numbered docs/reference explainer for a new tool/concept and update the index
argument-hint: "<tool-or-concept>"
---

Create a new long-form reference doc for a tool/concept in `docs/reference/`.

Steps:

1. `ls docs/reference/` to find the highest existing number. The new file is `docs/reference/<highest+1>-<tool>.md` (kebab-case tool name).
2. Match the house style of the existing docs (e.g. `docs/reference/11-bruno.md`): a short `# Title`, then plain-language sections like **The problem**, **What it does / why**, **How it's wired up here**, and any gotchas specific to Savora's setup. Written for someone hitting the tool for the first time. First person where the existing docs are.
3. Add the new file to the **Index** in `docs/reference/README.md` under the right category (Frontend / Backend / Database / Auth / Tooling & Infra).
4. If it's worth a one-line entry in `docs/learning.md`, add that too and link it.

`docs/` is gitignored (iCloud-backed) — no commit needed.

Tool/concept to document: $ARGUMENTS
