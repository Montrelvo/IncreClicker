# Incremental Clicker Webpage Plan

## 1. Project Setup
*   Create files: `index.html`, `styles.css`, and `main.js` in a project folder.
*   Link assets: In `index.html`, include `<link rel="stylesheet" href="styles.css">` in `<head>` and `<script src="main.js"></script>` before `</body>`.
*   Open dev tools: Keep the browser console open (F12) for iterative debugging.

## 2. HTML Structure
*   Score display: Add a `<div id="score">Score: 0</div>` at the top.
*   Dropdown containers: For each category (e.g. “Passive Upgrades”, “Active Clicks”), add a `<select id="passive-menu"></select>` and `<select id="active-menu"></select>`. Consider using multiple dropdowns for different upgrade layers.
*   Prestige button: Add a `<button id="prestige-btn">Prestige</button>` to reset the game with a bonus.
*   Default options: Populate each `<select>` with a placeholder `<option>` such as “Choose upgrade…”.

## 3. CSS Styling
*   Basic layout: Use Flexbox or Grid to align the score display above the dropdowns.
*   Dropdown appearance: Style `<select>` and `<option>` for readability (padding, font-size).
*   Hover/focus: Add simple hover/focus states to highlight interactive elements.

## 4. Visual Design & UI Elements
*   Color scheme: Choose a visually appealing color palette that fits the game's theme.
*   Typography: Select a clear and readable font for the score display, upgrade names, and other text elements.
*   Animations: Add subtle animations to score changes, button clicks, and upgrade purchases to provide visual feedback.
*   Icons: Use icons to represent different types of upgrades and resources.
*   Overall aesthetic: Ensure the UI is clean, intuitive, and engaging.

## 5. JavaScript Logic
*   **5.1 Score State:**
    *   Declare `let score = 0;`, `let rate = 1;`, and `let prestigeLevel = 0;` at the top of `main.js`.
    *   Create a function `updateDisplay()` that sets `document.getElementById('score').textContent = 'Score: ' + Math.floor(score);`.
*   **5.2 Game Loop:**
    *   Use `setInterval()` to add `rate` to `score` every second:
    ```js
    setInterval(() => {
        score += rate;
        updateDisplay();
    }, 1000);
    ```
*   **6. Building Dropdown Menus:**
    *   Data structures: Define arrays of upgrade objects, e.g.
    ```js
    const passiveUpgrades = [
        { name: 'Auto-Clicker', cost: 50, boost: 1, layer: 1 },
        { name: 'Team of Miners', cost: 200, boost: 5, layer: 1 },
    ];
    ```
    *   Populate menus: Loop through each array and create `<option>` elements, filtering by layer:
    ```js
    passiveUpgrades.forEach((upg, i) => {
        if (upg.layer === currentLayer) {
            const opt = new Option(\`\${upg.name} (+\${upg.boost}/s) - \${upg.cost}\`, i);
            document.getElementById('passive-menu').append(opt);
        }
    });
    ```
*   **7. Handling Upgrades:**
    *   Event listeners:
    ```js
    document.getElementById('passive-menu').addEventListener('change', e => {
        const upg = passiveUpgrades[e.target.value];
        if (score >= upg.cost) {
            score -= upg.cost;
            rate += upg.boost;
            updateDisplay();
        }
        e.target.selectedIndex = 0; // reset to placeholder
    });
    ```
    *   Active click bonus: Similarly populate “Active” menu with click-power upgrades and deduct points on purchase.
*   **8. Click Actions:**
    *   Manual clicks: Add a `<button id="click-btn">Click (+1)</button>` below the dropdowns.
    *   Click handler:
    ```js
    document.getElementById('click-btn').addEventListener('click', () => {
        score += clickPower;
        updateDisplay();
    });
    ```
    *   Click upgrades: Include click-power enhancements in the “Active” dropdown that multiply `clickPower`.
*   **9. Prestige System:**
    *   Add event listener to the prestige button:
    ```js
    document.getElementById('prestige-btn').addEventListener('click', () => {
        prestigeLevel++;
        score = 0;
        rate = 1;
        // Apply prestige bonus (e.g., increase rate based on prestigeLevel)
        updateDisplay();
    });
    ```
*   **10. Multiple Upgrade Layers:**
    *   Implement a system to unlock new upgrade layers based on score or prestige level.
    *   Use a variable `currentLayer` to track the currently active upgrade layer.
    *   Update the dropdown menus to display upgrades from the `currentLayer`.
*   **11. Integration & State Management:**
    *   Consolidate state: Keep `score`, `rate`, `clickPower`, `prestigeLevel`, and `currentLayer` as global variables and always call `updateDisplay()` after any change.
    *   Disable options: Optionally gray out `<option>` elements when `score < cost` for UX clarity (re-populate menus or toggle `disabled` flags).

## 6. Testing & Debugging
*   Console logs: Sprinkle `console.log()` in event handlers to verify values.
*   Edge cases: Attempt purchases with insufficient score, rapid clicks, and page reload persistence tests.
*   Browser compatibility: Ensure `setInterval`, `addEventListener`, and `<select>` work across major browsers.

## 7. Deployment & Enhancements
*   Local server: Host via `live-server`, GitHub Pages, or any static host.
*   Persist data: Use `localStorage` to save `score`, `rate`, and `clickPower` on unload and load on startup.
*   Polish UI: Animate score changes, add sound effects, and refine dropdown interactions for a polished feel.
