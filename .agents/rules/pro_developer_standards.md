---
name: pro-developer-standards
description: Enforces scalable, flexible, standard architectural practices
---

# Pro-Developer Standards

When implementing features or fixing bugs, ALWAYS adhere to the following principles:

1. **Automate Data Ingestion**: Prefer writing automated scripts (Node.js/Python) to fetch, map, and hydrate data instead of manually copy-pasting or creating static JSON files.
2. **Graceful Fallbacks**: Ensure UI components have robust loading, error, and "in preparation" states when data is missing or fetching fails.
3. **Decouple Data from Presentation**: Keep UI components modular. Move heavy data transformation or predefined static lists into separate data modules or generate them dynamically at build time (e.g. using `import.meta.glob`).
4. **Scalability**: Design arrays and lists so they can expand without requiring code changes (e.g., dynamically parsing lengths rather than hardcoding up to N).
