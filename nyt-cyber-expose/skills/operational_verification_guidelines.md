---
name: operational_verification_guidelines
description: Agent-wide rule to verify state-changing actions before reporting success.
version: 1.0.0
author: Nimmit
license: MIT
---

# Operational verification guideline

When performing any state‑changing tool action (git commit, git push, write_file, patch, delete, rename, process control, send_message, etc.) the agent must:

1. Run an appropriate verification command (e.g. `git log -1`, `git status -sb`, `cat <file>`, `process action='poll'`).
2. Ensure the command returns exit code 0 and the expected output.
3. Only after successful verification may the agent emit a success message to the user.

If verification fails, abort the narrative, report the error, and do **not** claim success.
