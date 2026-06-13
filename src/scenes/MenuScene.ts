// Main Menu Scene for character selection and matchmaking
import Phaser from 'phaser';
import { CHARACTERS } from '../entities/Characters';

export class MenuScene extends Phaser.Scene {
  private selectedCharacterIndex = 0;
  private characterCards: Phaser.GameObjects.Graphics[] = [];
  private characterNames: Phaser.GameObjects.Text[] = [];
  private characterDescriptions: Phaser.GameObjects.Text[] = [];

  constructor() {
    super('MenuScene');
  }

  create() {
    // Background
    this.cameras.main.setBackgroundColor('#0a0e27');

    // Title
    const title = this.add.text(640, 60, 'ONE SHOT', {
      font: 'bold 48px Arial',
      color: '#ff0000',
      align: 'center'
    });
    title.setOrigin(0.5);

    const subtitle = this.add.text(640, 110, 'MULTIPLAYER HITMAN GAME', {
      font: '16px Arial',
      color: '#ffaa00',
      align: 'center'
    });
    subtitle.setOrigin(0.5);

    // Character selection
    const selectText = this.add.text(640, 150, 'SELECT YOUR CHARACTER', {
      font: 'bold 18px Arial',
      color: '#00ff00',
      align: 'center'
    });
    selectText.setOrigin(0.5);

    // Character carousel
    this.createCharacterCarousel();

    // Play button
    const playBtn = this.add.rectangle(640, 600, 200, 50, 0x00ff00);
    playBtn.setInteractive({ useHandCursor: true });
    playBtn.on('pointerdown', () => this.startGame());
    playBtn.on('pointerover', () => playBtn.setFillStyle(0x00dd00));
    playBtn.on('pointerout', () => playBtn.setFillStyle(0x00ff00));

    const playText = this.add.text(640, 600, 'PLAY', {
      font: 'bold 20px Arial',
      color: '#000000',
      align: 'center'
    });
    playText.setOrigin(0.5);

    // Navigation hints
    const navText = this.add.text(640, 680, 'LEFT/RIGHT ARROW to browse characters', {
      font: '12px Arial',
      color: '#666666',
      align: 'center'
    });
    navText.setOrigin(0.5);

    // Keyboard navigation
    this.input.keyboard?.on('keydown-LEFT', () => this.selectPreviousCharacter());
    this.input.keyboard?.on('keydown-RIGHT', () => this.selectNextCharacter());
    this.input.keyboard?.on('keydown-SPACE', () => this.startGame());
    this.input.keyboard?.on('keydown-ENTER', () => this.startGame());
  }

  private createCharacterCarousel() {
    const characters = Object.values(CHARACTERS);
    const startX = 200;
    const spacing = 160;

    characters.forEach((char, index) => {
      const x = startX + index * spacing;

      // Character card background
      const card = this.make.graphics({ x, y: 350, add: true });
      card.fillStyle(0x1a1a1a, 1);
      card.fillRect(-70, -80, 140, 180);
      card.lineStyle(2, index === this.selectedCharacterIndex ? 0x00ff00 : 0x666666, 1);
      card.strokeRect(-70, -80, 140, 180);
      this.characterCards.push(card);

      // Character color circle
      card.fillStyle(char.color, 1);
      card.fillCircle(0, -40, 25);
      card.lineStyle(2, char.skinTone, 1);
      card.strokeCircle(0, -40, 27);

      // Character name
      const nameText = this.add.text(x, 280, char.name, {
        font: 'bold 14px Arial',
        color: '#ffaa00',
        align: 'center'
      });
      nameText.setOrigin(0.5);
      this.characterNames.push(nameText);

      // Character description (small)
      const descText = this.add.text(x, 440, char.description, {
        font: '10px Arial',
        color: '#888888',
        align: 'center',
        wordWrap: { width: 130 }
      });
      descText.setOrigin(0.5);
      this.characterDescriptions.push(descText);
    });
  }

  private selectPreviousCharacter() {
    this.updateCharacterSelection(
      (this.selectedCharacterIndex - 1 + Object.keys(CHARACTERS).length) % Object.keys(CHARACTERS).length
    );
  }

  private selectNextCharacter() {
    this.updateCharacterSelection((this.selectedCharacterIndex + 1) % Object.keys(CHARACTERS).length);
  }

  private updateCharacterSelection(index: number) {
    // Update card borders
    this.characterCards[this.selectedCharacterIndex].lineStyle(
      2,
      0x666666,
      1
    );
    this.characterCards[this.selectedCharacterIndex].strokeRect(-70, -80, 140, 180);

    this.characterCards[index].lineStyle(2, 0x00ff00, 1);
    this.characterCards[index].strokeRect(-70, -80, 140, 180);

    // Update text colors
    this.characterNames[this.selectedCharacterIndex].setColor('#ffaa00');
    this.characterNames[index].setColor('#00ff00');

    this.selectedCharacterIndex = index;
  }

  private startGame() {
    const character = Object.values(CHARACTERS)[this.selectedCharacterIndex];
    this.registry.set('selectedCharacter', character.id);
    this.scene.start('GameScene');
  }
}
