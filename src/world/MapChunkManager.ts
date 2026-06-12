import Phaser from 'phaser';
import { MapChunk } from './MapChunk';
import { MapGenerator } from './MapGenerator';

const CHUNK_SIZE = 256; // pixels
const LOAD_DISTANCE = 3; // chunks around player

export class MapChunkManager {
  private chunks: Map<string, MapChunk> = new Map();
  private scene: Phaser.Scene;
  private lastPlayerChunkX = -1;
  private lastPlayerChunkY = -1;
  private mapGenerator: MapGenerator;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.mapGenerator = new MapGenerator();
  }

  generateInitialChunks() {
    // Generate chunks for the main playable area (city + suburbs + countryside)
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 8; y++) {
        this.loadChunk(x, y);
      }
    }
  }

  updateChunks(playerX: number, playerY: number) {
    const chunkX = Math.floor(playerX / CHUNK_SIZE);
    const chunkY = Math.floor(playerY / CHUNK_SIZE);

    if (chunkX === this.lastPlayerChunkX && chunkY === this.lastPlayerChunkY) {
      return; // No chunk change
    }

    this.lastPlayerChunkX = chunkX;
    this.lastPlayerChunkY = chunkY;

    // Load chunks in range
    for (let x = chunkX - LOAD_DISTANCE; x <= chunkX + LOAD_DISTANCE; x++) {
      for (let y = chunkY - LOAD_DISTANCE; y <= chunkY + LOAD_DISTANCE; y++) {
        const key = `${x},${y}`;
        if (!this.chunks.has(key)) {
          this.loadChunk(x, y);
        }
      }
    }
  }

  private loadChunk(chunkX: number, chunkY: number) {
    const chunk = new MapChunk(this.scene, chunkX, chunkY, CHUNK_SIZE, this.mapGenerator);
    this.chunks.set(`${chunkX},${chunkY}`, chunk);
  }

  getChunks(): MapChunk[] {
    return Array.from(this.chunks.values());
  }

  getZoneAtPosition(x: number, y: number): string {
    // Determine zone based on position in the world
    if (x < 512) return 'urban';
    if (x < 1024) return 'industrial';
    if (x < 1536) return 'suburban';
    if (x < 2560) return 'motorway';
    if (x < 3072) return 'farmland';
    if (x < 3584) return 'forest';
    if (x < 4096 && y < 512) return 'mansion';
    return 'countryside';
  }
}
