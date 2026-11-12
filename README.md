# Midnight Carriage

A cozy pixel-art night train. Every passenger carries a word left unsaid, and the train only stops once the letter is complete.

Gather fragments of a half-written letter, listen to passengers across four seasons, watch the stations glide by outside the window, and discover **9 different endings**.

## Play

No build step and no dependencies. Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

To host it on GitHub Pages: *Settings → Pages → Deploy from branch → `main` / root*.

## Controls

| Action | How |
| --- | --- |
| Talk to a passenger | Click the passenger, click the speech box to continue |
| Collect items | Click things drifting past the window |
| Lamp, tea, radio, curtain, window | Click them in the carriage |
| Doodle on the glass | Drag on the window |
| Wave to the figure on the platform | Click them when a small station passes |
| Notebook | **Sổ** button (letter, collection, stories, endings) |
| Skip to the next station | **Tua ▸▸** button (top bar) |

## Project structure

```text
.
├── index.html            # Page shell; script load order matters
├── css/style.css         # Global styles
├── assets/favicon.svg    # Tab icon
└── src/
    ├── main.js           # Entry point and main loop
    ├── core/             # Canvas, utils, save data, runtime state
    ├── data/             # Passengers, story text, stages and palettes
    ├── gfx/              # Pixel-art sprites and passenger rendering
    ├── scene/            # Window view, seasonal scenery, scenes.js (windmill hill, paddy, lake,
    │                     # mountains, festival), platform station, interior,
    │                     # extras.js (wall letter, seasonal furniture, Mướp the cat, tunnel dark)
    ├── game/             # Decor, dialogue, collectibles, endings, update loop
    ├── input/            # Pointer handling
    ├── audio/            # Procedural Web Audio
    └── ui/               # HUD, notebook, top-bar controls
```

Each station has one fixed passenger who boards there (`pp`), and the umbrella figure waits at one station per season (`w`); the last station of each season is a quiet bridge. Each season rides its own seven stations (`SEASON_ST` in `src/data/stages.js`), and passengers change outfit and speak a different pair of opening lines per season (`PS` in `src/data/passengers.js`).

All scripts are classic `<script>` tags sharing one global scope. Keep the order in `index.html` when adding files.

## Saves

Progress is stored in `localStorage` under `toatauDem1`. The **Chơi lại** button starts a new journey but keeps unlocked endings.
