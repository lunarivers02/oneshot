export interface PlayerProfile {
  userId: string;
  username: string;
  selectedCharacter: string;
  level: number;
  totalMatches: number;
  wins: number;
  totalKills: number;
  bestKillStreak: number;
  unlockedCharacters: string[];
  cosmetics: {
    eliminationEffects: string[];
    killMessages: string[];
    badges: string[];
  };
  stats: {
    totalPlaytime: number;
    averageSuspicion: number;
    blendSuccessRate: number;
    favoriteZone: string;
  };
}

export interface MatchResult {
  matchId: string;
  playerId: string;
  character: string;
  kills: number;
  points: number;
  suspicionReached: number;
  timeAlive: number;
  playerRank: number;
  timestamp: number;
}

export interface Leaderboard {
  season: number;
  entries: {
    rank: number;
    username: string;
    points: number;
    matches: number;
    winRate: number;
  }[];
}
