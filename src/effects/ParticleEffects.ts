import Phaser from 'phaser';

export class ParticleEffects {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  killFlash(x: number, y: number) {
    // Bright white explosion
    const particles = this.scene.add.particles(0xffffff);
    const emitter = particles.createEmitter({
      x: x,
      y: y,
      speed: { min: -200, max: 200 },
      angle: { min: 0, max: 360 },
      scale: { start: 1, end: 0 },
      lifespan: 300,
      gravityY: 0
    });

    emitter.explode(20);
    this.scene.time.delayedCall(400, () => particles.destroy());
  }

  blendPulse(x: number, y: number) {
    // Subtle fade in/out
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(0x666666, 0.3);
    graphics.fillCircle(x, y, 40);

    this.scene.tweens.add({
      targets: graphics,
      alpha: { from: 0.3, to: 0 },
      duration: 500,
      onComplete: () => graphics.destroy()
    });
  }

  suspicionWarning() {
    // Screen flash when suspicion rises
    const flash = this.scene.add.rectangle(640, 360, 1280, 720, 0xff0000, 0.2);
    flash.setScrollFactor(0);

    this.scene.tweens.add({
      targets: flash,
      alpha: 0,
      duration: 300,
      onComplete: () => flash.destroy()
    });
  }

  neonGlow(x: number, y: number, color: number = 0xffaa00) {
    // Neon light glow effect
    const light = this.scene.add.circle(x, y, 80, color, 0.1);
    
    this.scene.tweens.add({
      targets: light,
      radius: { from: 80, to: 120 },
      alpha: { from: 0.1, to: 0 },
      duration: 800,
      onComplete: () => light.destroy()
    });
  }

  rainEffect() {
    // Subtle rain overlay
    const graphics = this.scene.add.graphics();
    graphics.lineStyle(1, 0x4488dd, 0.3);

    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 1280;
      const y = Math.random() * 720;
      graphics.beginPath();
      graphics.moveTo(x, y);
      graphics.lineTo(x + 2, y + 10);
      graphics.strokePath();
    }

    graphics.setScrollFactor(0);
    return graphics;
  }

  fogEffect() {
    // Fog overlay that moves slowly
    const fog = this.scene.add.rectangle(640, 360, 1280, 720, 0x001a2a, 0.3);
    fog.setScrollFactor(0);
    
    this.scene.tweens.add({
      targets: fog,
      alpha: { from: 0.2, to: 0.4 },
      duration: 3000,
      yoyo: true,
      loop: -1
    });

    return fog;
  }
}
