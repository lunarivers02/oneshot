# One Shot — Development Checklist 🎯

A comprehensive roadmap for building out the multiplayer browser-based hitman game. Track progress across core systems, features, optimization, and polish.

---

## 🎮 Core Gameplay Systems

### Player & Character
- [ ] **Player Movement System**
  - [ ] WASD/Arrow key input binding
  - [ ] Isometric movement vector calculations
  - [ ] Smooth acceleration and deceleration
  - [ ] Collision detection with world objects
  - [ ] Collision detection with NPCs
  - [ ] Animation state transitions (idle, walk, run, blend)
  
- [ ] **Character Selection & Loading**
  - [ ] Character stat display in MenuScene
  - [ ] Visual previews for all 8 characters
  - [ ] Character ability descriptions
  - [ ] Load selected character into GameScene
  - [ ] Persist character choice (localStorage)
  - [ ] Quick-swap feature (arrow keys in menu)

- [ ] **Character Abilities Implementation**
  - [ ] The Ghost — 50% slower suspicion when blending
  - [ ] The Shadow — -20% detection range
  - [ ] The Courier — 1.5x speed for 30s (Shift + hold)
  - [ ] The Dealer — Access to restricted zones
  - [ ] The Fox — See target location every 15s (UI indicator)
  - [ ] The Viper — +50% speed for 10s after elimination
  - [ ] The Raven — 10s undetectability every 20s (visual effect)
  - [ ] Atlas — Take 1 free hit without penalty (damage shield)

### Targeting & Combat
- [ ] **Target Acquisition**
  - [ ] Identify assigned target at round start
  - [ ] Display target indicator/highlight
  - [ ] Track distance to target
  - [ ] Range checking for elimination (proximity-based)
  - [ ] Target elimination trigger (E/Space key)
  
- [ ] **Elimination Mechanics**
  - [ ] Kill detection with feedback
  - [ ] Eliminate target (own prey) — award 500 + time bonus
  - [ ] Eliminate civilian (wrong target) — award 100 (risky)
  - [ ] Kill flash particle effect
  - [ ] Sound effect for elimination
  - [ ] Update score/kill counter
  - [ ] Respawn or round-end handling

- [ ] **Hunter Detection & Death**
  - [ ] Detect when player gets eliminated by hunter
  - [ ] Display death notification
  - [ ] Respawn at safe zone or end round
  - [ ] Sync death state across multiplayer

### Suspicion System
- [ ] **Suspicion Mechanics**
  - [ ] Suspicion meter calculation (0-100%)
  - [ ] Suspicion rise when near unblended NPCs
  - [ ] Base detection range per zone
  - [ ] Character-specific detection modifiers
  - [ ] Blending reduces suspicion gain by 50%
  - [ ] Visual indicator (Green → Yellow → Red)
  - [ ] Audio warning at high suspicion
  
- [ ] **Blending Mechanic**
  - [ ] Shift key to toggle blend mode
  - [ ] Speed reduction while blending
  - [ ] Visual feedback (opacity change, UI indicator)
  - [ ] Ability to blend into NPC crowds
  - [ ] Unblending when moving fast
  - [ ] Ghost character bonus (50% slower rise)

---

## 🌍 World & Environment

### Isometric Map System
- [ ] **Isometric Rendering**
  - [ ] Isometric tile coordinate system
  - [ ] Camera setup for isometric view
  - [ ] Depth sorting for proper z-ordering
  - [ ] Asset loading (tiles, buildings, props)
  - [ ] Parallax scrolling for depth
  - [ ] Viewport culling for performance

### Zone System (8 Zones)
- [ ] **Downtown** — Dense urban core
  - [ ] Design tile layout (neon signs, shops, streets)
  - [ ] NPC placement (high density)
  - [ ] Cover objects (cars, street furniture)
  - [ ] Detection difficulty: Hard
  - [ ] Special features: Crowds, shops, vertical elements

- [ ] **Port District** — Ships, cranes, warehouses
  - [ ] Tile design (docks, containers, ships)
  - [ ] NPC placement (medium density)
  - [ ] Unique objects (cranes, forklifts, containers)
  - [ ] Detection difficulty: Medium
  - [ ] Special features: Water, industrial props

- [ ] **Industrial** — Factories, tight alleys
  - [ ] Tile design (factories, pipes, tanks)
  - [ ] NPC placement (sparse)
  - [ ] Limited cover areas
  - [ ] Detection difficulty: Medium-Hard
  - [ ] Special features: Tight alleys, visual clutter

