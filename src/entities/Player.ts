import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private dirX = 0;
  private dirY = 0;
  private speed = 150;
  private blendSpeed = 75;
  public isBlending = false;
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, '');
    this.scene = scene;
    
    // Create simple player sprite (circle)
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0x00aa00, 1);
    graphics.fillCircle(12, 12, 12);
    graphics.generateTexture('player', 24, 24);
    graphics.destroy();

    this.setTexture('player');
    this.setScale(1.5);
    this.setBounce(0);
    this.setCollideWorldBounds(true);
    this.scene.physics.add.existing(this);
  }

  setDirection(x: number, y: number) {
    this.dirX = x;
    this.dirY = y;
  }

  setBlending(blend: boolean) {
    this.isBlending = blend;
    if (blend) {
      this.setTint(0x666666); // Darken when blending
    } else {
      this.clearTint();
    }
  }

  update() {
    const currentSpeed = this.isBlending ? this.blendSpeed : this.speed;
    
    if (this.dirX !== 0 || this.dirY !== 0) {
      // Normalize diagonal movement
      let magnitude = Math.sqrt(this.dirX * this.dirX + this.dirY * this.dirY);
      const velX = (this.dirX / magnitude) * currentSpeed;
      const velY = (this.dirY / magnitude) * currentSpeed;
      this.setVelocity(velX, velY);
    } else {
      this.setVelocity(0, 0);
    }
  }
}
