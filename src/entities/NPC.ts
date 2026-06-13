import Phaser from 'phaser';
import { Player } from './Player';

export class NPC extends Phaser.Physics.Arcade.Sprite {
  private speed = 80;
  private scene: Phaser.Scene;
  private dirX = 0;
  private dirY = 0;
  private changeDirectionTimer = 0;
  private changeDirectionInterval = Phaser.Math.Between(1000, 3000);
  private isTarget = false;
  private targetPulse = 0;
  private originalX: number;
  private originalY: number;

  constructor(scene: Phaser.Scene, x: number, y: number, id: number) {
    super(scene, x, y, '');
    this.scene = scene;
    this.originalX = x;
    this.originalY = y;

    // Create simple NPC sprite (different colors)
    const colors = [0xff6600, 0x0066ff, 0xff0066, 0x66ff00, 0xffff00, 0x00ffff, 0xff00ff, 0xcccccc];
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(colors[id % colors.length], 1);
    graphics.fillCircle(10, 10, 10);
    graphics.generateTexture(`npc_${id}`, 20, 20);
    graphics.destroy();

    this.setTexture(`npc_${id}`);
    this.setScale(1.2);
    this.setBounce(0);
    this.setCollideWorldBounds(true);
    this.scene.physics.add.existing(this);
    
    this.randomizeDirection();
  }

  private randomizeDirection() {
    const angle = Phaser.Math.Between(0, 360) * (Math.PI / 180);
    this.dirX = Math.cos(angle);
    this.dirY = Math.sin(angle);
    this.changeDirectionTimer = 0;
  }

  update(player: Player) {
    this.changeDirectionTimer += 16;
    
    if (this.changeDirectionTimer > this.changeDirectionInterval) {
      this.randomizeDirection();
      this.changeDirectionInterval = Phaser.Math.Between(1000, 3000);
    }

    // Simple movement
    this.setVelocity(this.dirX * this.speed, this.dirY * this.speed);

    // Bounce off world bounds
    if (this.x < 20 || this.x > this.scene.game.config.width as number - 20) {
      this.dirX *= -1;
    }
    if (this.y < 20 || this.y > this.scene.game.config.height as number - 20) {
      this.dirY *= -1;
    }

    // Target pulse animation
    if (this.isTarget) {
      this.targetPulse += 0.1;
      const scale = 1.2 + Math.sin(this.targetPulse) * 0.3;
      this.setScale(scale);
    }
  }

  markAsTarget() {
    if (!this.isTarget) {
      this.isTarget = true;
      this.setTint(0xff0000);
    }
  }

  unmarkAsTarget() {
    if (this.isTarget) {
      this.isTarget = false;
      this.clearTint();
      this.targetPulse = 0;
      this.setScale(1.2);
    }
  }

  respawn() {
    this.unmarkAsTarget();
    const x = Phaser.Math.Between(100, 700);
    const y = Phaser.Math.Between(100, 500);
    this.setPosition(x, y);
    this.randomizeDirection();
  }
}
