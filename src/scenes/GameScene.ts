import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { NPC } from '../entities/NPC';
import { GameManager } from '../core/GameManager';
import { WorldManager } from '../world/WorldManager';
import { ParticleEffects } from '../effects/ParticleEffects';
import { UIManager } from '../ui/UIManager';

export class GameScene extends Phaser.Scene {
  private player!: Player;
  private npcs: NPC[] = [];
  private gameManager!: GameManager;
  private worldManager!: WorldManager;
  private particleEffects!: ParticleEffects;
  private uiManager!: UIManager;
  private matchTimer = 60;
  private matchActive = true;

  constructor() {
    super('GameScene');
  }

  create() {
    // Initialize managers
    this.gameManager = new GameManager();
    this.worldManager = new WorldManager(this);
    this.particleEffects = new ParticleEffects(this);
    this.uiManager = new UIManager(this);

    // Create UI first
    this.uiManager.createHUD();

    // Create player
    this.player = new Player(this, 640, 360);
    this.add.existing(this.player);

    // Spawn NPCs
    this.spawnNPCsForZone();

    // Set up camera
    this.cameras.main.setBounds(0, 0, 1280, 720);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    // Input handlers
    this.setupInputHandlers();

    // Game loop
    this.time.addEvent({
      delay: 100,
      callback: this.updateGame,
      callbackScope: this,
      loop: true
    });

    // Match timer
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        if (this.matchActive) {
          this.matchTimer--;
          this.uiManager.updateTimer(this.matchTimer);
          if (this.matchTimer <= 0) {
            this.endMatch();
          }
        }
      },
      callbackScope: this,
      loop: true
    });
  }

  private spawnNPCsForZone() {
    // Clear old NPCs
    this.npcs.forEach(npc => npc.destroy());
    this.npcs = [];

    const zone = this.worldManager.getCurrentZone();
    const npcCount = Math.floor(zone.npcDensity * 12); // Up to 12 NPCs

    for (let i = 0; i < npcCount; i++) {
      const x = Phaser.Math.Between(100, 1180);
      const y = Phaser.Math.Between(100, 660);
      const npc = new NPC(this, x, y, i);
      this.npcs.push(npc);
      this.add.existing(npc);
    }
  }

  private setupInputHandlers() {
    // Movement
    this.input.keyboard?.on('keydown-W', () => this.player.setDirection(0, -1));
    this.input.keyboard?.on('keydown-A', () => this.player.setDirection(-1, 0));
    this.input.keyboard?.on('keydown-S', () => this.player.setDirection(0, 1));
    this.input.keyboard?.on('keydown-D', () => this.player.setDirection(1, 0));

    this.input.keyboard?.on('keydown-UP', () => this.player.setDirection(0, -1));
    this.input.keyboard?.on('keydown-LEFT', () => this.player.setDirection(-1, 0));
    this.input.keyboard?.on('keydown-DOWN', () => this.player.setDirection(0, 1));
    this.input.keyboard?.on('keydown-RIGHT', () => this.player.setDirection(1, 0));

    // Release keys
    this.input.keyboard?.on('keyup', (event: KeyboardEvent) => {
      if (['W', 'A', 'S', 'D', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(event.key.toUpperCase())) {
        this.player.setDirection(0, 0);
      }
    });

    // Blend (Shift)
    this.input.keyboard?.on('keydown-SHIFT', () => this.player.setBlending(true));
    this.input.keyboard?.on('keyup-SHIFT', () => this.player.setBlending(false));

    // Eliminate target (Space or E)
    this.input.keyboard?.on('keydown-SPACE', () => this.attemptElimination());
    this.input.keyboard?.on('keydown-E', () => this.attemptElimination());
  }

  private attemptElimination() {
    if (!this.matchActive) return;

    const closest = this.findClosestNPC();
    if (closest && Phaser.Math.Distance.Between(this.player.x, this.player.y, closest.x, closest.y) < 80) {
      const isTarget = this.npcs.indexOf(closest) === this.gameManager.targetIndex;
      
      // Kill effect
      this.particleEffects.killFlash(closest.x, closest.y);
      this.cameras.main.shake(200, 0.02);
      
      // Update score
      this.gameManager.recordKill();
      const points = isTarget ? 100 : 50;
      this.gameManager.addPoints(points);

      // UI update
      this.uiManager.updateKillCount(this.gameManager.killCount);
      if (isTarget) {
        this.uiManager.showKillNotification('TARGET');
        this.gameManager.assignNewTarget();
      } else {
        this.uiManager.showKillNotification('NPC');
      }

      // Respawn NPC
      closest.respawn();
    }
  }

  private findClosestNPC(): NPC | null {
    let closest = null;
    let minDist = Infinity;

    for (const npc of this.npcs) {
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, npc.x, npc.y);
      if (dist < minDist) {
        minDist = dist;
        closest = npc;
      }
    }

    return closest;
  }

  private updateGame() {
    if (!this.matchActive) return;

    // Update suspicion
    this.updateSuspicion();

    // Update player
    this.player.update();

    // Update NPCs
    for (const npc of this.npcs) {
      npc.update(this.player);
    }

    // Update UI
    this.uiManager.updateSuspicion(this.gameManager.suspicion);

    // Mark target
    const targetNPC = this.npcs[this.gameManager.targetIndex % this.npcs.length];
    if (targetNPC) {
      targetNPC.markAsTarget();
    }

    // Update zone info
    const zone = this.worldManager.getCurrentZone();
    this.uiManager.updateZone(zone.name, zone.difficulty);
  }

  private updateSuspicion() {
    const playerBlending = this.player.isBlending;
    const closestNPC = this.findClosestNPC();
    const zone = this.worldManager.getCurrentZone();

    if (closestNPC) {
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, closestNPC.x, closestNPC.y);
      const detectionRange = 150 + zone.difficulty * 10;

      if (dist < detectionRange) {
        if (playerBlending) {
          this.gameManager.changeSuspicion(-0.5);
        } else {
          this.gameManager.changeSuspicion(zone.difficulty * 0.3);
        }
      } else {
        this.gameManager.changeSuspicion(-0.2);
      }
    } else {
      this.gameManager.changeSuspicion(-0.3);
    }

    // Visual warning at high suspicion
    if (this.gameManager.suspicion > 80 && Math.random() < 0.1) {
      this.particleEffects.suspicionWarning();
    }
  }

  private endMatch() {
    this.matchActive = false;
    this.input.enabled = false;
    
    const points = this.gameManager.killCount * 100 + Math.max(0, 60 - (60 - this.matchTimer)) * 10;
    this.uiManager.showMatchEndScreen(this.gameManager.killCount, points);

    // Allow restart
    this.input.keyboard?.once('keydown-SPACE', () => {
      this.scene.restart();
    });
  }
}
