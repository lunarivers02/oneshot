import Phaser from 'phaser';
import { NPC } from './NPC';

export class NPCManager {
  private npcs: Map<string, NPC> = new Map();
  private scene: Phaser.Scene;
  private npcIdCounter = 0;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  createNPC(x: number, y: number, patrolRadius = 100, zone = 'generic'): NPC {
    const id = `npc_${this.npcIdCounter++}`;
    const npc = new NPC(this.scene, x, y, patrolRadius, zone);
    this.npcs.set(id, npc);
    return npc;
  }

  updateAll() {
    this.npcs.forEach(npc => npc.update());
  }

  getNPCsInArea(x: number, y: number, radius: number): NPC[] {
    const nearby: NPC[] = [];
    this.npcs.forEach(npc => {
      const state = npc.getState();
      const dx = state.x - x;
      const dy = state.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius) {
        nearby.push(npc);
      }
    });
    return nearby;
  }

  getAll(): NPC[] {
    return Array.from(this.npcs.values());
  }

  getCount(): number {
    return this.npcs.size;
  }
}
