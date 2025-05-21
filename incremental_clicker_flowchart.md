## Incremental Clicker Game Loop Flowchart

```mermaid
graph TD
    A[Start: index.html loaded] --> B{Initialization};
    B --> C{score = 0, rate = 1, clickPower = 1, prestigeLevel = 0, currentLayer = 1};
    C --> D{Get DOM elements};
    D --> E{Define passiveUpgrades array};
    E --> F{updateDisplay()};
    F --> G{populateMenus()};
    G --> H{setInterval(1000ms)};
    H --> I{score += rate};
    I --> J{updateDisplay()};
    J --> H;
    K[Click Button Clicked] --> L{score += clickPower};
    L --> M{updateDisplay()};
    N[Prestige Button Clicked] --> O{prestigeLevel++};
    O --> P{score = 0, rate = 1, clickPower = 1};
    P --> Q{updateDisplay()};
    R[Passive Menu Option Changed] --> S{Get selected upgrade};
    S --> T{score >= upgrade.cost?};
    T -- Yes --> U{score -= upgrade.cost};
    U --> V{rate += upgrade.boost};
    V --> W{updateDisplay()};
    W --> X{passiveMenu.selectedIndex = 0};
    T -- No --> X{passiveMenu.selectedIndex = 0};
    X --> R;
    K --> M;
    N --> Q;
```

This flowchart describes the game loop of the Incremental Clicker game.