- [ ] **Suburban** — Houses and parks
  - [ ] Tile design (houses, fences, gardens)
  - [ ] NPC placement (sparse)
  - [ ] Open spaces with isolated cover
  - [ ] Detection difficulty: Easy-Medium
  - [ ] Special features: Parks, residential

- [ ] **Motorway** — Fast, open, exposed
  - [ ] Tile design (road, bridges, barriers)
  - [ ] NPC placement (very sparse)
  - [ ] Minimal cover
  - [ ] Detection difficulty: Easy
  - [ ] Special features: Wide open, nowhere to hide

- [ ] **Farmland** — Open fields, nowhere to hide
  - [ ] Tile design (fields, fences, barns)
  - [ ] NPC placement (minimal)
  - [ ] Almost no cover
  - [ ] Detection difficulty: Very Easy
  - [ ] Special features: Exposed, visibility for miles

- [ ] **Forest** — Dense cover, zero visibility
  - [ ] Tile design (trees, undergrowth, rocks)
  - [ ] NPC placement (none or very few)
  - [ ] Heavy visual cover
  - [ ] Detection difficulty: Very Hard (can't see far)
  - [ ] Special features: Low visibility, natural cover

- [ ] **Mansion** — Isolated, elevated, VIP
  - [ ] Tile design (manor, gardens, walls)
  - [ ] NPC placement (high security, few civs)
  - [ ] Exclusive geometry
  - [ ] Detection difficulty: Medium
  - [ ] Special features: Prestige location, security

### NPC System
- [ ] **NPC Spawning & Behavior**
  - [ ] Spawn NPCs per zone at game start
  - [ ] Idle animation loops
  - [ ] Pathfinding (wander patterns)
  - [ ] Random walk destinations
  - [ ] Spawn/despawn for memory efficiency
  
- [ ] **NPC Detection**
  - [ ] Detection range based on zone
  - [ ] Suspicion increase proximity formula
  - [ ] Visual cone of sight (optional)
  - [ ] Blended vs. unblended detection rates
  - [ ] NPC reaction to suspicion (animation, alert state)

### Weather & Atmosphere
- [ ] **Zone Weather Effects**
  - [ ] Rain overlay effect (Downtown, Port)
  - [ ] Fog overlay effect (Forest, Motorway)
  - [ ] Lightning flashes (during storms)
  - [ ] Weather-specific audio loops
  - [ ] Particle effects (rain drops, fog)

- [ ] **Lighting & Aesthetics**
  - [ ] Neon signs (Downtown)
  - [ ] Amber and blue color palette
  - [ ] Shadows and depth
  - [ ] Zone-specific lighting moods
  - [ ] Day/night cycle (optional)

---

## 🎯 Game Loop & Mechanics

### Match System
- [ ] **Match Initialization**
  - [ ] 60-second countdown timer
  - [ ] Assign random target to each player
  - [ ] Spawn players in safe zone
  - [ ] Spawn NPCs throughout zones
  - [ ] Display initial HUD

- [ ] **Match Timer**
  - [ ] Countdown display (MM:SS format)
  - [ ] Visual urgency increase as time runs out
  - [ ] Audio warning at 10s remaining
  - [ ] Match end when timer reaches 0
  - [ ] Bonus points for remaining time

- [ ] **Scoring System**
  - [ ] Eliminate target → 500 points + time bonus
  - [ ] Eliminate civilian → 100 points (risky)
  - [ ] Survive time → +10 points per second
  - [ ] Perfect blend bonus → Zone completion
  - [ ] Kill counter display
  - [ ] Total score calculation

- [ ] **Round/Match End**
  - [ ] Detect match completion (timer or all players dead)
  - [ ] Calculate final scores
  - [ ] Display leaderboard for round
  - [ ] Option to play again
  - [ ] Save match data (for future replays)

### Multiplayer Foundations
- [ ] **Player Sync Setup** (requires backend)
  - [ ] Player position broadcasting
  - [ ] Player state synchronization (blending, abilities)
  - [ ] Kill events broadcast
  - [ ] Suspicion level sync
  - [ ] Respawn/death events

- [ ] **Network Architecture**
  - [ ] Socket.io server setup
  - [ ] Room management (matches/lobbies)
  - [ ] Message protocol definition
  - [ ] Lag compensation / client-side prediction
  - [ ] Reconnection handling

---

## 🎨 UI & User Experience

### HUD (Heads-Up Display)
- [ ] **Real-time Information Display**
  - [ ] Match timer (top center)
  - [ ] Player score (top right)
  - [ ] Kill counter (top left)
  - [ ] Suspicion meter (left side, color gradient)
  - [ ] Current zone name (bottom center)
  - [ ] Ability status indicator (bottom left)

- [ ] **Player Status Panel**
  - [ ] Current character name & icon
  - [ ] Current ability status (cooldown, ready, active)
  - [ ] Blending status indicator
  - [ ] Distance to target (optional radar)
  - [ ] Health/shield status (if taking damage)

- [ ] **Target Indicator**
  - [ ] Arrow pointing to target
  - [ ] Distance to target (meters)
  - [ ] Target silhouette or icon
  - [ ] Update in real-time as target moves

### Menu Scenes
- [ ] **Main Menu**
  - [ ] Play button → Character select
  - [ ] Settings button → Options
  - [ ] About/Credits
  - [ ] Music/theme
  - [ ] Visual polish (animations, hover effects)

- [ ] **Character Selection Menu**
  - [ ] Display all 8 characters with art
  - [ ] Character abilities/stats display
  - [ ] Preview area for selected character
  - [ ] Navigation (arrow keys or mouse)
  - [ ] Start game button
  - [ ] Back button

- [ ] **Settings Menu**
  - [ ] Volume controls (master, music, SFX)
  - [ ] Graphics quality toggle
  - [ ] Control sensitivity slider
  - [ ] Key rebinding (WASD alternatives)
  - [ ] Save settings to localStorage

### End Game UI
- [ ] **Match Results Screen**
  - [ ] Final score display
  - [ ] Ranking (1st, 2nd, etc. in multiplayer)
  - [ ] Stats summary (kills, survive time, etc.)
  - [ ] Round leaderboard (all players)
  - [ ] Play Again button
  - [ ] Menu button

- [ ] **Death Screen**
  - [ ] "You were eliminated!" message
  - [ ] Killer name (in multiplayer)
  - [ ] Respawn countdown or wait message
  - [ ] Current leaderboard snapshot

---

## ✨ Visual Effects & Polish

### Particle Effects
- [ ] **Kill Flash Effect**
  - [ ] Red/orange explosion on target elimination
  - [ ] Particle spread
  - [ ] Screen shake on critical kill
  - [ ] Audio sync

- [ ] **Blend Pulse Effect**
  - [ ] Visual indicator when blending activates
  - [ ] Pulse around player character
  - [ ] Fade effect when visibility decreases
  - [ ] Color shift (example: blue tint)

- [ ] **Suspicion Warning**
  - [ ] Pulsing red outline when suspicion is high
  - [ ] Screen edge vignette at max suspicion
  - [ ] Particle "alarm" effects

- [ ] **Zone Transition Effects**
  - [ ] Fade-in/fade-out when entering new zone
  - [ ] Zone name reveal animation
  - [ ] Ambient particle effects per zone

- [ ] **Ability Activation Effects**
  - [ ] Speed boost visual (motion blur, trails)
  - [ ] Detection boost glow
  - [ ] Shield/protection visual (for Atlas)
  - [ ] Undetectability shimmer (for Raven)

### Audio Design
- [ ] **Sound Effects Library**
  - [ ] Player footsteps (varies by zone/surface)
  - [ ] Blending activation/deactivation
  - [ ] Elimination/kill sound
  - [ ] Suspicion rise alert tones
  - [ ] Menu button clicks
  - [ ] Timer countdown beeps
  - [ ] Character ability activation sounds
  - [ ] NPC ambient sounds

- [ ] **Music**
  - [ ] Main menu theme
  - [ ] Gameplay loop (intense, adaptable)
  - [ ] Character select theme
  - [ ] End game theme
  - [ ] Zone-specific ambient music
  - [ ] Dynamic music intensity with suspicion

### Character Animations
- [ ] **Player Character States**
  - [ ] Idle (standing still)
  - [ ] Walk (slow movement)
  - [ ] Run (fast movement)
  - [ ] Blend (slowed, visual change)
  - [ ] Elimination (death animation)
  - [ ] Ability-specific poses

- [ ] **NPC Animations**
  - [ ] Idle loop
  - [ ] Wander/walk
  - [ ] Alert/suspicious state
  - [ ] Reaction to elimination nearby

---

## 🔧 Technical Systems

### Architecture & Code Quality
- [ ] **Project Structure**
  - [ ] `src/main.ts` — Game entry point
  - [ ] `src/scenes/` — MenuScene, GameScene
  - [ ] `src/entities/` — Player, NPC, Characters
  - [ ] `src/world/` — WorldManager, IsometricMap, ZoneData
  - [ ] `src/core/` — GameManager, PlayerProfile, MultiplayerManager
  - [ ] `src/ui/` — UIManager, HUD components
  - [ ] `src/effects/` — ParticleEffects, AudioManager

- [ ] **TypeScript Configuration**
  - [ ] Strict mode enabled
  - [ ] ESLint setup and rules
  - [ ] Prettier formatting
  - [ ] Build configuration (Vite)
  - [ ] Type definitions for Phaser

- [ ] **Code Organization**
  - [ ] Clear separation of concerns
  - [ ] Utility functions extracted
  - [ ] Constants file for magic numbers
  - [ ] Configuration files for game balance
  - [ ] Comments on complex logic

### Performance Optimization
- [ ] **Rendering Optimization**
  - [ ] Viewport culling (only render visible objects)
  - [ ] Object pooling for particles
  - [ ] Texture atlasing for assets
  - [ ] Lazy loading of zone assets
  - [ ] WebGL rendering confirmed

- [ ] **Memory Management**
  - [ ] Proper cleanup of zones when switching
  - [ ] Event listener removal
  - [ ] Texture caching
  - [ ] NPC pooling/recycling
  - [ ] No memory leaks in long sessions

- [ ] **FPS & Timing**
  - [ ] Maintain 60 FPS target
  - [ ] Monitor frame timing
  - [ ] Optimize hot paths (update loop)
  - [ ] Reduce garbage collection pauses
  - [ ] Test on lower-end devices

### Cross-Browser & Compatibility
- [ ] **Browser Testing**
  - [ ] Chrome/Chromium (latest)
  - [ ] Firefox (latest)
  - [ ] Safari (latest)
  - [ ] Edge (latest)
  - [ ] Mobile browsers (Chrome Mobile, Safari iOS)

- [ ] **Device Testing**
  - [ ] Desktop (1920x1080)
  - [ ] Tablet (iPad, Android)
  - [ ] Mobile (1080x1920, smaller)
  - [ ] High-DPI displays
  - [ ] Touch input handling (if supporting mobile)

---

## 🌐 Multiplayer Backend (Future)

### Server Architecture
- [ ] **Socket.io Server Setup**
  - [ ] Create Node.js + Socket.io server
  - [ ] Room creation/joining logic
  - [ ] Broadcast message handling
  - [ ] Player connection/disconnection

- [ ] **Match Management**
  - [ ] Lobby creation/listing
  - [ ] Match state management
  - [ ] Player list per match
  - [ ] Match start conditions
  - [ ] Match end & cleanup

- [ ] **Real-time Data Sync**
  - [ ] Player position updates (broadcast)
  - [ ] Kill events (broadcast + points)
  - [ ] Suspicion level sync
  - [ ] Ability activation sync
  - [ ] Respawn handling

- [ ] **Persistence (Optional)**
  - [ ] Player profiles & stats
  - [ ] Win/loss records
  - [ ] Character unlock system
  - [ ] Cosmetics inventory
  - [ ] Seasonal progression

### Networking
- [ ] **Network Protocol**
  - [ ] Define message types & payloads
  - [ ] Compression for frequent updates
  - [ ] Reliable vs. unreliable channels
  - [ ] Message queuing & ordering

- [ ] **Lag Compensation**
  - [ ] Client-side prediction
  - [ ] Server reconciliation
  - [ ] Interpolation for remote players
  - [ ] Latency compensation for abilities

- [ ] **Security & Anti-Cheat**
  - [ ] Server-side validation of kills
  - [ ] Position validation (no teleporting)
  - [ ] Ability cooldown enforcement
  - [ ] Score validation
  - [ ] Account system (login/auth)

---

## 📊 Testing & QA

### Functional Testing
- [ ] **Gameplay Systems**
  - [ ] Test each character ability
  - [ ] Test suspicion mechanics (all cases)
  - [ ] Test blending on/off
  - [ ] Test elimination (target & civilian)
  - [ ] Test scoring calculations
  - [ ] Test zone transitions

- [ ] **UI/UX Testing**
  - [ ] Menu navigation & selection
  - [ ] HUD updates in real-time
  - [ ] Control responsiveness
  - [ ] Button click detection
  - [ ] Display across resolutions

- [ ] **Multiplayer Testing** (backend ready)
  - [ ] Connect 2+ players to same match
  - [ ] Verify position sync
  - [ ] Verify kill event sync
  - [ ] Test reconnection
  - [ ] Test match end conditions

### Edge Cases & Bug Fixes
- [ ] **Edge Cases to Test**
  - [ ] Multiple eliminations at once
  - [ ] Ability use at max distance
  - [ ] Rapid ability toggling
  - [ ] Suspicion during ability use
  - [ ] Zone boundary crossing
  - [ ] NPC overlap scenarios
  - [ ] Network packet loss (multiplayer)

- [ ] **Known Issues**
  - [ ] Track and document bugs
  - [ ] Prioritize by severity
  - [ ] Regression testing

---

## 🚀 Launch & Post-Launch

### Pre-Launch Checklist
- [ ] **Build & Deployment**
  - [ ] Production build (`npm run build`)
  - [ ] Build size optimization
  - [ ] Deployment target (Vercel, Netlify, etc.)
  - [ ] Domain setup (if custom domain)
  - [ ] HTTPS enabled
  - [ ] Favicon & metadata

- [ ] **Documentation**
  - [ ] README.md (current, complete)
  - [ ] Development setup guide
  - [ ] Contribution guidelines (if open to PRs)
  - [ ] API documentation (multiplayer endpoints)
  - [ ] Asset credits & licenses

- [ ] **Pre-flight Checks**
  - [ ] All assets optimized (images, audio)
  - [ ] No console errors in release build
  - [ ] Performance profile on target devices
  - [ ] Accessibility check (keyboard, screen reader basics)
  - [ ] Mobile responsive design verified

### Day 1 Launch
- [ ] **Live Monitoring**
  - [ ] Server uptime check
  - [ ] Error logging enabled
  - [ ] Performance monitoring
  - [ ] User feedback channels open

- [ ] **Announce & Social**
  - [ ] Post on Twitter/X
  - [ ] Share in dev communities
  - [ ] Link in portfolio/GitHub
  - [ ] Collect feedback/playtesting

### Post-Launch Roadmap
- [ ] **Week 1 Hotfixes**
  - [ ] Address critical bugs
  - [ ] Balance adjustments based on feedback
  - [ ] Performance tweaks

- [ ] **Monthly Updates**
  - [ ] New cosmetics/character skins
  - [ ] Balance patches
  - [ ] Bug fixes
  - [ ] Community-requested features

- [ ] **Seasonal Content** (if multiplayer live)
  - [ ] New zones
  - [ ] Limited-time events
  - [ ] Seasonal rankings/leaderboards
  - [ ] Special abilities/items

---

## 📈 Future Features (Nice-to-Have)

- [ ] **User Accounts & Progression**
  - [ ] Authentication system
  - [ ] Player profiles & stats
  - [ ] Cosmetics shop
  - [ ] Battle pass / seasonal rewards
  - [ ] Achievements/badges

- [ ] **Advanced Gameplay**
  - [ ] Character cosmetics & skins
  - [ ] Custom kill effects
  - [ ] Map voting/selection
  - [ ] Daily challenges
  - [ ] Replay system (recording kills)

- [ ] **Social Features**
  - [ ] Leaderboards (global, friends)
  - [ ] Match history
  - [ ] Friend invites
  - [ ] Voice chat (via Twilio or WebRTC)
  - [ ] Clan/team system

- [ ] **Platforms & Accessibility**
  - [ ] Mobile PWA support
  - [ ] Native mobile apps (React Native)
  - [ ] Controller support (gamepad API)
  - [ ] Colorblind modes
  - [ ] High contrast mode
  - [ ] Screen reader optimization

- [ ] **Content & Events**
  - [ ] Seasonal events (holiday themes)
  - [ ] Limited-time game modes
  - [ ] Community tournaments
  - [ ] Streaming integration (Twitch drops)

---

## ✅ Progress Summary

Use this section to track overall completion:

| Category | Status | Completion |
|----------|--------|------------|
| **Core Gameplay** | ⬜ Not Started | 0% |
| **World & Zones** | ⬜ Not Started | 0% |
| **Game Loop** | ⬜ Not Started | 0% |
| **UI/UX** | ⬜ Not Started | 0% |
| **Visual Effects** | ⬜ Not Started | 0% |
| **Technical** | ⬜ Not Started | 0% |
| **Multiplayer** | ⬜ Not Started | 0% |
| **Testing/QA** | ⬜ Not Started | 0% |
| **Launch Prep** | ⬜ Not Started | 0% |

**Total Completion: 0%**

---

## 🎯 Next Steps

1. **Pick a starting category** — Recommend starting with **Core Gameplay Systems** (Player Movement, Character Selection, Basic Controls)
2. **Break into sprints** — Assign tasks to weekly sprints
3. **Set milestones** — (e.g., Alpha by Month 1, Beta by Month 2)
4. **Regular playtesting** — Get feedback early and often
5. **Track this checklist** — Update progress as you ship code

---

**Last Updated:** 2026-06-14  
**Project:** One Shot Multiplayer Hitman Game  
**Tech Stack:** Phaser 3, TypeScript, Vite, Socket.io
