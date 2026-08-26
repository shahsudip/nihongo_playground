---
name: handoff
description: Automates creating a comprehensive context checkpoint when the user types "/handoff" or requests a state save for tomorrow.
---

# Handoff Workflow

Trigger this skill when the user types `/handoff`, `/save-state`, or asks you to generate a final prompt to resume work tomorrow.

## Process

1. **Analyze Current State:**
   Review the work accomplished today, the current state of the project, and any open tasks, bugs, or next steps that were discussed but not yet implemented.

2. **Generate the Handoff Artifact:**
   Create an artifact named `handoff_prompt.md` with `UserFacing: true` and `RequestFeedback: false`. 
   
   Use the exact markdown structure below for the artifact:

   ```markdown
   # Handoff Checkpoint

   *Copy the text below and paste it into our new chat tomorrow to restore my context!*

   ---

   **Context & Goal:** 
   [Brief 1-2 sentence description of the project and what we are currently trying to achieve]

   **Work Accomplished Today:**
   - [Bullet points of major tasks completed, e.g., "Built Zen-style UI for Custom Kanji Drill"]
   - [Include specific file names that were created/modified]

   **Current State:**
   - [What is running right now? e.g. "Vite dev server is working without errors"]
   - [Any known issues or warnings to be aware of]

   **Next Steps for Tomorrow:**
   1. [Specific actionable step 1]
   2. [Specific actionable step 2]
   ```

3. **Notify the User:**
   Once the artifact is created, tell the user that the handoff prompt is ready to be copied, and wish them a good rest of their day.
