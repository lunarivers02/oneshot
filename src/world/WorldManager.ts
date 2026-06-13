import Phaser from 'phaser';
import { Zone, ZONES } from './ZoneData';

export class WorldManager {
  private currentZoneId: string = 'downtown';
  private zoneCache: Map<string, ZoneInstance> = new Map();
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.loadZone('downtown');
  }

  getCurrentZone(): Zone {
    return ZONES[this.currentZoneId];
  }

  getCurrentZoneInstance(): ZoneInstance {
    const cached = this.zoneCache.get(this.currentZoneId);
    if (!cached) {
      throw new Error(`Zone ${this.currentZoneId} not loaded`);
    }
    return cached;
  }

  loadZone(zoneId: string) {
    // Return cached zone if available
    if (this.zoneCache.has(zoneId)) {
      this.currentZoneId = zoneId;
      return;
    }

    const zone = ZONES[zoneId];
    if (!zone) {
      throw new Error(`Zone ${zoneId} not found`);
    }

    const instance = new ZoneInstance(this.scene, zone);
    this.zoneCache.set(zoneId, instance);
    this.currentZoneId = zoneId;
  }

  transitionToZone(zoneId: string, playerX: number, playerY: number) {
    const zone = ZONES[this.currentZoneId];
    if (!zone.adjacentZones.includes(zoneId)) {
      return false; // Invalid transition
    }

    this.loadZone(zoneId);
    return true;
  }

  getAdjacentZones(): string[] {
    return ZONES[this.currentZoneId].adjacentZones;
  }
}

export class ZoneInstance {
  private scene: Phaser.Scene;
  private zone: Zone;
  private graphics: Phaser.GameObjects.Graphics;
  private buildings: Building[] = [];
  private streetLights: Phaser.GameObjects.Graphics[] = [];

  constructor(scene: Phaser.Scene, zone: Zone) {
    this.scene = scene;
    this.zone = zone;
    this.graphics = scene.add.graphics();
    this.generateZone();
  }

  private generateZone() {
    switch (this.zone.type) {
      case 'urban':
        this.generateUrbanZone();
        break;
      case 'industrial':
        this.generateIndustrialZone();
        break;
      case 'suburban':
        this.generateSuburbanZone();
        break;
      case 'rural':
        this.generateRuralZone();
        break;
    }

    this.addWeatherEffects();
  }

