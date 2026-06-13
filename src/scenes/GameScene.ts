import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { NPC } from '../entities/NPC';
import { IsometricMap } from '../world/IsometricMap';
import { GameManager } from '../core/GameManager';

export class GameScene extends Phaser.Scene {
  private player!: Player;
  private npcs: NPC[] = [];
  private map!: IsometricMap;
  private gameManager!: GameManager;
  private suspicionMeterGraphics!: Phaser.GameObjects.Graphics;
  private killCounterText!: Phaser.GameObjects.Text;
  private suspicionText!: Phaser.GameObjects.Text;

  constructor() {
    super('GameScene');
  }

  create() {
    // Initialize game manager
    this.gameManager = new GameManager();

    // Create isometric map
    this.map = new IsometricMap(this, 0, 0, 50, 50);
    this.map.render();

    // Create player at center
    this.player = new Player(this, 400, 300);
    this.add.existing(this.player);

    // Create NPCs
    for (let i = 0; i < 8; i++) {
      const x = Phaser.Math.Between(100, 700);
      const y = Phaser.Math.Between(100, 500);
      const npc = new NPC(this, x, y, i);
      this.npcs.push(npc);
      this.add.existing(npc);
    }

    // Set up camera to follow player
    this.cameras.main.setBounds(0, 0, 1280, 720);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    // Create UI
    this.createUI();

    // Input handlers
    this.setupInputHandlers();

    // Game loop
    this.time.addEvent({
      delay: 100,
      callback: this.updateGame,
      callbackScope: this,
      loop: true
    });
  }

  private createUI() {
    // Suspicion meter background
    this.suspicionMeterGraphics = this.add.graphics();
    this.drawSuspicionMeter();

    // Kill counter
    this.killCounterText = this.add.text(20, 20, `KILLS: ${this.gameManager.killCount}`, {
      font: 'bold 20px Arial',
      color: '#00ff00',
      backgroundColor: '#000000',
      padding: { x: 10, y: 5 }
    });
    this.killCounterText.setScrollFactor(0);

    // Suspicion text
    this.suspicionText = this.add.text(20, 50, `SUSPICION: ${Math.round(this.gameManager.suspicion)}%`, {
      font: '16px Arial',
      color: '#ffaa00',
      backgroundColor: '#000000',
      padding: { x: 10, y: 5 }
    });
    this.suspicionText.setScrollFactor(0);

    // Target info
    const targetText = this.add.text(1260, 20, 'TARGET MARKED\n(Press E or Space to eliminate)', {
      font: '12px Arial',
      color: '#ff0000',
      backgroundColor: '#000000',
      align: 'right',
      padding: { x: 10, y: 5 }
    });
    targetText.setOrigin(1, 0);
    targetText.setScrollFactor(0);
  }

  private drawSuspicionMeter() {
    this.suspicionMeterGraphics.clear();

    const meterX = 20;
    const meterY = 80;
    const meterWidth = 200;
    const meterHeight = 20;

    // Background
    this.suspicionMeterGraphics.fillStyle(0x1a1a1a, 1);
    this.suspicionMeterGraphics.fillRect(meterX, meterY, meterWidth, meterHeight);

    // Suspicion bar
    const suspicionRatio = Math.min(this.gameManager.suspicion / 100, 1);
    const barColor = this.gameManager.suspicion > 70 ? 0xff0000 : this.gameManager.suspicion > 40 ? 0xffaa00 : 0x00ff00;
    this.suspicionMeterGraphics.fillStyle(barColor, 1);
    this.suspicionMeterGraphics.fillRect(meterX, meterY, meterWidth * suspicionRatio, meterHeight);

    // Border
    this.suspicionMeterGraphics.lineStyle(2, 0xffffff, 1);
    this.suspicionMeterGraphics.strokeRect(meterX, meterY, meterWidth, meterHeight);

    this.suspicionMeterGraphics.setScrollFactor(0);
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
    const closest = this.findClosestNPC();
    if (closest && Phaser.Math.Distance.Between(this.player.x, this.player.y, closest.x, closest.y) < 80) {
      // Kill effect
      this.cameras.main.flash(200, 255, 255, 255);
      this.gameManager.recordKill();
      closest.respawn();
      this.gameManager.assignNewTarget();
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
    // Update suspicion based on proximity to NPCs
    this.updateSuspicion();

    // Update player
    this.player.update();

    // Update NPCs
    for (const npc of this.npcs) {
      npc.update(this.player);
    }

    // Update UI
    this.killCounterText.setText(`KILLS: ${this.gameManager.killCount}`);
    this.suspicionText.setText(`SUSPICION: ${Math.round(this.gameManager.suspicion)}%`);
    this.drawSuspicionMeter();

    // Mark target
    const targetNPC = this.npcs[this.gameManager.targetIndex];
    if (targetNPC) {
      targetNPC.markAsTarget();
    }
  }

  private updateSuspicion() {
    // Suspicion increases near NPCs, decreases when blending
    const playerBlending = this.player.isBlending;
    const closestNPC = this.findClosestNPC();

    if (closestNPC) {
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, closestNPC.x, closestNPC.y);

      if (dist < 150) {
        if (playerBlending) {
          this.gameManager.changeSuspicion(-0.5);
        } else {
          this.gameManager.changeSuspicion(1);
        }
      } else {
        this.gameManager.changeSuspicion(-0.2);
      }
    } else {
      this.gameManager.changeSuspicion(-0.3);
    }
  }
}
