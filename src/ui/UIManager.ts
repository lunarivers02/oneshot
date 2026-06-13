import Phaser from 'phaser';

export class UIManager {
  private scene: Phaser.Scene;
  private hud: Map<string, Phaser.GameObjects.GameObject> = new Map();

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  createHUD() {
    // Top-left corner: Kill counter and suspicion
    const hudBg = this.scene.add.rectangle(100, 60, 200, 120, 0x000000, 0.8);
    hudBg.setScrollFactor(0);
    this.hud.set('hudBg', hudBg);

    // Killcount
    const killText = this.scene.add.text(20, 20, 'KILLS\n0', {
      font: 'bold 24px Arial',
      color: '#00ff00',
      align: 'center'
    });
    killText.setScrollFactor(0);
    this.hud.set('killText', killText);

    // Top-center: Match timer with pulsing effect at low time
    const timerBg = this.scene.add.rectangle(640, 30, 150, 50, 0x000000, 0.8);
    timerBg.setScrollFactor(0);
    this.hud.set('timerBg', timerBg);

    const timerText = this.scene.add.text(640, 30, '60s', {
      font: 'bold 32px Arial',
      color: '#ffaa00',
      align: 'center'
    });
    timerText.setOrigin(0.5);
    timerText.setScrollFactor(0);
    this.hud.set('timerText', timerText);

    // Top-right: Zone name + difficulty indicator
    const zoneText = this.scene.add.text(1260, 20, 'DOWNTOWN\n★★★★☆', {
      font: 'bold 14px Arial',
      color: '#ff6600',
      align: 'right'
    });
    zoneText.setOrigin(1, 0);
    zoneText.setScrollFactor(0);
    this.hud.set('zoneText', zoneText);

    // Bottom-left: Suspicion bar with label
    this.createSuspicionBar();

    // Bottom-right: Controls hint
    const controlsText = this.scene.add.text(1260, 700, 'WASD/ARROWS: Move | SHIFT: Blend | E/SPACE: Eliminate', {
      font: '11px Arial',
      color: '#666666',
      align: 'right',
      backgroundColor: '#000000',
      padding: { x: 8, y: 4 }
    });
    controlsText.setOrigin(1, 1);
    controlsText.setScrollFactor(0);
    this.hud.set('controlsText', controlsText);

    // Center: Target indicator
    this.createTargetIndicator();
  }

  private createSuspicionBar() {
    // Background bar
    const barBg = this.scene.add.rectangle(120, 650, 200, 30, 0x1a1a1a, 1);
    barBg.setScrollFactor(0);
    barBg.setStrokeStyle(2, 0xffffff);
    this.hud.set('suspicionBarBg', barBg);

    // Suspicion bar (will be updated)
    const bar = this.scene.add.rectangle(120, 650, 0, 26, 0x00ff00, 1);
    bar.setScrollFactor(0);
    bar.setOrigin(0, 0.5);
    bar.setName('suspicionBar');
    this.hud.set('suspicionBar', bar);

    // Label
    const label = this.scene.add.text(20, 650, 'SUSPICION', {
      font: 'bold 12px Arial',
      color: '#ffaa00'
    });
    label.setOrigin(0, 0.5);
    label.setScrollFactor(0);
    this.hud.set('suspicionLabel', label);
  }

  private createTargetIndicator() {
    // Center compass pointing to target
    const compass = this.scene.add.circle(640, 360, 60, 0x000000, 0.6);
    compass.setScrollFactor(0);
    compass.setStrokeStyle(2, 0xff0000);
    compass.setName('targetCompass');
    this.hud.set('targetCompass', compass);

    const targetText = this.scene.add.text(640, 360, 'TARGET', {
      font: 'bold 14px Arial',
      color: '#ff0000',
      align: 'center'
    });
    targetText.setOrigin(0.5);
    targetText.setScrollFactor(0);
    this.hud.set('targetText', targetText);
  }

  updateKillCount(kills: number) {
    const text = this.hud.get('killText') as Phaser.GameObjects.Text;
    if (text) text.setText(`KILLS\n${kills}`);
  }

  updateTimer(seconds: number) {
    const text = this.hud.get('timerText') as Phaser.GameObjects.Text;
    if (text) {
      text.setText(`${seconds}s`);
      
      // Pulse at low time
      if (seconds <= 10) {
        text.setColor('#ff0000');
        if (seconds <= 5) {
          this.scene.tweens.add({
            targets: text,
            scaleX: { from: 1, to: 1.2 },
            scaleY: { from: 1, to: 1.2 },
            duration: 300,
            yoyo: true
          });
        }
      }
    }
  }

  updateSuspicion(suspicion: number) {
    const bar = this.hud.get('suspicionBar') as Phaser.GameObjects.Rectangle;
    if (bar) {
      const barWidth = (suspicion / 100) * 200;
      bar.setDisplaySize(barWidth, 26);

      // Color shift based on suspicion
      if (suspicion > 70) {
        bar.setFillStyle(0xff0000);
      } else if (suspicion > 40) {
        bar.setFillStyle(0xffaa00);
      } else {
        bar.setFillStyle(0x00ff00);
      }
    }
  }

  updateZone(zoneName: string, difficulty: number) {
    const text = this.hud.get('zoneText') as Phaser.GameObjects.Text;
    if (text) {
      const stars = '★'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
      text.setText(`${zoneName.toUpperCase()}\n${stars}`);
    }
  }

  showKillNotification(targetName: string = 'TARGET') {
    const notif = this.scene.add.text(640, 200, `${targetName} ELIMINATED`, {
      font: 'bold 28px Arial',
      color: '#ff0000',
      align: 'center',
      backgroundColor: '#000000',
      padding: { x: 20, y: 10 }
    });
    notif.setOrigin(0.5);
    notif.setScrollFactor(0);

    this.scene.tweens.add({
      targets: notif,
      y: { from: 200, to: 100 },
      alpha: { from: 1, to: 0 },
      duration: 1000,
      onComplete: () => notif.destroy()
    });
  }

  showMatchEndScreen(kills: number, points: number) {
    const bg = this.scene.add.rectangle(640, 360, 1280, 720, 0x000000, 0.9);
    bg.setScrollFactor(0);

    const title = this.scene.add.text(640, 200, 'MATCH OVER', {
      font: 'bold 48px Arial',
      color: '#ff0000',
      align: 'center'
    });
    title.setOrigin(0.5);
    title.setScrollFactor(0);

    const stats = this.scene.add.text(640, 300, `KILLS: ${kills}\nPOINTS: ${points}`, {
      font: 'bold 32px Arial',
      color: '#00ff00',
      align: 'center'
    });
    stats.setOrigin(0.5);
    stats.setScrollFactor(0);

    const restart = this.scene.add.text(640, 450, 'PRESS SPACE TO RESTART', {
      font: '18px Arial',
      color: '#ffaa00',
      align: 'center'
    });
    restart.setOrigin(0.5);
    restart.setScrollFactor(0);

    this.scene.tweens.add({
      targets: restart,
      alpha: { from: 1, to: 0.5 },
      duration: 500,
      yoyo: true,
      loop: -1
    });
  }

  destroy() {
    this.hud.forEach(obj => obj.destroy());
    this.hud.clear();
  }
}