  private generateUrbanZone() {
    // Dense buildings, neon signs, crowds
    const tileSize = 40;
    const colors = [0x1a2a5a, 0x2a3a6a, 0x1a2a4a, 0x3a4a7a];

    // Background streets
    this.graphics.fillStyle(0x0f1419, 1);
    this.graphics.fillRect(0, 0, this.zone.width * tileSize, this.zone.height * tileSize);

    // Grid of buildings
    for (let row = 0; row < this.zone.height; row += 2) {
      for (let col = 0; col < this.zone.width; col += 2) {
        if (Math.random() < 0.8) {
          const height = Phaser.Math.Between(2, 5);
          const color = colors[Math.floor(Math.random() * colors.length)];
          this.drawUrbanBuilding(col * tileSize, row * tileSize, tileSize * 2, height, color);
        }
      }
    }

    // Neon signs and street lights
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * this.zone.width * tileSize;
      const y = Math.random() * this.zone.height * tileSize;
      this.drawStreetLight(x, y);
    }
  }

  private generateIndustrialZone() {
    const tileSize = 60;
    
    // Concrete base
    this.graphics.fillStyle(0x1a1a1f, 1);
    this.graphics.fillRect(0, 0, this.zone.width * tileSize, this.zone.height * tileSize);

    // Large warehouse buildings with graffiti
    for (let row = 0; row < this.zone.height; row += 3) {
      for (let col = 0; col < this.zone.width; col += 3) {
        if (Math.random() < 0.6) {
          this.graphics.fillStyle(0x2a2a30, 1);
          this.graphics.fillRect(col * tileSize, row * tileSize, tileSize * 2, tileSize * 2);

          // Graffiti detail
          this.graphics.fillStyle(0xff6600, 0.4);
          this.graphics.fillRect(col * tileSize + 10, row * tileSize + 30, 40, 20);
        }
      }
    }

    // Factory smokestacks
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * this.zone.width * tileSize;
      const y = Math.random() * this.zone.height * tileSize;
      this.graphics.fillStyle(0x3a3a3a, 1);
      this.graphics.fillRect(x, y, 30, 150);
    }
  }

  private generateSuburbanZone() {
    const tileSize = 50;
    
    // Green grass background
    this.graphics.fillStyle(0x0a1a0a, 1);
    this.graphics.fillRect(0, 0, this.zone.width * tileSize, this.zone.height * tileSize);

    // Scattered houses
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * this.zone.width * tileSize;
      const y = Math.random() * this.zone.height * tileSize;
      this.drawHouse(x, y);
    }

    // Parks
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * this.zone.width * tileSize;
      const y = Math.random() * this.zone.height * tileSize;
      this.graphics.fillStyle(0x1a3a1a, 1);
      this.graphics.fillRect(x, y, 100, 100);
    }
  }

  private generateRuralZone() {
    const tileSize = 80;
    
    // Dark grass/field
    this.graphics.fillStyle(0x0a1a0a, 1);
    this.graphics.fillRect(0, 0, this.zone.width * tileSize, this.zone.height * tileSize);

    // Scattered trees
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * this.zone.width * tileSize;
      const y = Math.random() * this.zone.height * tileSize;
      this.graphics.fillStyle(0x0a2a0a, 1);
      this.graphics.fillCircle(x, y, 30);
    }

    // Occasional farm buildings
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * this.zone.width * tileSize;
      const y = Math.random() * this.zone.height * tileSize;
      this.graphics.fillStyle(0x4a3a2a, 1);
      this.graphics.fillRect(x, y, 60, 60);
    }
  }

  private drawUrbanBuilding(x: number, y: number, width: number, height: number, color: number) {
    // Main building
    this.graphics.fillStyle(color, 1);
    this.graphics.fillRect(x, y, width, width);

    // Windows with neon
    const windowRows = height;
    const windowCols = 4;
    for (let r = 0; r < windowRows; r++) {
      for (let c = 0; c < windowCols; c++) {
        const wx = x + c * (width / windowCols) + 5;
        const wy = y - r * 15;
        this.graphics.fillStyle(0xffaa00, Math.random() > 0.3 ? 1 : 0.3);
        this.graphics.fillRect(wx, wy, 8, 8);
      }
    }

    // Border
    this.graphics.lineStyle(2, 0xff6600, 0.3);
    this.graphics.strokeRect(x, y, width, width);
  }

  private drawHouse(x: number, y: number) {
    this.graphics.fillStyle(0x2a3a2a, 1);
    this.graphics.fillRect(x, y, 60, 60);

    // Door
    this.graphics.fillStyle(0x1a1a1a, 1);
    this.graphics.fillRect(x + 20, y + 35, 20, 25);

    // Windows
    this.graphics.fillStyle(0xffdd88, Math.random() > 0.5 ? 1 : 0.2);
    this.graphics.fillRect(x + 5, y + 10, 12, 12);
    this.graphics.fillRect(x + 43, y + 10, 12, 12);
  }

  private drawStreetLight(x: number, y: number) {
    // Pole
    this.graphics.fillStyle(0x333333, 1);
    this.graphics.fillRect(x, y, 5, 80);

    // Light glow
    this.graphics.fillStyle(0xffaa00, 0.6);
    this.graphics.fillCircle(x + 2.5, y, 60);

    // Bright center
    this.graphics.fillStyle(0xffff00, 0.8);
    this.graphics.fillCircle(x + 2.5, y, 20);
  }

  private addWeatherEffects() {
    if (this.zone.weather === 'rain') {
      // Subtle rain effect - could add particles later
    } else if (this.zone.weather === 'fog') {
      // Fog overlay
      const fogGraphics = this.scene.add.graphics();
      fogGraphics.fillStyle(0x001a2a, 0.4);
      fogGraphics.fillRect(0, 0, 1280, 720);
    }
  }

  getZoneData(): Zone {
    return this.zone;
  }

  destroy() {
    this.graphics.destroy();
    this.streetLights.forEach(light => light.destroy());
  }
}

interface Building {
  x: number;
  y: number;
  width: number;
  height: number;
}
