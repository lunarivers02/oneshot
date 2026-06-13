export class GameManager {
  public killCount = 0;
  public suspicion = 0;
  public targetIndex = 0;

  constructor() {
    this.assignNewTarget();
  }

  recordKill() {
    this.killCount++;
    this.suspicion = Math.max(0, this.suspicion - 20);
  }

  changeSuspicion(delta: number) {
    this.suspicion = Math.max(0, Math.min(100, this.suspicion + delta));
  }

  assignNewTarget() {
    this.targetIndex = Phaser.Math.Between(0, 7);
  }
}

import Phaser from 'phaser';
