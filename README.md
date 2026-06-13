# One Shot

A multiplayer browser-based hitman game where every player is an assassin hunting one target while being hunted themselves. Built with Phaser 3 and TypeScript.

## Features

### Core Gameplay
- **Isometric 2.5D city environment** — Dynamic world with 8 distinct zones
- **Real-time predator/prey gameplay** — Stalk your target while avoiding hunters
- **60-second matches** — Quick, intense rounds
- **Blend mechanics** — Slow down to reduce suspicion and blend with NPCs
- **Character abilities** — 8 unique characters with special abilities

### Zones
1. **Downtown** — Dense urban core, neon signs, crowds, high cover
2. **Port District** — Ships, cranes, warehouses, medium density
3. **Industrial** — Factories, tight alleys, fewer NPCs
4. **Suburban** — Houses and parks, sparse crowds
5. **Motorway** — Fast, open, exposed
6. **Farmland** — Open fields, very few NPCs, nowhere to hide
7. **Forest** — Dense cover, zero visibility
8. **Mansion** — Isolated, elevated, VIP location

### Characters
- **The Ghost** — Enhanced blending, nearly invisible in crowds
- **The Shadow** — Fast and lethal, low profile
- **The Courier** — Speed demon with burst ability
- **The Dealer** — Street smart, knows underground routes
- **The Fox** — Cunning, can see target location briefly
- **The Viper** — Aggressive, speed boost after eliminations
- **The Raven** — Mysterious, temporary undetectability
- **Atlas** — Tactical heavy hitter, can take a free hit

### Visual Polish
- **Particle effects** — Kill flashes, blend pulses, suspicion warnings
- **Neon aesthetics** — Noir color palette with amber and blue lights
- **Dynamic UI** — Real-time HUD with suspicion meter, kill counter, zone info
- **Match timer** — 60-second countdown with visual urgency
- **Weather effects** — Rain, fog overlays per zone

## Development Setup

### Requirements
- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Game will open at http://localhost:3000

### Build for Production

```bash
npm run build
```

Output goes to `dist/`

## Controls

- **WASD / Arrow Keys** — Move character
- **Shift** — Blend in (slow down, reduce suspicion)
- **E / Space** — Eliminate target (when close)
- **Left/Right Arrow** — Select character (menu)
- **Space / Enter** — Start game (menu)

## Game Mechanics

### Suspicion System
- Suspicion rises when near NPCs and not blending
- Blending reduces suspicion gain by 50%
- Zone difficulty affects detection range
- Green (0-40%) → Yellow (40-70%) → Red (70-100%)

### Scoring
- **Eliminating target** — 500 points + time bonus
- **Eliminating civilian** — 100 points (risky)
- **Surviving time** — +10 points per second
- **Perfect blend** — Zone completion bonus

### Character Abilities
Each character has a unique ability:
- **Ghost**: 50% slower suspicion when blending
- **Shadow**: -20% detection range
- **Courier**: 1.5x speed for 30s (hold Shift)
- **Dealer**: Access to restricted zones
- **Fox**: See target location every 15s
- **Viper**: +50% speed for 10s after elimination
- **Raven**: 10s of undetectability every 20s
- **Atlas**: Take 1 free hit without penalty

## Architecture

```
src/
├── main.ts              # Game entry point
├── scenes/
│   ├── MenuScene.ts     # Character selection
│   └── GameScene.ts     # Main game loop
├── entities/
│   ├── Player.ts        # Player controller
│   ├── NPC.ts           # NPC behavior
│   └── Characters.ts    # Character definitions
├── world/
│   ├── WorldManager.ts  # Zone management
│   ├── IsometricMap.ts  # Isometric rendering
│   └── ZoneData.ts      # Zone configurations
├── core/
│   ├── GameManager.ts   # Game state & scoring
│   ├── PlayerProfile.ts # Player data structures
│   └── MultiplayerManager.ts # Networking
├── ui/
│   └── UIManager.ts     # HUD management
└── effects/
    └── ParticleEffects.ts # Visual effects
```

## Upcoming Features

- [ ] Multiplayer server backend (Socket.io)
- [ ] Leaderboards and seasonal rankings
- [ ] Character cosmetics and kill effects
- [ ] Map voting system
- [ ] Daily challenges
- [ ] Mobile PWA support
- [ ] Voice chat integration
- [ ] Replay system

## Technology Stack

- **Phaser 3** — Game framework
- **TypeScript** — Type-safe development
- **Vite** — Build tooling
- **Socket.io** — Real-time networking

## Performance

- Optimized for 60 FPS on modern browsers
- Lazy zone loading for memory efficiency
- Efficient particle pooling
- Minimal draw calls with graphics optimization

## License

Private project

## Contributing

This is a solo dev project. For feature requests or bug reports, open an issue.
