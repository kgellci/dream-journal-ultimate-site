---
description: Standard Operating Procedure for adding a new HTML page to the Vite project
---

When adding a new HTML page (e.g., `about.html`, `press_kit.html`):

1. **Create File**: Create the file in the project root (not `public/` if it needs processing).
   - Ensure it includes the entry script: `<script type="module" src="/src/main.js"></script>`

2. **Update Config** (CRITICAL):
   - Open `vite.config.js`.
   - Locate `build.rollupOptions.input`.
   - Add the new entry: `page_name: resolve('page_name.html')`.
   - *Failure to do this will result in a 404 on deployment.*

3. **Verify Build**:
   - Run `npm run build`.
   - Check `dist/` to ensure `page_name.html` was generated.

4. **Verify Links**:
   - Ensure all `<a>` tags pointing to this page work locally and in production.
