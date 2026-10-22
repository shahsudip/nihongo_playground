# Gemini Project Instructions

Read and follow `AGENTS.md` as the master project instruction file.

Project-local skills are stored under `.agents/skills/<skill-name>/SKILL.md`.
Before acting on a request, match the request against each skill's YAML `name` and `description` metadata. When a skill matches, read its complete `SKILL.md` and follow its instructions. Resolve referenced files relative to that skill directory.
