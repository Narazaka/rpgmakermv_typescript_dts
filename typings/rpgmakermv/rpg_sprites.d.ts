declare class Sprite_Base extends Sprite
{
    _animationSprites: Sprite_Animation[];
    _effectTarget: Sprite_Base;
    _hiding: boolean;

    visible: boolean;

    constructor();
    initialize(): void;
    update(): void;
    hide(): void;
    show(): void;
    updateVisibility(): void;
    updateAnimationSprites(): void;
    startAnimation(animation: IDataAnimation, mirror: boolean, delay: number): void;
    isAnimationPlaying(): boolean;
}

declare class Sprite_Button extends Sprite
{
    _touching: boolean;
    _coldFrame: Rectangle;
    _hotFrame: Rectangle;
    _clickHandler: Function;

    constructor();
    initialize(): void;
    update(): void;
    updateFrame(): void;
    setColdFrame(x: number, y: number, width: number, height: number): void;
    setHotFrame(x: number, y: number, width: number, height: number): void;
    setClickHandler(method: Function): void;
    callClickHandler(): void;
    processTouch(): void;
    isActive(): boolean;
    isButtonTouched(): boolean;
    canvasToLocalX(x: number): number;
    canvasToLocalY(y: number): number;
    reserveFaceImages(): void;
}

declare class Sprite_Character extends Sprite_Base
{
    _character: Game_Character;
    _balloonSprite: Sprite_Balloon;
    _balloonDuration: number;
    _tilesetId: number;
    _tileId: number;
    _characterName: string;
    _characterIndex: number;
    _upperBody: Sprite;
    _lowerBody: Sprite;
    _isBigCharacter: boolean;
    _bushDepth: number;

    constructor(character?: Game_CharacterBase);
    initialize(character?: Game_CharacterBase): void;
    initMembers(): void;
    setCharacter(character: Game_CharacterBase): void;
    update(): void;
    updateVisibility(): void;
    isTile(): boolean;
    tilesetBitmap(tileId: number): Bitmap;
    updateBitmap(): void;
    isImageChanged(): boolean;
    setTileBitmap(): void;
    setCharacterBitmap(): void;
    updateFrame(): void;
    updateTileFrame(): void;
    updateCharacterFrame(): void;
    characterBlockX(): number;
    characterBlockY(): number;
    characterPatternX(): number;
    characterPatternY(): number;
    patternWidth(): number;
    patternHeight(): number;
    updateHalfBodySprites(): void;
    createHalfBodySprites(): void;
    updatePosition(): void;
    updateAnimation(): void;
    updateOther(): void;
    setupAnimation(): void;
    setupBalloon(): void;
    startBalloon(): void;
    updateBalloon(): void;
    endBalloon(): void;
    isBalloonPlaying(): boolean;
}

declare class Sprite_Battler extends Sprite_Base
{
    _battler: Game_Battler;
    _damages: Sprite_Damage[];
    _homeX: number;
    _homeY: number;
    _offsetX: number;
    _offsetY: number;
    _targetOffsetX: number;
    _targetOffsetY: number;
    _movementDuration: number;
    _selectionEffectCount: number;

    constructor();
    initialize(battler?: Game_Battler): void;
    initMembers(): void;
    setBattler(battler: Game_Battler): void;
    setHome(x: number, y: number): void;
    update(): void;
    updateVisibility(): void;
    updateMain(): void;
    updateBitmap(): void;
    updateFrame(): void;
    updateMove(): void;
    updatePosition(): void;
    updateAnimation(): void;
    updateDamagePopup(): void;
    updateSelectionEffect(): void;
    setupAnimation(): void;
    setupDamagePopup(): void;
    damageOffsetX(): number;
    damageOffsetY(): number;
    startMove(x: number, y: number, duration: number): void;
    onMoveEnd(): void;
    isEffecting(): boolean;
    isMoving(): boolean;
    inHomePosition(): boolean;
}

declare interface IMotion
{
    index: number;
    loop: boolean;
}

declare class Sprite_Actor extends Sprite_Battler
{
    static MOTIONS: { [key: string]: IMotion };

    _battlerName: string;
    _motion: IMotion;
    _motionCount: number;
    _pattern: number;
    _mainSprite: Sprite_Base;
    _effectTarget: Sprite_Base;
    _shadowSprite: Sprite;
    _weaponSprite: Sprite_Weapon;
    _stateSprite: Sprite_StateOverlay;

    constructor();
    initialize(battler?: Game_Actor): void;
    initMembers(): void;
    createMainSprite(): void;
    createShadowSprite(): void;
    createWeaponSprite(): void;
    createStateSprite(): void;
    setBattler(battler: Game_Actor): void;
    moveToStartPosition(): void;
    setActorHome(index: number): void;
    update(): void;
    updateShadow(): void;
    updateMain(): void;
    setupMotion(): void;
    setupWeaponAnimation(): void;
    startMotion(motionType: string): void;
    updateTargetPosition(): void;
    updateBitmap(): void;
    updateFrame(): void;
    updateMove(): void;
    updateMotion(): void;
    updateMotionCount(): void;
    motionSpeed(): number;
    refreshMotion(): void;
    startEntryMotion(): void;
    stepForward(): void;
    stepBack(): void;
    retreat(): void;
    onMoveEnd(): void;
    damageOffsetX(): number;
    damageOffsetY(): number;
}

