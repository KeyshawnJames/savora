---
description: Stage-check and commit the current work using Conventional Commits (no AI co-author trailer)
argument-hint: "[optional scope or message hint]"
---

Create a git commit for the current work in this repo.

Rules — follow exactly:

1. First run `git status` and `git diff` (staged + unstaged) to see what actually changed. Summarize it back to me in one or two lines before committing.
2. Write the commit message in **Conventional Commits** style: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`. Subject line imperative and under ~70 chars. Add a short body only if the change needs context.
3. **Never** add a `Co-Authored-By` trailer or any AI/Claude authorship line — this repo's commits are authored by me alone.
4. `main` is protected — never commit directly to it. If I'm on `main`, stop and tell me to branch first (`feat/…`, `fix/…`, `chore/…`).
5. Only `git add` the files relevant to this change — don't blanket-add unrelated edits. Call out anything you're leaving unstaged.
6. Show me the final message and commit. Push only if I ask.

Extra context I typed after the command (optional scope/message hint): $ARGUMENTS
