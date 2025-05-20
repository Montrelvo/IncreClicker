
# Incremental Clicker Webpage Plan

## 1. Project Setup
1. Create files: `index.html`, `styles.css`, and `main.js` in a project folder.
2. Link assets: In `index.html`, include `<link rel="stylesheet" href="styles.css">` in `<head>` and `<script src="main.js"></script>` before `</body>`.
3. Open dev tools: Keep the browser console open (F12) for iterative debugging.

## 2. HTML Structure
1. Score display: Add a `<div id="score">Score: 0</div>` at the top.
2. Dropdown containers: For each category (e.g. “Passive Upgrades”, “Active Clicks”), add a `<select id="passive-menu"></select>` and `<select id="active-menu"></select>`.
3. Default options: Populate each `<select>` with a placeholder `<option>` such as “Choose upgrade…”.

## 3. CSS Styling
1. Basic layout: Use Flexbox or Grid to align the score display above the dropdowns.
2. Dropdown appearance: Style `<select>` and `<option>` for readability (padding, font-size).
3. Hover/focus: Add simple hover/focus states to highlight interactive elements.

## 4. JavaScript Logic

### 4.1 Score State
- Declare `let score = 0;` and `let rate = 1;` at the top of `main.js`.
- Create a function `updateDisplay()` that sets `document.getElementById('score').textContent = 'Score: ' + Math.floor(score);`.

### 4.2 Game Loop
- Use `setInterval()` to add `rate` to `score` every second:

  ```js
  setInterval(() => {
    score += rate;
    updateDisplay();
  }, 1000);
  ```

## 5. Building Dropdown Menus
1. Data structures: Define arrays of upgrade objects, e.g.
   ```js
   const passiveUpgrades = [
     { name: 'Auto-Clicker', cost: 50, boost: 1 },
     { name: 'Team of Miners', cost: 200, boost: 5 },
   ];
   ```
2. Populate menus: Loop through each array and create `<option>` elements:
   ```js
   passiveUpgrades.forEach((upg, i) => {
     const opt = new Option(\`\${upg.name} (+\${upg.boost}/s) - \${upg.cost}\`, i);
     document.getElementById('passive-menu').append(opt);
   });
   ```

## 6. Handling Upgrades
1. Event listeners:
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
2. Active click bonus: Similarly populate “Active” menu with click-power upgrades and deduct points on purchase.

## 7. Click Actions
1. Manual clicks: Add a `<button id="click-btn">Click (+1)</button>` below the dropdowns.
2. Click handler:
   ```js
   document.getElementById('click-btn').addEventListener('click', () => {
     score += clickPower;
     updateDisplay();
   });
   ```
3. Click upgrades: Include click-power enhancements in the “Active” dropdown that multiply `clickPower`.

## 8. Integration & State Management
1. Consolidate state: Keep `score`, `rate`, and `clickPower` as global variables and always call `updateDisplay()` after any change.
2. Disable options: Optionally gray out `<option>` elements when `score < cost` for UX clarity (re-populate menus or toggle `disabled` flags).

## 9. Testing & Debugging
1. Console logs: Sprinkle `console.log()` in event handlers to verify values.
2. Edge cases: Attempt purchases with insufficient score, rapid clicks, and page reload persistence tests.
3. Browser compatibility: Ensure `setInterval`, `addEventListener`, and `<select>` work across major browsers.

## 10. Deployment & Enhancements
1. Local server: Host via `live-server`, GitHub Pages, or any static host.
2. Persist data: Use `localStorage` to save `score`, `rate`, and `clickPower` on unload and load on startup.
3. Polish UI: Animate score changes, add sound effects, and refine dropdown interactions for a polished feel.
