import Phaser from 'phaser';
import { Character, CHARACTERS } from './Characters';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private dirX = 0;
  private dirY = 0;
  private speed = 150;
  public isBlending = false;
  private scene: Phaser.Scene;
  private character: Character;
  private abilityActive = false;
  private abilityTimer = 0;

  constructor(scene: Phaser.Scene, x: number, y: number, characterId: string = 'ghost') {
    super(scene, x, y, '');
    this.scene = scene;
    this.character = CHARACTERS[characterId] || CHARACTERS['ghost'];
    this.speed = this.character.speed;

    // Create character sprite
    this.createCharacterSprite();
    this.setScale(1.5);
    this.setBounce(0);
    this.setCollideWorldBounds(true);
    this.scene.physics.add.existing(this);
  }

  private createCharacterSprite() {
    const graphics = this.scene.make.graphics({ x: 0, y: 0, add: false });
    
    // Main body
    graphics.fillStyle(this.character.color, 1);
    graphics.fillCircle(12, 12, 12);
    
    // Accent ring (character identifier)
    graphics.lineStyle(2, this.character.skinTone, 1);
    graphics.strokeCircle(12, 12, 14);
    
    graphics.generateTexture(`player_${this.character.id}`, 24, 24);
    graphics.destroy();

    this.setTexture(`player_${this.character.id}`);
  }

  setDirection(x: number, y: number) {
    this.dirX = x;
    this.dirY = y;
  }

  setBlending(blend: boolean) {
    if (this.isBlending === blend) return;
    this.isBlending = blend;
    
    if (blend) {
      // Apply blend effect
      this.setAlpha(0.6);
      this.setTint(0x666666);
    } else {
      // Remove blend effect
      this.setAlpha(1);
      this.clearTint();
    }
  }

  activateAbility() {
    if (this.abilityActive) return;
    
    this.abilityActive = true;
    this.abilityTimer = 30000; // 30s default
    
    // Apply ability based on character
    switch (this.character.id) {
      case 'courier':
        this.speed *= 1.5;
        this.setTint(0xffff00);
        break;
      case 'viper':
        this.speed *= 1.5;
        this.setTint(0xff0000);
        break;
      case 'raven':
        this.setAlpha(0.3);
        break;
    }
  }

  update() {
    // Update ability timer
    if (this.abilityActive) {
      this.abilityTimer -= 16;
      if (this.abilityTimer <= 0) {
        this.deactivateAbility();
      }
    }

    const blendSpeed = this.character.speed * 0.5;
    const currentSpeed = this.isBlending ? blendSpeed : this.speed;

    if (this.dirX !== 0 || this.dirY !== 0) {
      let magnitude = Math.sqrt(this.dirX * this.dirX + this.dirY * this.dirY);
      const velX = (this.dirX / magnitude) * currentSpeed;
      const velY = (this.dirY / magnitude) * currentSpeed;
      this.setVelocity(velX, velY);
    } else {
      this.setVelocity(0, 0);
    }
  }

  private deactivateAbility() {
    this.abilityActive = false;
    this.speed = this.character.speed;
    this.clearTint();
    this.setAlpha(1);
  }

  getCharacter(): Character {
    return this.character;
  }
}