declare class Sprite_Enemy extends Sprite_Battler
{
    _enemy: Game_Enemy;
    _appeared: boolean;
    _battlerName: string;
    _battlerHue: number;
    _effectType: string;
    _effectDuration: number;
    _shake: number;
    _stateIconSprite: Sprite_StateIcon;

    constructor();
    initialize(battler?: Game_Enemy): void;
    initMembers(): void;
    createStateIconSprite(): void;
    setBattler(battler: Game_Enemy): void;
    update(): void;
    updateBitmap(): void;
    loadBitmap(name: string, hue: number): void;
    updateFrame(): void;
    updatePosition(): void;
    updateStateSprite(): void;
    initVisibility(): void;
    setupEffect(): void;
    startEffect(effectType: string): void;
    startAppear(): void;
    startDisappear(): void;
    startWhiten(): void;
    startBlink(): void;
    startCollapse(): void;
    startBossCollapse(): void;
    startInstantCollapse(): void;
    updateEffect(): void;
    isEffecting(): boolean;
    revertToNormal(): void;
    updateWhiten(): void;
    updateBlink(): void;
    updateAppear(): void;
    updateDisappear(): void;
    updateCollapse(): void;
    updateBossCollapse(): void;
    updateInstantCollapse(): void;
    damageOffsetX(): number;
    damageOffsetY(): number;
}

declare class Sprite_Animation extends Sprite
{
    _reduceArtifacts: boolean;
    _target: Sprite_Base;
    _animation: IDataAnimation;
    _mirror: boolean;
    _delay: number;
    _rate: number;
    _duration: number;
    _flashColor: number[];
    _flashDuration: number;
    _screenFlashDuration: number;
    _hidingDuration: number;
    _bitmap1: Bitmap;
    _bitmap2: Bitmap;
    _cellSprites: Sprite[];
    _screenFlashSprite: ScreenSprite;
    _duplicated: boolean;

    constructor();
    initialize(): void;
    initMembers(): void;
    setup(target: Sprite_Base, animation: IDataAnimation, mirror: boolean, delay: number): void;
    remove(): void;
    setupRate(): void;
    setupDuration(): void;
    update(): void;
    updateFlash(): void;
    updateScreenFlash(): void;
    absoluteX(): number;
    absoluteY(): number;
    updateHiding(): void;
    isPlaying(): boolean;
    loadBitmaps(): void;
    isReady(): boolean;
    createSprites(): void;
    createCellSprites(): void;
    createScreenFlashSprite(): void;
    updateMain(): void;
    updatePosition(): void;
    updateFrame(): void;
    currentFrameIndex(): void;
    updateAllCellSprites(frame: number[][]): void;
    updateCellSprite(sprite: Sprite, cell: number[]): void;
    processTimingData(timing: IDataAnimationTiming): void;
    startFlash(color: number[], duration: number): void;
    startScreenFlash(color: number[], duration: number): void;
    startHiding(duration: number): void;
}

declare class Sprite_Damage extends Sprite
{
    _duration: number;
    _flashColor: number[];
    _flashDuration: number;
    _damageBitmap: Bitmap;

    constructor();
    initialize(): void;
    setup(target: Game_Battler): void;
    digitWidth(): number;
    digitHeight(): number;
    createMiss(): void;
    createDigits(baseRow: number, value: number): void;
    createChildSprite(): Sprite;
    update(): void;
    updateChild(sprite: Sprite): void;
    updateFlash(): void;
    updateOpacity(): void;
    isPlaying(): boolean;
}

declare class Sprite_StateIcon extends Sprite
{
    static _iconWidth: number;
    static _iconHeight: number;

    _battler: Game_Battler;
    _iconIndex: number;
    _animationCount: number;
    _animationIndex: number;

    constructor();
    initialize(): void;
    initMembers(): void;
    setup(battler: Game_Battler): void;
    update(): void;
    animationWait(): number;
    updateIcon(): void;
    updateFrame(): void;
}

declare class Sprite_StateOverlay extends Sprite_Base
{
    _battler: Game_Battler;
    _overlayIndex: number;
    _animationCount: number;
    _pattern: number;

    constructor();
    initialize(): void;
    initMembers(): void;
    loadBitmap(): void;
    setup(battler: Game_Battler): void;
    update(): void;
    animationWait(): number;
    updatePattern(): void;
    updateFrame(): void;
}

declare class Sprite_Weapon extends Sprite_Base
{
    _weaponImageId: number;
    _animationCount: number;
    _pattern: number;

