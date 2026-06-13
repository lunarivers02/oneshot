export interface Character {
  id: string;
  name: string;
  color: number;
  skinTone: number;
  description: string;
  ability: string;
  speed: number;
  blendModifier: number; // How well they blend (0.8 = 20% less effective)
}

export const CHARACTERS: Record<string, Character> = {
  ghost: {
    id: 'ghost',
    name: 'The Ghost',
    color: 0x888888,
    skinTone: 0xcccccc,
    description: 'Blend expert. Nearly invisible in crowds.',
    ability: 'Enhanced Blend - Suspicion rises 50% slower when blending',
    speed: 140,
    blendModifier: 0.5
  },
  shadow: {
    id: 'shadow',
    name: 'The Shadow',
    color: 0x1a1a1a,
    skinTone: 0x2a2a2a,
    description: 'Fast and lethal. Low profile.',
    ability: 'Silent Step - Movement is quieter, detection range -20%',
    speed: 160,
    blendModifier: 0.8
  },
  courier: {
    id: 'courier',
    name: 'The Courier',
    color: 0xff8800,
    skinTone: 0xdd9955,
    description: 'Quick getaway driver. Speed demon.',
    ability: 'Burst Speed - Hold Shift for 3s to trigger 30s of 1.5x speed',
    speed: 180,
    blendModifier: 1.0
  },
  dealer: {
    id: 'dealer',
    name: 'The Dealer',
    color: 0x00dd00,
    skinTone: 0x88ff88,
    description: 'Street smart. Knows the underground.',
    ability: 'Underground Routes - Can move through restricted zones',
    speed: 150,
    blendModifier: 0.9
  },
  fox: {
    id: 'fox',
    name: 'The Fox',
    color: 0xff6600,
    skinTone: 0xff8844,
    description: 'Cunning. Great at reading targets.',
    ability: 'Marked Target - See target location briefly every 15s',
    speed: 145,
    blendModifier: 0.7
  },
  viper: {
    id: 'viper',
    name: 'The Viper',
    color: 0xff0000,
    skinTone: 0xff3333,
    description: 'Aggressive. Direct approach.',
    ability: 'Aggression - Eliminations grant 10s of +50% speed',
    speed: 155,
    blendModifier: 1.1
  },
  raven: {
    id: 'raven',
    name: 'The Raven',
    color: 0x4400ff,
    skinTone: 0x8844ff,
    description: 'Mysterious. Unpredictable patterns.',
    ability: 'Evasion - Every 20s, become temporarily undetectable',
    speed: 150,
    blendModifier: 0.6
  },
  atlas: {
    id: 'atlas',
    name: 'Atlas',
    color: 0x0088ff,
    skinTone: 0x44aaff,
    description: 'Tactical. Heavy hitter.',
    ability: 'Fortitude - Take 1 free hit without revealing cover',
    speed: 130,
    blendModifier: 1.2
  }
};
