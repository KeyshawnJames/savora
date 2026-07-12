---
description: Document a just-confirmed build step — update learning.md and the relevant reference doc (teaching-style rule 7)
argument-hint: "[what the step was]"
---

I just confirmed a build step works. Document it now, before moving on, per `docs/teaching-style.md` rule 7.

Do both of these:

1. **`docs/learning.md`** — add or update a terse entry that matches the file's existing style (short, log-like, not an essay). This is the "what did I learn" running log.
2. **`docs/reference/`** — if a *new* tool or concept was introduced, add or extend the long-form explainer (the "look this up when confused" version):
   - New tool → create `docs/reference/<next-number>-<tool>.md` (files are numbered in the order tools were introduced, so the folder doubles as a build timeline).
   - Update `docs/reference/README.md`'s index and any links in `docs/learning.md`.
   - Existing tool → extend its existing numbered file instead of making a new one.

Keep the voice first-person where the docs already are (per my memory: planning-doc voice). `docs/` is gitignored — nothing to commit, it's backed up via iCloud.

What the step was (I'll describe it here): $ARGUMENTS
