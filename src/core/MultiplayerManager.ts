import io from 'socket.io-client';

export class MultiplayerManager {
  private socket: any;
  private connected = false;
  private playerId: string = '';
  private players: Map<string, any> = new Map();
  private listeners: Map<string, Function[]> = new Map();

  async connect(serverUrl: string = 'http://localhost:3001') {
    return new Promise((resolve, reject) => {
      this.socket = io(serverUrl, {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5
      });

      this.socket.on('connect', () => {
        this.connected = true;
        console.log('Connected to server');
        resolve(true);
      });

      this.socket.on('disconnect', () => {
        this.connected = false;
        console.log('Disconnected from server');
      });

      this.socket.on('error', (error: any) => {
        console.error('Socket error:', error);
        reject(error);
      });

      this.socket.on('player-joined', (player: any) => {
        this.players.set(player.id, player);
        this.emit('player-joined', player);
      });

      this.socket.on('player-moved', (data: any) => {
        this.emit('player-moved', data);
      });

      this.socket.on('player-eliminated', (data: any) => {
        this.emit('player-eliminated', data);
      });

      this.socket.on('match-started', (data: any) => {
        this.emit('match-started', data);
      });

      this.socket.on('match-ended', (data: any) => {
        this.emit('match-ended', data);
      });
    });
  }

  joinMatch(username: string, character: string): Promise<any> {
    return new Promise((resolve) => {
      this.socket.emit('join-match', { username, character }, (response: any) => {
        this.playerId = response.playerId;
        resolve(response);
      });
    });
  }

  updatePosition(x: number, y: number, zone: string) {
    if (this.connected) {
      this.socket.emit('player-update', {
        playerId: this.playerId,
        x,
        y,
        zone,
        timestamp: Date.now()
      });
    }
  }

  eliminatePlayer(targetId: string) {
    if (this.connected) {
      this.socket.emit('eliminate', {
        playerId: this.playerId,
        targetId,
        timestamp: Date.now()
      });
    }
  }

  sendChatMessage(message: string) {
    if (this.connected) {
      this.socket.emit('chat', {
        playerId: this.playerId,
        message,
        timestamp: Date.now()
      });
    }
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  private emit(event: string, data: any) {
    if (this.listeners.has(event)) {
      this.listeners.get(event)!.forEach(callback => callback(data));
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.connected = false;
    }
  }

  isConnected(): boolean {
    return this.connected;
  }
}
