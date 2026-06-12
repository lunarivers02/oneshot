import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { MapChunkManager } from '../world/MapChunkManager';
import { NPCManager } from '../entities/NPCManager';
import { GameState } from '../core/GameState';

export class GameScene extends Phaser.Scene {
  private player!: Player;
  private mapChunkManager!: MapChunkManager;
  private npcManager!: NPCManager;
  private gameState!: GameState;
  private debugText!: Phaser.GameObjects.Text;

  constructor() {
    super('GameScene');
  }

  create() {
    // Initialize game state
    this.gameState = new GameState();

    // Initialize world systems
    this.mapChunkManager = new MapChunkManager(this);
    this.npcManager = new NPCManager(this);

    // Populate initial map chunks with NPCs
    this.mapChunkManager.generateInitialChunks();
    this.populateNPCs();

    // Create player at city center
    this.player = new Player(this, 256, 256);

    // Setup camera to follow player
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, 4096, 2048);
    this.cameras.main.setZoom(1.5);

    // Debug UI
    this.debugText = this.add.text(16, 16, '', {
      fontSize: '12px',
      color: '#00ff00',
      backgroundColor: '#000000',
      padding: { x: 8, y: 4 }
    });
    this.debugText.setScrollFactor(0);
    this.debugText.setDepth(1000);

    // Load initial chunks around player
    this.mapChunkManager.updateChunks(this.player.x, this.player.y);
  }

  update() {
    this.player.update();
    this.npcManager.updateAll();
    this.mapChunkManager.updateChunks(this.player.x, this.player.y);

    // Update debug display
    this.debugText.setText(
      `Pos: ${Math.floor(this.player.x)}, ${Math.floor(this.player.y)}\n` +
      `Suspicion: ${Math.floor(this.player.getSuspicion())}%\n` +
      `Zone: ${this.mapChunkManager.getZoneAtPosition(this.player.x, this.player.y)}\n` +
      `NPCs Loaded: ${this.npcManager.getCount()}`
    );
  }

  private populateNPCs() {
    // Add NPCs to different zones based on density
    const zones = [
      { x: 256, y: 256, count: 20, patrolRadius: 80, zone: 'downtown' },     // City center
      { x: 512, y: 300, count: 15, patrolRadius: 70, zone: 'port' },         // Port district
      { x: 200, y: 450, count: 8, patrolRadius: 60, zone: 'industrial' },    // Industrial
      { x: 1000, y: 400, count: 12, patrolRadius: 50, zone: 'suburban' },    // Suburbs
      { x: 2000, y: 300, count: 5, patrolRadius: 100, zone: 'farmland' },    // Farmland
      { x: 2500, y: 500, count: 2, patrolRadius: 200, zone: 'forest' },      // Forest
      { x: 1800, y: 100, count: 1, patrolRadius: 80, zone: 'mansion' }       // Mansion
    ];

    zones.forEach(zone => {
      for (let i = 0; i < zone.count; i++) {
        const offsetX = (Math.random() - 0.5) * zone.patrolRadius * 2;
        const offsetY = (Math.random() - 0.5) * zone.patrolRadius * 2;
        this.npcManager.createNPC(
          zone.x + offsetX,
          zone.y + offsetY,
          zone.patrolRadius,
          zone.zone
        );
      }
    });
  }

  getNPCManager(): NPCManager {
    return this.npcManager;
  }
}
