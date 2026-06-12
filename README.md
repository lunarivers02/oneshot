# One Shot

A multiplayer browser-based hitman game. Every player is an assassin hunting one target while being hunted themselves.

## Features (In Development)

- **Isometric 2.5D city environment** — city center to countryside zones
- **Real-time predator/prey gameplay** — stalk your target while avoiding hunters
- **60-second matches** — quick, intense rounds
- **Blend mechanics** — slow down to reduce suspicion and blend with NPCs
- **Chunk-based world** — dynamic loading for performance
- **Procedurally generated zones** — unique atmosphere for each region

## Map Zones

1. **Downtown** — Dense urban core, neon signs, crowds, high cover
2. **Port District** — Ships, cranes, warehouses, medium density
3. **Industrial** — Factories, tight alleys, fewer NPCs
4. **Suburban** — Houses and parks, sparse crowds
5. **Motorway** — Fast, open, exposed
6. **Farmland** — Open fields, very few NPCs, nowhere to hide
7. **Forest** — Dense cover, zero visibility
8. **Mansion** — Isolated, elevated, VIP location

## Development

### Setup

```bash
npm install
npm run dev
```

Game will open at http://localhost:3000

### Controls

- **Arrow Keys** — Move
- **Shift** — Blend (slow down, reduce suspicion)

### Build

```bash
npm run build
```

## Architecture

- **Phaser 3** — Game framework
- **TypeScript** — Type-safe development
- **Chunk-based world** — Scalable level streaming
- **Local-first design** — Built for single-player, ready for networking

## Next Steps

- [ ] Isometric sprite rendering
- [ ] Target system and kill mechanics
- [ ] Suspicion proximity system (detection by nearby players)
- [ ] Match lifecycle UI
- [ ] Weather and time-of-day system
- [ ] Cosmetics and character skins
- [ ] Networking layer (matchmaking, player sync)
- [ ] Leaderboards and seasonal rewards
