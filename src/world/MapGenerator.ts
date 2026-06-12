interface Building {
  x: number;
  y: number;
  width: number;
  height: number;
  color: number;
}

interface ChunkData {
  groundColor: number;
  buildings: Building[];
  hasRoad: boolean;
  zone: string;
}

export class MapGenerator {
  private seed = 12345; // Simple seeded random for consistency

  generateChunk(chunkX: number, chunkY: number, chunkSize: number): ChunkData {
    const zoneX = chunkX * chunkSize;

    let zone = 'countryside';
    let groundColor = 0x2a3f1a; // Dark green default
    let buildingDensity = 0;

    // Zone transitions based on X position
    if (zoneX < 512) {
      zone = 'downtown';
      groundColor = 0x1a1a2e;
      buildingDensity = 0.7;
    } else if (zoneX < 768) {
      zone = 'port';
      groundColor = 0x1a2a3e;
      buildingDensity = 0.5;
    } else if (zoneX < 1024) {
      zone = 'industrial';
      groundColor = 0x2a2a2a;
      buildingDensity = 0.6;
    } else if (zoneX < 1536) {
      zone = 'suburban';
      groundColor = 0x2a3a1a;
      buildingDensity = 0.3;
    } else if (zoneX < 1920) {
      zone = 'motorway';
      groundColor = 0x1a1a2a;
      buildingDensity = 0.1;
    } else if (zoneX < 2560) {
      zone = 'farmland';
      groundColor = 0x3a4a1a;
      buildingDensity = 0.05;
    } else if (zoneX < 3072) {
      zone = 'forest';
      groundColor = 0x1a3a1a;
      buildingDensity = 0.0;
    } else {
      zone = 'mansion';
      groundColor = 0x2a3a2a;
      buildingDensity = 0.2;
    }

    const buildings = this.generateBuildings(chunkX, chunkY, chunkSize, buildingDensity, zone);
    const hasRoad = zone === 'motorway' || zone === 'farmland';

    return {
      groundColor,
      buildings,
      hasRoad,
      zone
    };
  }

  private generateBuildings(
    chunkX: number,
    chunkY: number,
    chunkSize: number,
    density: number,
    zone: string
  ): Building[] {
    const buildings: Building[] = [];
    const rng = this.seededRandom(chunkX * 73856093 ^ chunkY * 19349663);

    const buildingCount = Math.floor(chunkSize * chunkSize * density / 2000);

    for (let i = 0; i < buildingCount; i++) {
      const x = Math.random() * chunkSize;
      const y = Math.random() * chunkSize;

      let width = 40 + Math.random() * 60;
      let height = 40 + Math.random() * 60;
      let color = 0x333333;

      // Zone-specific building styles
      if (zone === 'downtown') {
        width = 30 + Math.random() * 40;
        height = 50 + Math.random() * 100;
        color = 0x4a4a6a;
      } else if (zone === 'industrial') {
        width = 60 + Math.random() * 80;
        height = 50 + Math.random() * 80;
        color = 0x3a3a3a;
      } else if (zone === 'suburban') {
        width = 30 + Math.random() * 40;
        height = 30 + Math.random() * 40;
        color = 0x8a7a5a;
      } else if (zone === 'mansion') {
        width = 80 + Math.random() * 120;
        height = 80 + Math.random() * 120;
        color = 0x6a5a4a;
      }

      buildings.push({ x, y, width, height, color });
    }

    return buildings;
  }

  private seededRandom(seed: number): number {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }
}
