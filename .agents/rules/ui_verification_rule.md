# UI Code Verification Rule
Before concluding a task where UI code or routing has been modified, you MUST actively verify that the changes actually work:
1. Check the logs of any running development server (e.g., Vite/npm run dev background tasks) for 500 errors, compilation failures, or missing imports.
2. If an import was added before the corresponding file was written (causing a server crash), you must restart the dev server to ensure a clean state.
3. Review newly modified files for obvious missing variable definitions (like `navigate` or `useState`).
Do not present the task as complete to the user until you have verified the server is running without errors.
