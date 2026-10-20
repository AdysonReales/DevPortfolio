# PERSONA 5–INSPIRED INTERACTIVE DEVELOPER PORTFOLIO
### Operative: Adyson Reales (`@AdysonReales`) — Mapúa University

An unapologetic, cinematic, highly interactive developer portfolio inspired by the visual direction, motion graphics, interface composition, and title-screen presentation of **Persona 5**.

---

## 🎭 KEY HIGHLIGHTS & ARCHITECTURE

1. **State A: Cinematic Title Screen**
   - Faithful recreation of the Persona 5 opening graphic composition: high-contrast split, massive irregular black silhouette with embedded negative-space windows, crimson shards, and halftone dot patterns.
   - 4-phase entrance sequence (0.0s to ~3.0s) powered by GSAP timelines.
   - Staggered oversized typography with offset shadow cutouts.
   - Skippable via `[ESC]` or top-right button.
   - Direct `[ENTER]` or click to initiate infiltration.

2. **State B: Interactive Infiltration Hub & Dashboard**
   - **Missions (Projects)**: Persona-style target selection menu. Left column lists operations with angular cards and active pointer indicators; right column previews the live target dossier with stats, architecture challenges, and links.
   - **Dossier (About)**: Two-column asymmetrical character sheet featuring Mapúa University background, Phantom Thief stats (Arcana: The Chariot), and engineering philosophy.
   - **The Armory (Skills)**: RPG-style status trees without arbitrary percentage bars. Categorized by real competencies (MASTER, SPECIALIST, PROFICIENT) across Frontend, Backend & DBs, Game & Embedded Systems, and Creative Tools.
   - **Infiltrations (Experience)**: Chronological mission chapters with angular connected timeline nodes.
   - **Calling Card (Contact)**: High-impact crimson screen with direct mail client protocol dispatch and verified GitHub/itch.io links.

3. **Persona 5 Asymmetric Navigation System**
   - Slanted, rotated menu items with sharp polygonal clip-paths.
   - Keyboard support: `[ArrowUp]` / `[ArrowDown]` to cycle, `[Enter]` to confirm, `[Esc]` to return / close.
   - Screen Transition Engine: Diagonal slash wipe, red impact wipe, and layered panel sweeps with zero FOUC.
   - Browser History & URL Hash support (`#home`, `#projects`, `#about`, `#skills`, `#experience`, `#contact`).

4. **100% Original Web Audio Synthesizer**
   - Built-in audio feedback engine using the Web Audio API (oscillators + noise bursts + gain envelopes).
   - Zero copyrighted audio assets, zero external download latency.
   - Responsive cursor clicks, confirmation slashes, cancel tones, and transition swooshes.
   - Sound toggle in header (defaults to muted per browser standards).

---

## 🛠️ RUNNING THE APPLICATION

### Prerequisites
- Node.js (v18+)
- npm

### Development
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 📂 PROJECT FILE STRUCTURE

```text
src/
├── audio/
│   └── soundEngine.ts            # Web Audio API synthesizer for P5 sound FX
├── components/
│   ├── common/
│   │   ├── GithubIcon.tsx        # Inline SVG GitHub vector mark
│   │   └── HeaderBar.tsx         # Top bar with sound toggle & quick menu
│   ├── graphics/
│   │   ├── PersonaBackground.tsx # Dynamic background per screen + parallax
│   │   └── PhantomCutout.tsx     # Vector silhouette recreating the P5 title screen
│   ├── navigation/
│   │   ├── PersonaNav.tsx        # Rotated asymmetrical menu with arrow keys
│   │   └── ScreenTransition.tsx  # Multi-variant GSAP wipe transitions
│   └── screens/
│       ├── TitleScreen.tsx       # Opening sequence & title menu
│       ├── HomeScreen.tsx        # Infiltration dashboard & featured target
│       ├── ProjectsScreen.tsx    # Target mission selection & preview
│       ├── ProjectDetailModal.tsx# Comprehensive mission dossier modal
│       ├── AboutScreen.tsx       # Character profile & Mapúa background
│       ├── SkillsScreen.tsx      # The Armory RPG status trees
│       ├── ExperienceScreen.tsx  # Chronological infiltration chapters
│       └── ContactScreen.tsx     # Crimson Calling Card & mail dispatch
├── data/
│   ├── siteConfig.ts             # Profile constants, socials, arcana stats
│   ├── projects.ts               # Algomyth, Sakay Na!, SwiftBloxUI, etc.
│   ├── skills.ts                 # Frontend, Backend, Game Systems, Creative
│   └── experience.ts             # Mapúa, Game Jam, and system projects
├── styles/
│   ├── variables.css             # Colors, typography, skews, polygon cuts
│   ├── typography.css            # Comic cutouts, stencil stamps, giant titles
│   ├── p5-effects.css            # Halftone dots, stripes, cards, buttons
│   ├── layout.css                # Pure Vanilla CSS utility engine
│   └── globals.css               # Resets, scrollbars, root layout
├── types/
│   └── index.ts                  # TypeScript models and interfaces
├── App.tsx                       # Master screen stage, transition coordinator
└── main.tsx                      # Application bootstrap
```

---

## ⚙️ CUSTOMIZATION

- **Personal Information**: Edit [src/data/siteConfig.ts](file:///d:/A%20CODE%20FILES/DevPortfolio/src/data/siteConfig.ts).
- **Projects & Targets**: Edit [src/data/projects.ts](file:///d:/A%20CODE%20FILES/DevPortfolio/src/data/projects.ts).
- **Skills**: Edit [src/data/skills.ts](file:///d:/A%20CODE%20FILES/DevPortfolio/src/data/skills.ts).
- **Experience Timeline**: Edit [src/data/experience.ts](file:///d:/A%20CODE%20FILES/DevPortfolio/src/data/experience.ts).