    constructor();
    initialize(): void;
    initMembers(): void;
    setup(weaponImageId: number): void;
    update(): void;
    animationWait(): number;
    updatePattern(): void;
    loadBitmap(): void;
    updateFrame(): void;
    isPlaying(): boolean;
}

declare class Sprite_Balloon extends Sprite_Base
{
    _balloonId: number;
    _duration: number;

    constructor();
    initialize(): void;
    initMembers(): void;
    loadBitmap(): void;
    setup(balloonId: number): void;
    update(): void;
    updateFrame(): void;
    speed(): number;
    waitTime(): number;
    frameIndex(): number;
    isPlaying(): boolean;
}

declare class Sprite_Picture extends Sprite
{
    _pictureId: number;
    _pictureName: string;
    _isPicture: boolean;

    constructor(pictureId: number);
    initialize(): void;
    initialize(pictureId: number): void;
    picture(): Game_Picture;
    update(): void;
    updateBitmap(): void;
    updateOrigin(): void;
    updatePosition(): void;
    updateScale(): void;
    updateTone(): void;
    updateOther(): void;
    loadBitmap(): void;
}

declare class Sprite_Timer extends Sprite
{
    _seconds: number;

    constructor();
    initialize(): void;
    createBitmap(): void;
    update(): void;
    updateBitmap(): void;
    redraw(): void;
    timerText(): string;
    updatePosition(): void;
    updateVisibility(): void;
}

declare class Sprite_Destination extends Sprite
{
    _frameCount: number;

    constructor();
    initialize(): void;
    update(): void;
    createBitmap(): void;
    updatePosition(): void;
    updateAnimation(): void;
}

declare class Spriteset_Base extends Sprite
{
    _tone: number[];
    _baseSprite: Sprite;
    _toneSprite: ToneSprite;
    _toneFilter: ToneFilter;
    _pictureContainer: Sprite;
    _timerSprite: Sprite_Timer;
    _flashSprite: ScreenSprite;
    _fadeSprite: ScreenSprite;

    opaque: boolean;

    constructor();
    initialize(): void;
    createLowerLayer(): void;
    createUpperLayer(): void;
    update(): void;
    createBaseSprite(): void;
    createToneChanger(): void;
    createCanvasToneChanger(): void;
    createPictures(): void;
    createTimer(): void;
    createScreenSprites(): void;
    updateScreenSprites(): void;
    updateToneChanger(): void;
    updateWebGLToneChanger(): void;
    updateCanvasToneChanger(): void;
    updatePosition(): void;
}

declare class Spriteset_Map extends Spriteset_Base
{
    _parallax: TilingSprite;
    _parallaxName: string;
    _tilemap: Tilemap;
    _tileset: IDataTileset;
    _characterSprites: Sprite_Character[];
    _shadowSprite: Sprite;
    _destinationSprite: Sprite_Destination;
    _weather: Weather;

    constructor();
    initialize(): void;
    createLowerLayer(): void;
    update(): void;
    hideCharacters(): void;
    createParallax(): void;
    createTilemap(): void;
    loadTileset(): void;
    createCharacters(): void;
    createShadow(): void;
    createDestination(): void;
    createWeather(): void;
    updateTileset(): void;

    _canvasReAddParallax(): void;

    updateParallax(): void;
    updateTilemap(): void;
    updateShadow(): void;
    updateWeather(): void;
}

declare class Spriteset_Battle extends Spriteset_Base
{
    _battlebackLocated: boolean;
    _backgroundSprite: Sprite;
    _battleField: Sprite;
    _back1Sprite: TilingSprite;
    _back2Sprite: TilingSprite;
    _enemySprites: Sprite_Enemy[];
    _actorSprites: Sprite_Actor[];

    constructor();
    initialize(): void;
    createLowerLayer(): void;
    createBackground(): void;
    update(): void;
    createBattleField(): void;
    createBattleback(): void;
    updateBattleback(): void;
    locateBattleback(): void;
    battleback1Bitmap(): Bitmap;
    battleback2Bitmap(): Bitmap;
    battleback1Name(): string;
    battleback2Name(): string;
    overworldBattleback1Name(): string;
    overworldBattleback2Name(): string;
    normalBattleback1Name(): string;
    normalBattleback2Name(): string;
    terrainBattleback1Name(type: number): string;
    terrainBattleback2Name(type: number): string;
    defaultBattleback1Name(): string;
    defaultBattleback2Name(): string;
    shipBattleback1Name(): string;
    shipBattleback2Name(): string;
    autotileType(z: number): number;
    createEnemies(): void;
    compareEnemySprite(a: Sprite_Enemy, b: Sprite_Enemy): number;
    createActors(): void;
    updateActors(): void;
    battlerSprites(): Sprite_Battler[];
    isAnimationPlaying(): boolean;
    isEffecting(): boolean;
    isAnyoneMoving(): boolean;
    isBusy(): boolean;
}
