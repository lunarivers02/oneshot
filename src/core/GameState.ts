export class GameState {
  private matchTime: number = 0; // seconds
  private matchDuration: number = 60; // 60-second matches
  private isMatchActive: boolean = false;
  private targetId: string | null = null;
  private targetPosition: { x: number; y: number } | null = null;

  constructor() {
    this.startMatch();
  }

  startMatch() {
    this.matchTime = 0;
    this.isMatchActive = true;
    // TODO: Assign random target
  }

  endMatch() {
    this.isMatchActive = false;
  }

  updateTime(deltaTime: number) {
    if (this.isMatchActive) {
      this.matchTime += deltaTime / 1000; // Convert to seconds
      if (this.matchTime >= this.matchDuration) {
        this.endMatch();
      }
    }
  }

  getTimeRemaining(): number {
    return Math.max(0, this.matchDuration - this.matchTime);
  }

  isActive(): boolean {
    return this.isMatchActive;
  }

  setTarget(id: string, x: number, y: number) {
    this.targetId = id;
    this.targetPosition = { x, y };
  }

  getTarget() {
    return {
      id: this.targetId,
      position: this.targetPosition
    };
  }
}
