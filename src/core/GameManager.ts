export class GameManager {
  public killCount = 0;
  public suspicion = 0;
  public targetIndex = 0;
  public points = 0;
  private matchStats = {
    killsOnTarget: 0,
    killsOnCivilians: 0,
    maxSuspicion: 0,
    timeBlending: 0,
    zonesVisited: new Set<string>()
  };

  constructor() {
    this.assignNewTarget();
  }

  recordKill(isTarget: boolean = false) {
    this.killCount++;
    if (isTarget) {
      this.matchStats.killsOnTarget++;
      this.points += 500;
    } else {
      this.matchStats.killsOnCivilians++;
      this.points += 100;
      // Penalty for innocent kills
      this.suspicion = Math.min(100, this.suspicion + 15);
    }
  }

  changeSuspicion(delta: number) {
    this.suspicion = Math.max(0, Math.min(100, this.suspicion + delta));
    if (this.suspicion > this.matchStats.maxSuspicion) {
      this.matchStats.maxSuspicion = this.suspicion;
    }
  }

  assignNewTarget() {
    this.targetIndex = Math.floor(Math.random() * 12);
  }

  addPoints(points: number) {
    this.points += points;
  }

  visitZone(zoneId: string) {
    this.matchStats.zonesVisited.add(zoneId);
  }

  recordBlendTime(seconds: number) {
    this.matchStats.timeBlending += seconds;
  }

  getMatchStats() {
    return {
      ...this.matchStats,
      zonesVisited: Array.from(this.matchStats.zonesVisited)
    };
  }

  reset() {
    this.killCount = 0;
    this.suspicion = 0;
    this.targetIndex = 0;
    this.points = 0;
    this.matchStats = {
      killsOnTarget: 0,
      killsOnCivilians: 0,
      maxSuspicion: 0,
      timeBlending: 0,
      zonesVisited: new Set<string>()
    };
    this.assignNewTarget();
  }
}

import Phaser from 'phaser';
