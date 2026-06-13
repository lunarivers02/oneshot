export interface Zone {
  id: string;
  name: string;
  type: 'urban' | 'rural' | 'industrial' | 'suburban';
  width: number;
  height: number;
  npcDensity: number; // 0-1
  difficulty: number; // 1-5
  adjacentZones: string[];
  weather: 'clear' | 'rain' | 'fog';
  timeOfDay: 'day' | 'night' | 'dusk';
}

export const ZONES: Record<string, Zone> = {
  downtown: {
    id: 'downtown',
    name: 'Downtown Core',
    type: 'urban',
    width: 80,
    height: 80,
    npcDensity: 0.9,
    difficulty: 4,
    adjacentZones: ['industrial', 'suburban', 'port'],
    weather: 'clear',
    timeOfDay: 'night'
  },
  port: {
    id: 'port',
    name: 'Port District',
    type: 'urban',
    width: 100,
    height: 60,
    npcDensity: 0.6,
    difficulty: 3,
    adjacentZones: ['downtown', 'industrial'],
    weather: 'rain',
    timeOfDay: 'night'
  },
  industrial: {
    id: 'industrial',
    name: 'Industrial Outskirts',
    type: 'industrial',
    width: 90,
    height: 90,
    npcDensity: 0.3,
    difficulty: 3,
    adjacentZones: ['downtown', 'port', 'suburban'],
    weather: 'fog',
    timeOfDay: 'night'
  },
  suburban: {
    id: 'suburban',
    name: 'Suburban Neighborhoods',
    type: 'suburban',
    width: 100,
    height: 100,
    npcDensity: 0.4,
    difficulty: 2,
    adjacentZones: ['downtown', 'industrial', 'motorway', 'farmland'],
    weather: 'clear',
    timeOfDay: 'night'
  },
  motorway: {
    id: 'motorway',
    name: 'Motorway Interchange',
    type: 'suburban',
    width: 120,
    height: 40,
    npcDensity: 0.2,
    difficulty: 4,
    adjacentZones: ['suburban', 'farmland'],
    weather: 'clear',
    timeOfDay: 'night'
  },
  farmland: {
    id: 'farmland',
    name: 'Farmland',
    type: 'rural',
    width: 150,
    height: 150,
    npcDensity: 0.1,
    difficulty: 2,
    adjacentZones: ['suburban', 'motorway', 'forest', 'mansion'],
    weather: 'clear',
    timeOfDay: 'night'
  },
  forest: {
    id: 'forest',
    name: 'Pine Forest',
    type: 'rural',
    width: 120,
    height: 120,
    npcDensity: 0.05,
    difficulty: 1,
    adjacentZones: ['farmland', 'mansion'],
    weather: 'fog',
    timeOfDay: 'night'
  },
  mansion: {
    id: 'mansion',
    name: 'Hilltop Mansion',
    type: 'rural',
    width: 40,
    height: 40,
    npcDensity: 0.3,
    difficulty: 5,
    adjacentZones: ['farmland', 'forest'],
    weather: 'clear',
    timeOfDay: 'night'
  }
};
