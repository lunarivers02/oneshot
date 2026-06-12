import Phaser from 'phaser';
import { MapGenerator } from './MapGenerator';

export class MapChunk {
  private chunkX: number;
  private chunkY: number;
  private size: number;
  private graphics: Phaser.GameObjects.Graphics;
  private scene: Phaser.Scene;
  private mapGenerator: MapGenerator;

  constructor(
    scene: Phaser.Scene,
    chunkX: number,
    chunkY: number,
    size: number,
    mapGenerator: MapGenerator
  ) {
    this.scene = scene;
    this.chunkX = chunkX;
    this.chunkY = chunkY;
    this.size = size;
    this.mapGenerator = mapGenerator;

    this.graphics = scene.make.graphics({ x: 0, y: 0, add: true });
    this.render();
  }

  private render() {
    const worldX = this.chunkX * this.size;
    const worldY = this.chunkY * this.size;

    const chunkData = this.mapGenerator.generateChunk(this.chunkX, this.chunkY, this.size);

    // Draw ground
    this.graphics.fillStyle(chunkData.groundColor, 1);
    this.graphics.fillRect(worldX, worldY, this.size, this.size);

    // Draw buildings/structures
    chunkData.buildings.forEach(building => {
      this.graphics.fillStyle(building.color, 0.8);
      this.graphics.fillRect(
        worldX + building.x,
        worldY + building.y,
        building.width,
        building.height
      );
      // Building outline
      this.graphics.lineStyle(1, 0x000000, 0.5);
      this.graphics.strokeRect(
        worldX + building.x,
        worldY + building.y,
        building.width,
        building.height
      );
    });

    // Draw roads if present
    if (chunkData.hasRoad) {
      this.graphics.lineStyle(4, 0x333333, 1);
      this.graphics.lineBetween(
        worldX,
        worldY + this.size / 2,
        worldX + this.size,
        worldY + this.size / 2
      );
    }

    // Chunk border (debug)
    this.graphics.lineStyle(1, 0x444444, 0.3);
    this.graphics.strokeRect(worldX, worldY, this.size, this.size);
  }

  destroy() {
    this.graphics.destroy();
  }
}
