import Phaser from 'phaser';

export class IsometricMap {
  private scene: Phaser.Scene;
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private graphics: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.graphics = scene.add.graphics();
  }

  render() {
    this.graphics.clear();

    const tileSize = 40;
    const buildings: Array<{ x: number; y: number; height: number; color: number }> = [];

    // Generate random buildings and streets
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        const rand = Math.random();
        
        if (rand < 0.1) {
          // Tall building
          buildings.push({
            x: col,
            y: row,
            height: Phaser.Math.Between(3, 5),
            color: 0x1a2a4a
          });
        } else if (rand < 0.25) {
          // Short building
          buildings.push({
            x: col,
            y: row,
            height: 1,
            color: 0x2a3a5a
          });
        }
      }
    }

    // Draw streets first (background)
    this.graphics.fillStyle(0x0f1419, 1);
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        const screenPos = this.isometricToScreen(col, row, tileSize);
        this.drawIsometricTile(screenPos.x, screenPos.y, tileSize, 0x1a2844);
      }
    }

    // Draw buildings sorted by depth (painter's algorithm)
    buildings.sort((a, b) => (a.x + a.y) - (b.x + b.y));
    
    for (const building of buildings) {
      const screenPos = this.isometricToScreen(building.x, building.y, tileSize);
      this.drawBuilding(screenPos.x, screenPos.y, tileSize, building.height, building.color);
    }

    // Draw neon accents (windows)
    this.graphics.fillStyle(0xffaa00, 0.8);
    for (const building of buildings) {
      if (building.height > 2) {
        const screenPos = this.isometricToScreen(building.x, building.y, tileSize);
        const windowX = screenPos.x + tileSize / 4;
        const windowY = screenPos.y - building.height * 8;
        this.graphics.fillRect(windowX, windowY, 6, 6);
        this.graphics.fillRect(windowX + 8, windowY, 6, 6);
      }
    }
  }

  private isometricToScreen(col: number, row: number, tileSize: number) {
    const screenX = (col - row) * (tileSize / 2) + 400;
    const screenY = (col + row) * (tileSize / 4) + 200;
    return { x: screenX, y: screenY };
  }

  private drawIsometricTile(x: number, y: number, size: number, color: number) {
    this.graphics.fillStyle(color, 1);
    this.graphics.beginPath();
    this.graphics.moveTo(x, y + size / 4);
    this.graphics.lineTo(x + size / 2, y);
    this.graphics.lineTo(x + size, y + size / 4);
    this.graphics.lineTo(x + size / 2, y + size / 2);
    this.graphics.closePath();
    this.graphics.fillPath();

    // Street grid lines (subtle)
    this.graphics.lineStyle(1, 0x2a4a7a, 0.3);
    this.graphics.beginPath();
    this.graphics.moveTo(x, y + size / 4);
    this.graphics.lineTo(x + size / 2, y);
    this.graphics.lineTo(x + size, y + size / 4);
    this.graphics.lineTo(x + size / 2, y + size / 2);
    this.graphics.closePath();
    this.graphics.strokePath();
  }

  private drawBuilding(x: number, y: number, size: number, height: number, color: number) {
    // Draw top face
    this.graphics.fillStyle(color, 1);
    this.graphics.beginPath();
    this.graphics.moveTo(x, y + size / 4);
    this.graphics.lineTo(x + size / 2, y);
    this.graphics.lineTo(x + size, y + size / 4);
    this.graphics.lineTo(x + size / 2, y + size / 2);
    this.graphics.closePath();
    this.graphics.fillPath();

    // Draw shadow (right side)
    this.graphics.fillStyle(0x000000, 0.4);
    this.graphics.beginPath();
    this.graphics.moveTo(x + size / 2, y);
    this.graphics.lineTo(x + size, y + size / 4);
    this.graphics.lineTo(x + size, y + size / 4 + height * 8);
    this.graphics.lineTo(x + size / 2, height * 8);
    this.graphics.closePath();
    this.graphics.fillPath();

    // Draw left side
    this.graphics.fillStyle(0x000000, 0.6);
    this.graphics.beginPath();
    this.graphics.moveTo(x, y + size / 4);
    this.graphics.lineTo(x, y + size / 4 + height * 8);
    this.graphics.lineTo(x + size / 2, y + size / 2 + height * 8);
    this.graphics.lineTo(x + size / 2, y + size / 2);
    this.graphics.closePath();
    this.graphics.fillPath();

    // Draw border
    this.graphics.lineStyle(1, 0xffffff, 0.2);
    this.graphics.beginPath();
    this.graphics.moveTo(x, y + size / 4);
    this.graphics.lineTo(x + size / 2, y);
    this.graphics.lineTo(x + size, y + size / 4);
    this.graphics.lineTo(x + size / 2, y + size / 2);
    this.graphics.closePath();
    this.graphics.strokePath();
  }
}
