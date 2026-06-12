import Phaser from 'phaser';

interface PlayerState {
  x: number;
  y: number;
  suspicion: number; // 0-100
  isBlending: boolean;
  velocity: { x: number; y: number };
}

export class Player extends Phaser.Physics.Arcade.Sprite {
  private state: PlayerState;
  private speed = 120;
  private blendSpeed = 60;
  private suspicionRate = 0.3; // per frame when not blending
  private suspicionDecayRate = 0.8; // per frame when blending
  private suspicionProximityThreshold = 100; // pixels - how close before suspicion rises
  private suspicionProximityRate = 2; // per frame per NPC in range

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, '');

    // Create player sprite
    const graphics = scene.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0xff6b6b, 1);
    graphics.fillCircle(0, 0, 8);
    graphics.generateTexture('player', 16, 16);
    graphics.destroy();

    this.setTexture('player');
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.setCollideWorldBounds(true);

    this.state = {
      x,
      y,
      suspicion: 0,
      isBlending: false,
      velocity: { x: 0, y: 0 }
    };
  }

  update() {
    this.handleInput();
    this.updateSuspicion();
    this.updatePosition();
  }

  private handleInput() {
    const keys = this.scene.input.keyboard?.createCursorKeys();
    if (!keys) return;

    this.state.velocity.x = 0;
    this.state.velocity.y = 0;

    const currentSpeed = this.state.isBlending ? this.blendSpeed : this.speed;

    if (keys.left.isDown) this.state.velocity.x = -currentSpeed;
    if (keys.right.isDown) this.state.velocity.x = currentSpeed;
    if (keys.up.isDown) this.state.velocity.y = -currentSpeed;
    if (keys.down.isDown) this.state.velocity.y = currentSpeed;

    // Shift to blend (slow down and reduce suspicion)
    this.state.isBlending = this.scene.input.keyboard?.isDown('SHIFT') || false;
  }

  private updateSuspicion() {
    if (this.state.isBlending) {
      this.state.suspicion = Math.max(0, this.state.suspicion - this.suspicionDecayRate);
    } else {
      // Moving without blending increases suspicion
      this.state.suspicion = Math.min(100, this.state.suspicion + this.suspicionRate);
    }
  }

  private updatePosition() {
    this.state.x += this.state.velocity.x;
    this.state.y += this.state.velocity.y;
    this.setPosition(this.state.x, this.state.y);
  }

  getSuspicion(): number {
    return this.state.suspicion;
  }

  getPosition(): { x: number; y: number } {
    return { x: this.state.x, y: this.state.y };
  }

  getState(): PlayerState {
    return { ...this.state };
  }
}
