import Phaser from 'phaser';

interface NPCState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  patrolRadius: number;
  patrolCenterX: number;
  patrolCenterY: number;
  changeDirectionTimer: number;
  zone: string;
}

export class NPC extends Phaser.Physics.Arcade.Sprite {
  private state: NPCState;
  private speed = 30;
  private changeDirectionInterval = 120; // frames

  constructor(scene: Phaser.Scene, x: number, y: number, patrolRadius = 100, zone = 'generic') {
    super(scene, x, y, '');

    // Create NPC sprite (different color per zone for debugging)
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
    const colors: { [key: string]: number } = {
      'downtown': 0x4488ff,
      'port': 0x44aaff,
      'industrial': 0x666666,
      'suburban': 0x88ff88,
      'farmland': 0xffcc44,
      'forest': 0x228822,
      'mansion': 0xffaaff,
      'generic': 0xcccccc
    };

    graphics.fillStyle(colors[zone] || colors['generic'], 1);
    graphics.fillCircle(0, 0, 5);
    graphics.generateTexture(`npc_${zone}`, 10, 10);
    graphics.destroy();

    this.setTexture(`npc_${zone}`);
    scene.physics.world.enable(this);
    scene.add.existing(this);

    this.state = {
      x,
      y,
      vx: (Math.random() - 0.5) * this.speed,
      vy: (Math.random() - 0.5) * this.speed,
      patrolRadius,
      patrolCenterX: x,
      patrolCenterY: y,
      changeDirectionTimer: 0,
      zone
    };
  }

  update() {
    this.state.changeDirectionTimer++;

    // Change direction occasionally
    if (this.state.changeDirectionTimer >= this.changeDirectionInterval) {
      const angle = Math.random() * Math.PI * 2;
      this.state.vx = Math.cos(angle) * this.speed;
      this.state.vy = Math.sin(angle) * this.speed;
      this.state.changeDirectionTimer = 0;
    }

    // Keep within patrol radius
    const dx = this.state.patrolCenterX - this.state.x;
    const dy = this.state.patrolCenterY - this.state.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > this.state.patrolRadius) {
      const angle = Math.atan2(dy, dx);
      this.state.vx = Math.cos(angle) * this.speed;
      this.state.vy = Math.sin(angle) * this.speed;
    }

    // Update position
    this.state.x += this.state.vx;
    this.state.y += this.state.vy;
    this.setPosition(this.state.x, this.state.y);
  }

  getState(): NPCState {
    return { ...this.state };
  }

  getZone(): string {
    return this.state.zone;
  }
}
