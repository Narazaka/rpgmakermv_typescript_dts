declare class JsExtensions
{
}

declare interface Number
{
    clamp(min: number, max: number): number;
    mod(n: number): number;
}

declare interface String
{
    format(): string;
    padZero(length: number): string;
    contains(string: string): boolean;
}

declare interface Array<T>
{
    equals(array: T): boolean;
    clone(): T;
    contains(): boolean;
}

declare interface Math
{
    randomInt(max: number): number;
}

declare class Utils
{
    static RPGMAKER_NAME: string;
    static RPGMAKER_VERSION: string;
    static isOptionValid(name: string): boolean;
    static isNwjs(): boolean;
    static isMobileDevice(): boolean;
    static isMobileSafari(): boolean;
    static isAndroidChrome(): boolean;
    static canReadGameFiles(): boolean;
    static rgbToCssColor(r: number, g: number, b: number): string;
}

declare class CacheEntry
{
    constructor(cache: any, key: any, item: any); // TODO
    free(byTTL: boolean): void;
    allocate(): CacheEntry;
    setTimeToLive(ticks: number, seconds: number): CacheEntry;
    isStillAlive(): boolean;
    touch(): void;
}

declare class CacheMap
{
    constructor(manager: any); // TODO
    checkTTL(): void;
    getItem(key: any): any; // TODO
    clear(): void;
    setItem(key: any, item: any): CacheEntry;
    update(ticks: number, delta: number): void;
}

declare class Point extends PIXI.Point
{
    initialize(x: number, y: number): void;
}

declare class Rectangle extends PIXI.Rectangle
{
    initialize(x: number, y: number, width: number, height: number): void;

    static emptyRectangle: Rectangle;
}

declare class Bitmap
{
    initialize(width: number, height: number): void;
    
    static load(url: string): Bitmap;
    static snap(stage: any): Bitmap;

    isReady(): boolean;
    isError(): boolean;
    touch(): void;
    
    url: string;
    baseTexture: PIXI.BaseTexture;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    rect: Rectangle;
    smooth: boolean;
    paintOpacity: number;

    resize(width: number, height: number): void;
    blt(source: Bitmap, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void;
    bltImage(source: Bitmap, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void;
    getPixel(x: number, y: number): string;
    getAlphaPixel(x: number, y: number): string;
    clearRect(x: number, y: number, width: number, height: number): void;
    clear(): void;
    fillRect(x: number, y: number, width: number, height: number, color: String): void;
    fillAll(color: string): void;
    gradientFillRect(x: number, y: number, width: number, height: number, color1: String, color2: string, vertical: boolean): void;
    drawCircle(x: number, y: number, radius: number, color: string): void;
    drawText(text: string, x: number, y: number, maxWidth: number, lineHeight: number, align: string): void;
    measureTextWidth(text: string): number;
    adjustTone(r: number, g: number, b: number): void;
    rotateHue(offset: number): void;
    blur(): void;
    addLoadListener(listener: Function): void;

    _makeFontNameText(): string;
    _drawTextOutline(text: string, tx: number, ty: number, maxWidth: number): void;
    _drawTextBody(text: string, tx: number, ty: number, maxWidth: number): void;
    _onLoad(): void;
    _callLoadListeners(): void;
    _onError(): void;
    _setDirty(): void;
    checkDirty(): void;
}

declare class Graphics
{
    initialize(width: number, height: number, type: string): void;

    static frameCount: number;

    static BLEND_NORMAL: number;
    static BLEND_ADD: number;
    static BLEND_MULTIPLY: number;
    static BLEND_SCREEN: number;

    static tickStart(): void;
    static tickEnd(): void;
    static render(stage: Stage): void;
    static isWebGL(): boolean;
    static hasWebGL(): boolean;
    static canUseDifferenceBlend(): boolean;
    static canUseSaturationBlend(): boolean;
    static setLoadingImage(src: any): void; // TODO
    static startLoading(): void;
    static updateLoading(): void;
    static printError(name: string, message: string): void;
    static showFps(): void;
    static hideFps(): void;
    static loadFont(name: string, url: string): void;
    static isFontLoaded(name: string): boolean;
    static playVideo(src: string): void;
    static isVideoPlaying(): boolean;
    static canPlayVideoType(type: string): boolean;
    static pageToCanvasX(x: number): number;
    static pageToCanvasY(y : number): number;
    static isInsideCanvas(x: number, y: number): boolean;
    static callGC(): void;

    static width: number;
    static height: number;
    static boxWidth: number;
    static boxHeight: number;
    static scale: number;

    static _createAllElements(): void;
    static _updateAllElements(): void;
    static _updateRealScale(): void;
    static _makeErrorHtml(name: string, message: string): string;
    static _defaultStretchMode(): boolean;
    static _testCanvasBlendModes(): void;
    static _modifyExistingElements(): void;
    static _createErrorPrinter(): void;
    static _updateErrorPrinter(): void;
    static _createCanvas(): void;
    static _updateCanvas(): void;
    static _createVideo(): void;
    static _updateVideo(): void;
    static _createUpperCanvas(): void;
    static _updateUpperCanvas(): void;
    static _clearUpperCanvas(): void;
    static _paintUpperCanvas(): void;
    static _createRenderer(): void;
    static _updateRenderer(): void;
    static _createFPSMeter(): void;
    static _createModeBox(): void;
    static _createGameFontLoader(): void;
    static _createFontLoader(name: string): void;
    static _centerElement(element: HTMLElement): void;
    static _disableTextSelection(): void;
    static _disableContextMenu(): void;
    static _applyCanvasFilter(): void;
    static _onVideoLoad(): void;
    static _onVideoError(): void;
    static _onVideoEnd(): void;
    static _updateVisibility(videoVisible: boolean): void;
    static _isVideoVisible(): boolean;
    static _setupEventHandlers(): void;
    static _onWindowResize(): void;
    static _onKeyDown(event: KeyboardEvent): void;
    static _switchFPSMeter(): void;
    static _switchStretchMode(): void;
    static _switchFullScreen(): void;
    static _isFullScreen(): boolean;
    static _requestFullScreen(): void;
    static _cancelFullScreen(): void;
}

declare class Input
{
    static initialize(): void;

    static keyRepeatWait: number;
    static keyRepeatInterval: number;
    static keyMapper: { [key: number]: string };
    static gamepadMapper: { [key: number]: string };

    static clear(): void;
    static update(): void;
    static isPressed(keyName: string): boolean;
    static isTriggered(keyName: string): boolean;
    static isRepeated(keyName: string): boolean;
    static isLongPressed(keyName: string): boolean;

    static dir4: number;
    static dir8: number;
    static date: number;

    static _wrapNwjsAlert(): void;
    static _setupEventHandlers(): void;
    static _onKeyDown(event: KeyboardEvent): void;
    static _shouldPreventDefault(keyCode: number): boolean;
    static _onKeyUp(event: KeyboardEvent): void;
    static _onLostFocus(): void;
    static _pollGamepads(): void;
    static _updateGamepadState(gamepad: Gamepad): void;
    static _updateDirection(): void;
    static _signX(): number;
    static _signY(): number;
    static _makeNumpadDirection(x: number, y: number): number;
    static _isEscapeCompatible(keyName: string): boolean;
}

declare class TouchInput
{
    static initialize(): void;

    static keyRepeatWait: number;
    static keyRepeatInterval: number;

    static clear(): void;
    static update(): void;
    static isPressed(): boolean;
    static isTriggered(): boolean;
    static isRepeated(): boolean;
    static isLongPressed(): boolean;
    static isCancelled(): boolean;
    static isMoved(): boolean;
    static isReleased(): boolean;

    static wheelX: number;
    static wheelY: number;
    static x: number;
    static y: number;
    static date: number;

    static _setupEventHandlers(): void;
    static _onMouseDown(event: MouseEvent): void;
    static _onLeftButtonDown(event: MouseEvent): void;
    static _onMiddleButtonDown(event: MouseEvent): void;
    static _onRightButtonDown(event: MouseEvent): void;
    static _onMouseMove(event: MouseEvent): void;
    static _onMouseUp(event: MouseEvent): void;
    static _onWheel(event: WheelEvent): void;
    static _onTouchStart(event: TouchEvent): void;
    static _onTouchMove(event: TouchEvent): void;
    static _onTouchEnd(event: TouchEvent): void;
    static _onTouchCancel(event: TouchEvent): void;
    static _onPointerDown(event: PointerEvent): void;
    static _onTrigger(x: number, y: number): void;
    static _onCancel(x: number, y: number): void;
    static _onMove(x: number, y: number): void;
    static _onRelease(x: number, y: number): void;
}

declare class Sprite extends PIXI.Sprite
{
    initialize(bitmap: Bitmap): void;

    static _counter: number;

    bitmap: Bitmap;
    width: number;
    height: number;
    opacity: number;

    update(): void;
    move(x: number, y: number): void;
    setFrame(x: number, y: number, width: number, height: number): void;
    getBlendColor(): number[];
    setBlendColor(color: number[]): void;
    getColorTone(): number[];
    setColorTone(tone: number[]): void;

    _onBitmapLoad(): void;
    _refresh(): void;
    _isInBitmapRect(x: number, y: number, w: number, h: number): boolean;
    _needsTint(): boolean;
    _createTinter(w: number, h: number): void;
    _executeTint(x: number, y: number, w: number, h: number): void;

    updateTransform(): void;

    _renderCanvas_PIXI(renderer: PIXI.CanvasRenderer): void;
    _renderWebGL_PIXI(renderer: PIXI.WebGLRenderer): void;

    _renderCanvas(renderer: PIXI.CanvasRenderer): void;
    _speedUpCustomBlendModes(renderer: PIXI.CanvasRenderer): void; // TODO
    _renderWebGL(renderer: PIXI.WebGLRenderer): void;
}

declare class Tilemap extends PIXI.Container
{
    initialize(): void;

    width: number;
    height: number;
    tileWidth: number;
    tileHeight: number;
    
    setData(width: number, height: number, data: any[]): void; // TODO
    isReady(): boolean;
    update(): void;
    refresh(): void;
    refreshTileset(): void;
    updateTransform(): void;

    _createLayers(): void;
    _updateLayerPositions(startX: number, startY: number): void;
    _paintAllTiles(startX: number, startY: number): void;
    _paintTiles(startX: number, startY: number, x: number, y: number): void;
    _readLastTiles(i: number, x: number, y: number): any[]; // TODO
    _writeLastTiles(i: number, x: number, y: number, tiles: any[]): void; // TODO
    _drawTile(bitmap: Bitmap, tileId: number, dx: number, dy: number): void;
    _drawNormalTile(bitmap: Bitmap, tileId: number, dx: number, dy: number): void;
    _drawAutotile(bitmap: Bitmap, tileId: number, dx: number, dy: number): void;
    _drawTableEdge(bitmap: Bitmap, tileId: number, dx: number, dy: number): void;
    _drawShadow(bitmap: Bitmap, shadowBits: number, dx: number, dy: number): void;
    _readMapData(x: number, y: number, z: number): number;
    _isHigherTile(tileId: number): boolean;
    _isTableTile(tileId: number): boolean;
    _isOverpassPosition(mx: number, my: number): boolean;
    _sortChildren(): void;
    _compareChildOrder(a: any, b: any): number; // TODO

    static TILE_ID_B: number;
    static TILE_ID_C: number;
    static TILE_ID_D: number;
    static TILE_ID_E: number;
    static TILE_ID_A5: number;
    static TILE_ID_A1: number;
    static TILE_ID_A2: number;
    static TILE_ID_A3: number;
    static TILE_ID_A4: number;
    static TILE_ID_MAX: number;

    static isVisibleTile(tileId: number): boolean;
    static isAutotile(tileId: number): boolean;
    static getAutotileKind(tileId: number): number;
    static getAutotileShape(tileId: number): number;
    static makeAutotileId(kind: number, shape: number): number;
    static isSameKindTile(tileID1: number, tileID2: number): boolean;
    static isTileA1(tileId: number): boolean;
    static isTileA2(tileId: number): boolean;
    static isTileA3(tileId: number): boolean;
    static isTileA4(tileId: number): boolean;
    static isTileA5(tileId: number): boolean;
    static isWaterTile(tileId: number): boolean;
    static isWaterfallTile(tileId: number): boolean;
    static isGroundTile(tileId: number): boolean;
    static isShadowingTile(tileId: number): boolean;
    static isRoofTile(tileId: number): boolean;
    static isWallTopTile(tileId: number): boolean;
    static isWallSideTile(tileId: number): boolean;
    static isWallTile(tileId: number): boolean;
    static isFloorTypeAutotile(tileId: number): boolean;
    static isWallTypeAutotile(tileId: number): boolean;
    static isWaterfallTypeAutotile(tileId: number): boolean;

    static FLOOR_AUTOTILE_TABLE: number[][][];
    static WALL_AUTOTILE_TABLE: number[][][];
    static WATERFALL_AUTOTILE_TABLE: number[][][];
}

declare class ShaderTilemap extends Tilemap
{
    _hackRenderer(renderer: any): any; // TODO

    renderCanvas(renderer: any): void; // TODO
    renderWebGL(renderer: any): void; // TODO
    refresh(): void;
    refreshTileset(): void;
    updateTransform(): void;

    _createLayers(): void;
    _updateLayerPositions(startX: number, startY: number): void;
    _paintAllTiles(startX: number, startY: number): void;
    _paintTiles(startX: number, startY: number, x: number, y: number): void;
    _drawTile(bitmap: Bitmap, tileId: number, dx: number, dy: number): void;
    _drawTile(layer: any[], tileId: number, dx: number, dy: number): void;
    _drawNormalTile(bitmap: Bitmap, tileId: number, dx: number, dy: number): void;
    _drawNormalTile(layer: any[], tileId: number, dx: number, dy: number): void;
    _drawAutotile(bitmap: Bitmap, tileId: number, dx: number, dy: number): void;
    _drawAutotile(layer: any[], tileId: number, dx: number, dy: number): void;
    _drawTableEdge(bitmap: Bitmap, tileId: number, dx: number, dy: number): void;
    _drawTableEdge(layer: any[], tileId: number, dx: number, dy: number): void;
    _drawShadow(bitmap: Bitmap, shadowBits: number, dx: number, dy: number): void;
    _drawShadow(layer: any[], shadowBits: number, dx: number, dy: number): void;
}

declare class TilingSprite extends PIXI.extras.TilingSprite
{
    initialize(bitmap: Bitmap): void;

    _renderCanvas_PIXI(renderer: PIXI.CanvasRenderer): void;
    _renderWebGL_PIXI(renderer: PIXI.WebGLRenderer): void;
    _renderCanvas(renderer: PIXI.CanvasRenderer): void;
    _renderWebGL(renderer: PIXI.WebGLRenderer): void;

    bitmap: Bitmap;
    opacity: number;
    
    update(): void;
    move(x: number, y: number, width: number, height: number): void;
    setFrame(x: number, y: number, width: number, height: number): void;
    updateTransform(): void;
    updateTransformTS(): void;

    _onBitmapLoad(): void;
    _refresh(): void;
}

declare class ScreenSprite extends PIXI.Container
{
    initialize(): void;

    opacity: number;

    static YEPWarned: boolean;
    static warnYep(): void;

    anchor: number;
    blendMode: number;
    
    setBlack(): void;
    setWhite(): void;
    setColor(r: number, g: number, b: number): void;
}

declare interface Window extends PIXI.Container
{
    initialize(): void;

    windowskin: Bitmap;
    contents: Bitmap;
    width: number;
    height: number;
    padding: number;
    margin: number;
    opacity: number;
    backOpacity: number;
    contentsOpacity: number;
    openness: number;

    update(): void;
    move(x: number, y: number, width: number, height: number): void;
    isOpen(): boolean;
    isClosed(): boolean;
    setCursorRect(x: number, y: number, width: number, height: number): void;
    setTone(r: number, g: number, b: number): void;
    addChildToBack(child: any): any; // TODO
    updateTransform(): void;

    _createAllParts(): void;
    _onWindowskinLoad(): void;
    _refreshAllParts(): void;
    _refreshBack(): void;
    _refreshFrame(): void;
    _refreshCursor(): void;
    _refreshContents(): void;
    _refreshArrows(): void;
    _refreshPauseSign(): void;
    _updateCursor(): void;
    _updateContents(): void;
    _updateArrows(): void;
    _updatePauseSign(): void;
}

declare class WindowLayer extends PIXI.Container
{
    initialize(): void;

    static voidFilter: PIXI.filters.VoidFilter;

    width: number;
    height: number;

    move(x: number, y: number, width: number, height: number): void;
    update(): void;
    renderCanvas(renderer: any): void; // TODO

    _canvasClearWindowRect(renderSession: any, window: Window): void; // TODO

    renderWebGL(renderer: any): void; // TODO

    _maskWindow(window: Window): void;
}

declare class Weather extends PIXI.Container
{
    initialize(): void;
    update(): void;

    _createBitmaps(): void;
    _createDimmer(): void;
    _updateDimmer(): void;
    _updateAllSprites(): void;
    _addSprite(): void;
    _removeSprite(): void;
    _updateSprite(sprite: Sprite): void;
    _updateRainSprite(sprite: Sprite): void;
    _updateStormSprite(sprite: Sprite): void;
    _updateSnowSprite(sprite: Sprite): void;
    _rebornSprite(sprite: Sprite): void;
}

declare class ToneFilter extends PIXI.filters.ColorMatrixFilter
{
    adjustHue(value: number): void;
    adjustSaturation(value: number): void;
    adjustTone(r: number, g: number, b: number): void;
}

declare class ToneSprite extends PIXI.Container
{
    initialize(): void;
    clear(): void;
    setTone(r: number, g: number, b: number, gray: number): void;

    _renderCanvas(renderer: any): void; // TODO
    _renderWebGL(renderer: any): void; // TODO
}

declare class Stage extends PIXI.Container
{
    initialize(): void;
}

declare class WebAudio89
{
    initialize(url: string): void;

    static _context: any; // TODO
    static _masterGainNode: any; // TODO
    static _initialized: boolean;
    static _unlocked: boolean;

    static initialize(noAudio: boolean): boolean;
    static canPlayOgg(): boolean;
    static canPlayM4a(): boolean;

    static _createContext(): void;
    static _detectCodecs(): void;
    static _createMasterGainNode(): void;
    static _setupEventHandlers(): void;
    static _onTouchStart(): void;
    static _onVisibilityChange(): void;
    static _onHide(): void;
    static _onShow(): void;
    static _shouldMuteOnHide(): boolean;
    static _fadeIn(duration: number): void;
    static _fadeOut(duration: number): void;

    clear(): void;

    url: string;
    volume: number;
    pitch: number;
    pan: number;

    isReady(): boolean;
    isError(): boolean;
    isPlaying(): boolean;
    play(loop: boolean, offset: number): void;
    stop(): void;
    fadeIn(duration: number): void;
    fadeOut(duration: number): void;
    seek(): number;
    addLoadListener(listener: Function): void;
    addStopListener(listener: Function): void;

    _load(url: string): void;
    _onXhrLoad(xhr: XMLHttpRequest): void;
    _startPlaying(loop: boolean, offset: number): void;
    _createNodes(): void;
    _connectNodes(): void;
    _removeNodes(): void;
    _createEndTimer(): void;
    _removeEndTimer(): void;
    _updatePanner(): void;
    _onLoad(): void;
    _readLoopComments(array: Uint8Array): void;
    _readOgg(array: Uint8Array): void;
    _readMp4(array: Uint8Array): void;
    _readMetaData(array: Uint8Array, index: number, size: number): void;
    _readLittleEndian(array: Uint8Array, index: number): void;
    _readBigEndian(array: Uint8Array, index: number): void;
    _readFourCharacters(array: Uint8Array, index: number): void;
}

declare class Html5Audio
{
    static _initialized: boolean;
    static _unlocked: boolean;
    static _audioElement: any; // TODO
    static _gainTweenInterval: number;
    static _tweenGain: number;
    static _tweenTargetGain: number;
    static _tweenGainStep: number;
    static _staticSePath: string;

    static setup(url: string): void;
    static initialize(): boolean;

    static _setupEventHandlers(): void;
    static _onTouchStart(): void;
    static _onVisibilityChange(): void;
    static _onLoadedData(): void;
    static _onError(): void;
    static _onEnded(): void;
    static _onHide(): void;
    static _onShow(): void;

    static clear(): void;
    static setStaticSe(url: string): void;

    static url: string;
    static volume: string;

    static isReady(): boolean;
    static isError(): boolean;
    static isPlaying(): boolean;
    static play(loop: boolean, offset: number): void;
    static stop(): void;
    static fadeIn(duration: number): void;
    static fadeOut(duration: number): void;
    static seek(): number;
    static addLoadListener(listener: Function): void;

    static _load(url: string): void;
    static _startPlaying(loop: boolean, offset: number): void;
    static _onLoad(): void;
    static _startGainTween(duration: number): void;
    static _applyTweenValue(volume: number): void;
    static _encode(value: any, depth: number): any;
    static _decode(value: any): any;
    static _getConstructorName(value: any): any;
    static _resetPrototype(value: any, prototype: any): any;
}

declare class JsonEx
{
    static maxDepth: number;
    static stringify(object: any): string;
    static parse(json: string): any;
    static makeDeepCopy(object: any): any;
}

declare class Decrypter
{
    static hasEncryptedImages: boolean;
    static hasEncryptedAudio: boolean;
    static _requestImgFile: any[]; // TODO
    static _headerlength: number;
    static _xhrOk: number;
    static _encryptionKey: string;
    static _ignoreList: string[];
    static SIGNATURE: string;
    static VER: string;
    static REMAIN: string;

    static checkImgIgnore(url: string): boolean;
    static decryptImg(url: string, bitmap: Bitmap): void;
    static decryptHTML5Audio(url: string, bgm: any, pos: number): void; // TODO
    static cutArrayHeader(arrayBuffer: any, length: number): any; // TODO
    static decryptArrayBuffer(arrayBuffer: any): any; // TODO
    static createBlobUrl(arrayBuffer: any): any; // TODO
    static extToEncryptExt(url: string): string;
    static readEncryptionkey(): void;
}

declare var $dataActors      : any; // TODO
declare var $dataClasses     : any; // TODO
declare var $dataSkills      : any; // TODO
declare var $dataItems       : any; // TODO
declare var $dataWeapons     : any; // TODO
declare var $dataArmors      : any; // TODO
declare var $dataEnemies     : any; // TODO
declare var $dataTroops      : any; // TODO
declare var $dataStates      : any; // TODO
declare var $dataAnimations  : any; // TODO
declare var $dataTilesets    : any; // TODO
declare var $dataCommonEvents: any; // TODO
declare var $dataSystem      : any; // TODO
declare var $dataMapInfos    : any; // TODO
declare var $dataMap         : any; // TODO
declare var $gameTemp        : Game_Temp;
declare var $gameSystem      : Game_System;
declare var $gameScreen      : Game_Screen;
declare var $gameTimer       : Game_Timer;
declare var $gameMessage     : Game_Message;
declare var $gameSwitches    : Game_Switches;
declare var $gameVariables   : Game_Variables;
declare var $gameSelfSwitches: Game_SelfSwitches;
declare var $gameMap         : Game_Map;
declare var $gameActors      : Game_Actors;
declare var $gameParty       : Game_Party;
declare var $gameTroop       : Game_Troop;
declare var $gamePlayer      : Game_Player;
declare var $testEvent       : any; // TODO

declare class DataManager
{
    static _globalId       : number;
    static _lastAccessedId : number;
    static _errorUrl       : string;

    static _databaseFiles: {name: string, src: string}[];
    static loadDatabase(): void;
    static loadDataFile(name: string, src: string): void;
    static isDatabaseLoaded(): boolean;
    static loadMapData(mapId: number) : void;
    static makeEmptyMap(): void;
    static isMapLoaded(): boolean;
    static onLoad(object: any): void; // TODO
    static extractMetadata(data: any): void; // TODO
    static checkError(): void;
    static isBattleTest(): boolean;
    static isEventTest(): boolean;
    static isSkill(item: any): boolean; // TODO
    static isItem(item: any): boolean; // TODO
    static isWeapon(item: any): boolean; // TODO
    static isArmor(item: any): boolean; // TODO
    static createGameObjects(): void;
    static setupNewGame(): void;
    static setupBattleTest(): void;
    static setupEventTest(): void;
    static loadGlobalInfo(): void;
    static saveGlobalInfo(info: any): void;
    static isThisGameFile(savefileId: number): boolean;
    static isAnySavefileExists(): boolean;
    static latestSavefileId(): number;
    static loadAllSavefileImages(): void;
    static loadSavefileImages(info: any): void; // TODO
    static maxSavefiles(): number;
    static saveGame(savefileId: number): boolean;
    static loadGame(savefileId: number): boolean;
    static loadSavefileInfo(savefileId: number): boolean;
    static lastAccessedSavefileId(): number;
    static saveGameWithoutRescue(savefileId: number): boolean;
    static loadGameWithoutRescue(savefileId: number): boolean;
    static selectSavefileForNewGame(): void;
    static makeSavefileInfo(): any; // TODO
    static makeSaveContents(): any; // TODO
    static extractSaveContents(contents: any): void; // TODO
}

declare class ConfigManager
{
    static alwaysDash: boolean;
    static commandRemember: boolean;

    static bgmVolume: number;
    static bgsVolume: number;
    static meVolume: number;
    static seVolume: number;
    static load(): void;
    static save(): void;
    static makeData(): any; // TODO
    static applyData(config: any): void; // TODO
    static readFlag(config: any, name: string): boolean; // TODO
    static readVolume(config: any, name: string): number; // TODO
}

declare class StorageManager
{
    static save(savefileId: number, json: any): void; // TODO
    static load(savefileId: number): any; // TODO
    static exists(savefileId: number): any; // TODO
    static remove(savefileId: number): void;
    static backup(savefileId: number): void;
    static backupExists(savefileId: number): void;
    static cleanBackup(savefileId: number): void;
    static restoreBackup(savefileId: number): void;
    static isLocalMode(): boolean;
    static saveToLocalFile(savefileId: number, json: any): void; // TODO
    static loadFromLocalFile(savefileId: number): any; // TODO
    static loadFromLocalBackupFile(savefileId: number): any; // TODO
    static localFileBackupExists(savefileId: number): any; // TODO
    static localFileExists(savefileId: number): any; // TODO
    static removeLocalFile(savefileId: number): void;
    static saveToWebStorage(savefileId: number, json: any): void; // TODO
    static loadFromWebStorage(savefileId: number): any; // TODO
    static loadFromWebStorageBackup(savefileId: number): any; // TODO
    static webStorageBackupExists(savefileId: number): boolean;
    static webStorageExists(savefileId: number): boolean;
    static removeWebStorage(savefileId: number): void;
    static localFileDirectoryPath(): string;
    static localFilePath(savefileId: number): string;
    static webStorageKey(savefileId: number): string;
}

declare class PluginManager
{
    static _path: string;
    static _scripts: string[];
    static _errorUrls: string[];
    static _parameters: { [key: string]: string; };

    static setup(plugins: any[]): void; // TODO
    static checkErrors(): void;
    static parameters(name: string): { [key: string]: string; };
    static setParameters(name: string, parameters: any): void; // TODO
    static loadScript(name: string): void;
    static onError(e: any): void; // TODO
}

declare class ImageManager
{
    static cache: CacheMap;
    // 途中
}

declare class Game_Temp
{
    initialize(): void;
    isPlaytest(): boolean;
    reserveCommonEvent(commonEventId: number): void;
    clearCommonEvent(): void;
    isCommonEventReserved(): boolean;
    reservedCommonEvent(): any; // TODO
    setDestination(x: number, y: number): void;
    clearDestination(): void;
    isDestinationValid(): void;
    destinationX(): number;
    destinationY(): number;
}

declare class Game_System
{
    initialize(): void;
    isJapanese(): boolean;
    isChinese(): boolean;
    isKorean(): boolean;
    isCJK(): boolean;
    isRussian(): boolean;
    isSideView(): boolean;
    isSaveEnabled(): boolean;
    disableSave(): void;
    enableSave(): void;
    isMenuEnabled(): boolean;
    disableMenu(): void;
    enableMenu(): void;
    isEncounterEnabled(): boolean;
    disableEncounter(): void;
    enableEncounter(): void;
    isFormationEnabled(): boolean;
    disableFormation(): void;
    enableFormation(): void;
    battleCount(): number;
    winCount(): number;
    escapeCount(): number;
    saveCount(): number;
    versionId(): number; // TODO 要検証
    windowTone(): any; // TODO
    setWindowTone(value: any): void; // TODO
    battleBgm(): any; // TODO
    setBattleBgm(value: any): void; // TODO
    victoryMe(): any; // TODO
    setVictoryMe(value: any): void; // TODO
    defeatMe(): any; // TODO
    setDefeatMe(value: any): void; // TODO
    onBattleStart(): void;
    onBattleWin(): void;
    onBattleEscape(): void;
    onBeforeSave(): void;
    onAfterLoad(): void;
    playtime(): number;
    playtimeText(): string;
    saveBgm(): void;
    replayBgm(): void;
    saveWalkingBgm(): void;
    replayWalkingBgm(): void;
}

declare class Game_Timer
{
    initialize(): void;
    update(sceneActive: boolean): void;
    start(count: number): void;
    stop(): void;
    isWorking(): boolean;
    seconds(): number;
    onExpire(): void;
}

declare class Game_Message
{
    initialize(): void;
    clear(): void;
    choices(): any; // TODO
    faceName(): string;
    faceIndex(): number;
    background(): number;
    positionType(): number;
    choiceDefaultType(): number;
    choiceCancelType(): number;
    choiceBackground(): number;
    choicePositionType(): number;
    numInputVariableId(): number;
    numInputMaxDigits(): number;
    itemChoiceVariableId(): number;
    itemChoiceItypeId(): number;
    scrollMode(): boolean;
    scrollSpeed(): number;
    scrollNoFast(): boolean;
    add(text: string): void;
    setFaceImage(faceName: string, faceIndex: number): void;
    setBackground(background: number): void;
    setPositionType(positionType: number): void;
    setChoices(choices: any, defaultType: number, cancelType: number): void;
    setChoiceBackground(background: number): void;
    setChoicePositionType(positionType: number): void;
    setNumberInput(variableId: number, maxDigits: number): void;
    setItemChoice(variableId: number, itemType: number): void;
    setScroll(speed: number, noFast: boolean);
    setChoiceCallback(callback: Function): void;
    onChoice(n: any): void; // TODO
    hasText(): boolean;
    isChoice(): boolean;
    isNumberInput(): boolean;
    isItemChoice(): boolean;
    isBusy(): boolean;
    newPage(): void;
    allText(): string;
}

declare class Game_Switches
{
    initialize(): void;
    clear(): void;
    value(switchId: any): any; // TODO
    setValue(switchId: any, value: boolean): void;
    onChange(): void;
}

declare class Game_Variables
{
    initialize(): void;
    clear(): void;
    value(variableId: number): number;
    setValue(variableId: number, value: number): number;
    onChange(): void;
}

declare class Game_SelfSwitches
{
    initialize(): void;
    clear(): void;
    value(key: number[]): boolean;
    setValue(key: (number | string)[], value: boolean): void;
    onChange(): void;
}

declare class Game_Screen
{
    initialize(): void;
    clear(): void;
    onBattleStart(): void;
    brightness(): number;
    tone(): number[];
    flashColor(): number[];
    shake(): number;
    zoomX(): number;
    zoomY(): number;
    zoomScale(): number;
    weatherType(): string;
    weatherPower(): number;
    picture(pictureId: number): Game_Picture;
    realPictureId(pictureId: number): number;
    clearFade(): void;
    clearTone(): void;
    clearFlash(): void;
    clearShake(): void;
    clearZoom(): void;
    clearWeather(): void;
    clearPictures(): void;
    eraseBattlePictures(): void;
    maxPictures(): number;
    startFadeOut(duration: number): void;
    startFadeIn(duration: number): void;
    startTint(tone: number[], duration: number): void;
    startFlash(color: any, duration: number): void; // TODO
    startShake(power: number, speed: number, duration: number): void;
    startZoom(x: number, y: number, scale: number, duration: number): void;
    setZoom(x: number, y: number, scale: number): void;
    changeWeather(type: string, power: number, duration: number): void;
    update(): void;
    updateFadeOut(): void;
    updateFadeIn(): void;
    updateTone(): void;
    updateFlash(): void;
    updateShake(): void;
    updateZoom(): void;
    updateWeather(): void;
    updatePictures(): void;
    startFlashForDamage(): void;
    showPicture(pictureId: number, name: string, origin: number, x: number, y: number, scaleX: number, scaleY: number, opacity: number, blendMode: number): void;
    movePicture(pictureId: number, origin: number, x: number, y: number, scaleX: number, scaleY: number, opacity: number, blendMode: number, duration: number): void;
    rotatePicture(pictureId: number, speed: number): void;
    tintPicture(pictureId: number, tone: number[], duration: number): void;
    erasePicture(pictureId: number): void;
}

declare class Game_Picture
{
    initialize(): void;
    name(): string;
    origin(): number;
    x(): number;
    y(): number;
    scaleX(): number;
    scaleY(): number;
    opacity(): number;
    blendMode(): number;
    tone(): number[];
    angle(): number;
    initBasic(): void;
    initTarget(): void;
    initTone(): void;
    initRotation(): void;
    show(name: string, origin: number, x: number, y: number, scaleX: number, scaleY: number, opacity: number, blendMode: number): void;
    move(origin: number, x: number, y: number, scaleX: number, scaleY: number, opacity: number, blendMode: number, duration: number): void;
    rotate(speed: number): void;
    tint(tone: number[], duration: number): void;
    erase(): void;
    update(): void;
    updateMove(): void;
    updateTone(): void;
    updateRotation(): void;
}

declare class Game_Item
{
    initialize(item: Game_Item): void;
    isSkill(): boolean;
    isItem(): boolean;
    isUsableItem(): boolean;
    isWeapon(): boolean;
    isArmor(): boolean;
    isEquipItem(): boolean;
    isNull(): boolean;
    itemId(): number;
    object(): Game_Item;
    setObject(item: Game_Item): void;
    setEquip(isWeapon: boolean, itemId: number): void;
}

declare class Game_Action
{
    static EFFECT_RECOVER_HP: number;
    static EFFECT_RECOVER_MP: number;
    static EFFECT_GAIN_TP: number;
    static EFFECT_ADD_STATE: number;
    static EFFECT_REMOVE_STATE: number;
    static EFFECT_ADD_BUFF: number;
    static EFFECT_ADD_DEBUFF: number;
    static EFFECT_REMOVE_BUFF: number;
    static EFFECT_REMOVE_DEBUFF: number;
    static EFFECT_SPECIAL: number;
    static EFFECT_GROW: number;
    static EFFECT_LEARN_SKILL: number;
    static EFFECT_COMMON_EVENT: number;
    static SPECIAL_EFFECT_ESCAPE: number;
    static HITTYPE_CERTAIN: number;
    static HITTYPE_PHYSICAL: number;
    static HITTYPE_MAGICAL: number;

    initialize(subject: any, forcing: boolean): void; // TODO
    clear(): void;
    setSubject(subject: any): void; // TODO
    subject(): any; // TODO
    friendsUnit(): any; // TODO
    opponentsUnit(): any; // TODO
    setEnemyAction(action: boolean): void;
    setAttack(): void;
    setGuard(): void;
    setSkill(skillId: number): void;
    setItem(itemId: number): void;
    setItemObject(object: any): void // TODO
    setTarget(targetIndex: number): void;
    item(): any; // TODO
    isSkill(): boolean;
    isItem(): boolean;
    numRepeats(): number;
    checkItemScope(list: any): any; // TODO
    isForOpponent(): boolean;
    isForFriend(): boolean;
    isForDeadFriend(): boolean;
    isForUser(): boolean;
    isForOne(): boolean;
    isForRandom(): boolean;
    isForAll(): boolean;
    needsSelection(): any; // TODO
    numTargets(): number;
    checkDamageType(list: any): any; // TODO
    isHpEffect(): boolean;
    isMpEffect(): boolean;
    isDamage(): boolean;
    isRecover(): boolean;
    isDrain(): boolean;
    isHpRecover(): boolean;
    isMpRecover(): boolean;
    isCertainHit(): boolean;
    isPhysical(): boolean;
    isMagical(): boolean;
    isAttack(): boolean;
    isGuard(): boolean;
    isMagicSkill(): boolean;
    decideRandomTarget(): void;
    setConfusion(): void;
    prepare(): void;
    isValid(): boolean;
    speed(): number;
    makeTargets(): any; // TODO
    repeatTargets(targets: any): any; // TODO
    confusionTarget(): any; // TODO
    targetsForOpponents(): any; // TODO
    targetsForFriends(): any; // TODO
    evaluate(): number;
    itemTargetCandidates(): any; // TODO
    evaluateWithTarget(target: any): number;
    testApply(target: any): boolean; // TODO
    hasItemAnyValidEffects(target: any): number; // TODO
    testItemEffect(target: any, effect: any): number; // TODO
    itemCnt(target: any): number; // TODO
    itemMrf(target: any): number; // TODO
    itemHit(target: any): number; // TODO
    itemEva(target: any): number; // TODO
    itemCri(target: any): number; // TODO
    apply(target: any): void; // TODO
    makeDamageValue(target: any, critical: boolean): number; // TODO
    evalDamageFormula(target: any): number; // TODO
    calcElementRate(target: any): number; // TODO
    elementsMaxRate(target: any, elements: any[]): number; // TODO
    applyCritical(damage: number): number;
    applyVariance(damage: number, variance: number): number;
    applyGuard(damage: number, target: any): number; // TODO
    executeDamage(target: any, value: number): void; // TODO
    executeHpDamage(target: any, value: number): void; // TODO
    executeMpDamage(target: any, value: number): void; // TODO
    gainDrainedHp(value: number): void;
    gainDrainedMp(value: number): void;
    applyItemEffect(target: any, effect: any): void // TODO
    itemEffectRecoverHp(target: any, effect: any): void // TODO
    itemEffectRecoverMp(target: any, effect: any): void // TODO
    itemEffectGainTp(target: any, effect: any): void // TODO
    itemEffectAddState(target: any, effect: any): void // TODO
    itemEffectAddAttackState(target: any, effect: any): void // TODO
    itemEffectAddNormalState(target: any, effect: any): void // TODO
    itemEffectRemoveState(target: any, effect: any): void // TODO
    itemEffectAddBuff(target: any, effect: any): void // TODO
    itemEffectAddDebuff(target: any, effect: any): void // TODO
    itemEffectRemoveBuff(target: any, effect: any): void // TODO
    itemEffectRemoveDebuff(target: any, effect: any): void // TODO
    itemEffectSpecial(target: any, effect: any): void // TODO
    itemEffectGrow(target: any, effect: any): void // TODO
    itemEffectLearnSkill(target: any, effect: any): void // TODO
    itemEffectCommonEvent(target: any, effect: any): void // TODO
    makeSuccess(target: any): void // TODO
    applyItemUserEffect(target: any): void // TODO
    lukEffectRate(target: any): number // TODO
    applyGlobal(): void;
}

declare class Game_ActionResult
{
    initialize(): void;
    clear(): void;
    addedStateObjects(): any; // TODO
    removedStateObjects(): any; // TODO
    isStatusAffected(): boolean;
    isHit(): boolean;
    isStateAdded(stateId: number): boolean;
    pushAddedState(stateId: number): void;
    isStateRemoved(stateId: number): boolean;
    pushRemovedState(stateId: number): void;
    isBuffAdded(paramId: number): boolean;
    pushAddedBuff(paramId: number): void;
    isDebuffAdded(paramId: number): boolean;
    pushAddedDebuff(paramId: number): void;
    isBuffRemoved(paramId: number): boolean;
    pushRemovedBuff(paramId: number): void;
}

declare class Game_BattlerBase
{
    static TRAIT_ELEMENT_RATE: number;
    static TRAIT_DEBUFF_RATE: number;
    static TRAIT_STATE_RATE: number;
    static TRAIT_STATE_RESIST: number;
    static TRAIT_PARAM: number;
    static TRAIT_XPARAM: number;
    static TRAIT_SPARAM: number;
    static TRAIT_ATTACK_ELEMENT: number;
    static TRAIT_ATTACK_STATE: number;
    static TRAIT_ATTACK_SPEED: number;
    static TRAIT_ATTACK_TIMES: number;
    static TRAIT_STYPE_ADD: number;
    static TRAIT_STYPE_SEAL: number;
    static TRAIT_SKILL_ADD: number;
    static TRAIT_SKILL_SEAL: number;
    static TRAIT_EQUIP_WTYPE: number;
    static TRAIT_EQUIP_ATYPE: number;
    static TRAIT_EQUIP_LOCK: number;
    static TRAIT_EQUIP_SEAL: number;
    static TRAIT_SLOT_TYPE: number;
    static TRAIT_ACTION_PLUS: number;
    static TRAIT_SPECIAL_FLAG: number;
    static TRAIT_COLLAPSE_TYPE: number;
    static TRAIT_PARTY_ABILITY: number;
    static FLAG_ID_AUTO_BATTLE: number;
    static FLAG_ID_GUARD: number;
    static FLAG_ID_SUBSTITUTE: number;
    static FLAG_ID_PRESERVE_TP: number;
    static ICON_BUFF_START: number;
    static ICON_DEBUFF_START: number;

    hp: number;
    mp: number;
    tp: number;
    mhp: number;
    mmp: number;
    atk: number;
    def: number;
    mat: number;
    mdf: number;
    agi: number;
    luk: number;
    hit: number;
    eva: number;
    cri: number;
    cev: number;
    mev: number;
    mrf: number;
    cnt: number;
    hrg: number;
    mrg: number;
    trg: number;
    tgr: number;
    grd: number;
    rec: number;
    pha: number;
    mcr: number;
    tcr: number;
    pdr: number;
    mdr: number;
    fdr: number;
    exr: number;

    initialize(): void;
    initMembers(): void;
    clearParamPlus(): void;
    clearStates(): void;
    eraseState(stateId: number): void;
    isStateAffected(stateId: number): boolean;
    isDeathStateAffected(): boolean;
    deathStateId(): number;
    deathStateId(stateId: number): void;
    resetStateCounts(stateId: number): void;
    isStateExpired(stateId: number): boolean;
    updateStateTurns(): void;
    clearBuffs(): void;
    eraseBuff(paramId: number): void;
    buffLength(): number;
    buff(paramId: number): number;
    isBuffAffected(paramId: number): boolean;
    isDebuffAffected(paramId: number): boolean;
    isBuffOrDebuffAffected(paramId: number): boolean;
    isMaxBuffAffected(paramId: number): boolean;
    isMaxDebuffAffected(paramId: number): boolean;
    increaseBuff(paramId: number): void;
    decreaseBuff(paramId: number): void;
    overwriteBuffTurns(paramId: number, turns: number): void;
    isBuffExpired(paramId: number): boolean;
    updateBuffTurns(): void;
    die(): void;
    revive(): void;
    states(): any; // TODO
    stateIcons(): number[];
    buffIcons(): number[];
    buffIconIndex(buffLevel: number, paramId: number): number;
    allIcons(): any; // TODO
    traitObjects(): any; // TODO
    allTraits(): any; // TODO
    traits(code: number): any; // TODO
    traitsWithId(code: number, id: number): any; // TODO
    traitsPi(code: number, id: number): number;
    traitsSum(code: number, id: number): number;
    traitsSumAll(code: number): number;
    traitsSet(code: number): any; // TODO
    paramBase(paramId: number): number;
    paramPlus(paramId: number): number;
    paramMin(paramId: number): number;
    paramMax(paramId: number): number;
    paramRate(paramId: number): number;
    paramBuffRate(paramId: number): number;
    param(paramId: number): number;
    xparam(xparamId: number): number;
    sparam(sparamId: number): number;
    elementRate(elementId: number): number;
    debuffRate(paramId: number): number;
    stateRate(stateId: number): number;
    stateResistSet(): any; // TODO
    isStateResist(stateId: number): boolean;
    attackElements(): any; // TODO
    attackStates(): any; // TODO
    attackStatesRate(stateId: number): number;
    attackSpeed(): number;
    attackTimesAdd(): number;
    addedSkillTypes(): any; // TODO
    isSkillTypeSealed(stypeId: number): boolean;
    addedSkills(): any; // TODO
    isSkillSealed(skillId: number): boolean;
    isEquipWtypeOk(wtypeId: number): boolean;
    isEquipAtypeOk(atypeId: number): boolean;
    isEquipTypeLocked(etypeId: number): boolean;
    isEquipTypeSealed(etypeId: number): boolean;
    slotType(): number;
    isDualWield(): boolean;
    actionPlusSet(): any; // TODO
    specialFlag(flagId: number): any; // TODO
    collapseType(): number;
    partyAbility(abilityId: number): any; // TODO
    isAutoBattle(): boolean;
    isGuard(): boolean;
    isSubstitute(): boolean;
    isPreserveTp(): boolean;
    addParam(paramId: number, value: number): void;
    setHp(hp: number): void;
    setMp(mp: number): void;
    setTp(tp: number): void;
    maxTp(): number;
    refresh(): void;
    recoverAll(): void;
    hpRate(): number;
    mpRate(): number;
    tpRate(): number;
    hide(): void;
    appear(): void;
    isHidden(): boolean;
    isAppeared(): boolean;
    isDead(): boolean;
    isAlive(): boolean;
    isDying(): boolean;
    isRestricted(): boolean;
    canInput(): boolean;
    canMove(): boolean;
    isConfused(): boolean;
    confusionLevel(): number;
    isActor(): boolean;
    isEnemy(): boolean;
    sortStates(): void;
    restriction(): number;
    addNewState(stateId: number): void;
    onRestrict(): void;
    mostImportantStateText(): string;
    stateMotionIndex(): number;
    stateOverlayIndex(): number;
    isSkillWtypeOk(skill: any): boolean; // TODO
    skillMpCost(skill: any): number; // TODO
    skillTpCost(skill: any): number; // TODO
    canPaySkillCost(skill: any): boolean; // TODO
    paySkillCost(skill: any): void; // TODO
    isOccasionOk(item: any): boolean; // TODO
    meetsUsableItemConditions(item: any): boolean; // TODO
    meetsSkillConditions(skill: any): boolean; // TODO
    meetsItemConditions(skill: any): boolean; // TODO
    canUse(item: any): boolean; // TODO
    canEquip(item: any): boolean; // TODO
    canEquipWeapon(item: any): boolean; // TODO
    canEquipArmor(item: any): boolean; // TODO
    attackSkillId(): number;
    guardSkillId(): number;
    canAttack(): boolean;
    canGuard(): boolean;
}

declare class Game_Battler extends Game_BattlerBase
{
    initialize(): void;
    initMembers(): void;
    clearAnimations(): void;
    clearDamagePopup(): void;
    clearWeaponAnimation(): void;
    clearEffect(): void;
    clearMotion(): void;
    requestEffect(effectType: boolean): void;
    requestMotion(motionType: boolean): void;
    requestMotionRefresh(): void;
    select(): void;
    deselect(): void;
    isAnimationRequested(): boolean;
    isDamagePopupRequested(): boolean;
    isEffectRequested(): boolean;
    isMotionRequested(): boolean;
    isWeaponAnimationRequested(): boolean;
    isMotionRefreshRequested(): boolean;
    isSelected(): boolean;
    effectType(): boolean;
    motionType(): boolean;
    weaponImageId(): number;
    shiftAnimation(): { animationId: string, mirror: any, delay: number }; // TODO
    startAnimation(animationId: number, mirror: any, delay: number): void; // TODO
    startDamagePopup(): void;
    startWeaponAnimation(weaponImageId: number): void;
    action(index: number): any; // TODO
    setAction(index: number, action: any): void // TODO
    numActions(): number;
    clearActions(): void;
    result(): any; // TODO
    clearResult(): void;
    refresh(): void;
    addState(stateId: number): void;
    isStateAddable(stateId: number): boolean;
    isStateRestrict(stateId: number): boolean;
    onRestrict(): void;
    removeState(stateId: number): void;
    escape(): void;
    addBuff(paramId: number, turns: number): void;
    addDebuff(paramId: number, turns: number): void;
    removeBuff(paramId: number): void;
    removeBattleStates(): void;
    removeAllBuffs(): void;
    removeStatesAuto(timing: any): void; // TODO
    removeBuffsAuto(): void;
    removeStatesByDamage(): void;
    makeActionTimes(): number;
    makeActions(): void;
    speed(): number;
    makeSpeed(): void;
    currentAction(): any; // TODO
    removeCurrentAction(): void;
    setLastTarget(target: any): void; // TODO
    forceAction(skillId: number, targetIndex: number): void;
    useItem(item: any): void; // TODO
    consumeItem(item: any): void; // TODO
    gainHp(value: number): void;
    gainMp(value: number): void;
    gainTp(value: number): void;
    gainSilentTp(value: number): void;
    initTp(): void;
    clearTp(): void;
    chargeTpByDamage(damageRate: number): void;
    regenerateHp(): void;
    maxSlipDamage(): number;
    regenerateMp(): void;
    regenerateTp(): void;
    regenerateAll(): void;
    onBattleStart(): void;
    onAllActionsEnd(): void;
    onTurnEnd(): void;
    onBattleEnd(): void;
    onDamage(value: number): void;
    setActionState(actionState: any): void; // TODO
    isUndecided(): boolean;
    isInputting(): boolean;
    isWaiting(): boolean;
    isActing(): boolean;
    isChanting(): boolean;
    isGuardWaiting(): boolean;
    performActionStart(action: any): void; // TODO
    performAction(action: any): void; // TODO
    performActionEnd(): void;
    performDamage(): void;
    performMiss(): void;
    performRecovery(): void;
    performEvasion(): void;
    performMagicEvasion(): void;
    performCounter(): void;
    performReflection(): void;
    performSubstitute(target: any): void; // TODO
    performCollapse(): void;
}

declare class Game_Actor extends Game_Battler
{
    level: number;
    initialize(): void;
    initialize(actorId: number): void;
    initMembers(): void;
    setup(actorId: number): void;
    actorId(): number;
    actor(): any; // TODO
    name(): string;
    setName(name: string): void;
    nickname(): string;
    setNickname(nickname: string): void;
    profile(): any; // TODO
    setProfile(profile: any); // TODO
    characterName(): string;
    characterIndex(): number;
    faceName(): string;
    faceIndex(): number;
    battlerName(): string;
    clearStates(): void;
    eraseState(stateId: number): void;
    resetStateCounts(stateId: number): void;
    initImages(): void;
    expForLevel(level: number): number;
    initExp(): void;
    currentExp(): number;
    currentLevelExp(): number;
    nextLevelExp(): number;
    nextRequiredExp(): number;
    maxLevel(): number;
    isMaxLevel(): number;
    initSkills(): void;
    initEquips(equips: any[]): void; // TODO
    equipSlots(): any[]; // TODO
    equips(): any[]; // TODO
    weapons(): any[]; // TODO
    armors(): any[]; // TODO
    hasWeapon(weapon: any): boolean; // TODO
    hasArmor(armor: any): boolean; // TODO
    isEquipChangeOk(slotId: number): boolean;
    changeEquip(slotId: number, item: any): void; // TODO
    forceChangeEquip(slotId: number, item: any): void; // TODO
    tradeItemWithParty(newItem: any, oldItem: any): boolean; // TODO
    changeEquipById(etypeId: number, itemId: number): void;
    isEquipped(item: any): boolean; // TODO
    discardEquip(item: any): void; // TODO
    releaseUnequippableItems(forcing: boolean): void;
    clearEquipments(): void;
    optimizeEquipments(): void;
    bestEquipItem(slotId: number): any; // TODO
    calcEquipItemPerformance(item: any): number; // TODO
    isSkillWtypeOk(skill: any): boolean; // TODO
    isWtypeEquipped(wtypeId: number): boolean;
    refresh(): void;
    isActor(): boolean;
    friendsUnit(): Game_Party;
    opponentsUnit(): Game_Troop;
    index(): number;
    isBattleMember(): boolean;
    isFormationChangeOk(): boolean;
    currentClass(): any; // TODO
    isClass(gameClass: any): boolean; // TODO
    skills(): any[]; // TODO
    usableSkills(): any[]; // TODO
    traitObjects(): any[]; // TODO
    attackElements(): any[]; // TODO
    hasNoWeapons(): boolean;
    bareHandsElementId(): number;
    paramMax(paramId: number): number;
    paramBase(paramId: number): any; // TODO
    paramPlus(paramId: number): number;
    attackAnimationId1(): number;
    attackAnimationId2(): number;
    bareHandsAnimationId(): number;
    changeExp(exp: number, show: boolean): void;
    levelUp(): void;
    levelDown(): void;
    findNewSkills(lastSkills: any[]): any; // TODO
    displayLevelUp(newSkills: any[]): void; // TODO
    gainExp(exp: number): void;
    finalExpRate(): number;
    benchMembersExpRate(): number;
    shouldDisplayLevelUp(): boolean;
    changeLevel(level: number, show: boolean): void;
    learnSkill(skillId: number): void;
    forgetSkill(skillId: number): void;
    isLearnedSkill(skillId: number): boolean;
    changeClass(classId: number, keepExp: number): void;
    setCharacterImage(characterName: string, characterIndex: number): void;
    setFaceImage(faceName: string, faceIndex: number): void;
    setBattlerImage(battlerName: string): void;
    isSpriteVisible(): boolean;
    startAnimation(animationId: number, mirror: any, delay: number): void; // TODO
    performActionStart(aciton: any): void; // TODO
    performAction(aciton: any): void; // TODO
    performActionEnd(): void;
    performAttack(): void;
    performDamage(): void;
    performEvasion(): void;
    performMagicEvasion(): void;
    performCounter(): void;
    performCollapse(): void;
    performVictory(): void;
    performEscape(): void;
    makeActionList(): any[]; // TODO
    makeAutoBattleActions(): void;
    makeConfusionActions(): void;
    makeActions(): void;
    onPlayerWalk(): void;
    updateStateSteps(state: any): void; // TODO
    showAddedStates(): void;
    showRemovedStates(): void;
    stepsForTurn(): number;
    turnEndOnMap(): void;
    checkFloorEffect(): void;
    executeFloorDamage(): void;
    basicFloorDamage(): number;
    maxFloorDamage(): number;
    performMapDamage(): void;
    clearActions(): void;
    inputtingAction(): any; // TODO
    selectNextCommand(): boolean;
    selectPreviousCommand(): boolean;
    lastMenuSkill(): any; // TODO
    setLastMenuSkill(skill: any): void; // TODO
    lastBattleSkill(): any; // TODO
    setLastBattleSkill(skill: any): void; // TODO
    lastCommandSymbol(): any; // TODO
    setLastCommandSymbol(symbol: any): void; // TODO
}

declare class Game_Enemy extends Game_Battler
{
    initialize(): void;
    initialize(enemyId: number, x: number, y: number): void;
    initMembers(): void;
    setup(enemyId: number, x: number, y: number): void;
    isEnemy(): boolean;
    friendsUnit(): Game_Troop;
    opponentsUnit(): Game_Party;
    index(): number;
    isBattleMember(): boolean;
    enemyId(): number;
    enemy(): any; // TODO
    traitObjects(): any; // TODO
    paramBase(paramId: number): any; // TODO
    exp(): number;
    gold(): number;
    makeDropItems(): any; // TODO
    dropItemRate(): number;
    itemObject(kind: number, dataId: number): any; // TODO
    isSpriteVisible(): boolean;
    screenX(): number;
    screenY(): number;
    battlerName(): string;
    battlerHue(): any; // TODO
    originalName(): string;
    name(): string;
    isLetterEmpty(): string;
    setLetter(letter: string): void;
    setPlural(plural: string): void;
    performActionStart(action: any): void; // TODO
    performAction(action: any): void; // TODO
    performActionEnd(): void;
    performDamage(): void;
    performCollapse(): void;
    transform(enemyId: number): void;
    meetsCondition(action: any): boolean; // TODO
    meetsTurnCondition(param1: any, param2: any): boolean; // TODO
    meetsHpCondition(param1: any, param2: any): boolean; // TODO
    meetsMpCondition(param1: any, param2: any): boolean; // TODO
    meetsStateCondition(param: any): boolean; // TODO
    meetsPartyLevelCondition(param: any): boolean; // TODO
    meetsSwitchCondition(param: any): boolean; // TODO
    isActionValid(action: any): boolean;
    selectAction(actionList: any[], ratingZero: number): any; // TODO
    selectAllActions(actionList: any[]): void;
    makeActions(): void;
}

declare class Game_Actors
{
    initialize(): void;
    actor(actorId: number): Game_Actor;
}

declare class Game_Unit
{
    initialize(): void;
    inBattle(): boolean;
    members(): any[]; // TODO
    aliveMembers(): any[]; // TODO
    deadMembers(): any[]; // TODO
    movableMembers(): any[]; // TODO
    clearActions(): any[]; // TODO
    agility(): number;
    tgrSum(): number;
    randomTarget(): any; // TODO
    randomDeadTarget(): any; // TODO
    smoothTarget(): any; // TODO
    smoothDeadTarget(): any; // TODO
    clearResults(): void;
    onBattleStart(): void;
    onBattleEnd(): void;
    makeActions(): void;
    select(): void;
    isAllDead(): boolean;
    substituteBattler(): any; // TODO
}

declare class Game_Party extends Game_Unit
{
    static ABILITY_ENCOUNTER_HALF: number;
    static ABILITY_ENCOUNTER_NONE: number;
    static ABILITY_CANCEL_SURPRISE: number;
    static ABILITY_RAISE_PREEMPTIVE: number;
    static ABILITY_GOLD_DOUBLE: number;
    static ABILITY_DROP_ITEM_DOUBLE: number;

    initialize(): void;
    initAllItems(): void;
    exists(): boolean;
    size(): number;
    isEmpty(): boolean;
    members(): any[]; // TODO
    allMembers(): any[]; // TODO
    battleMembers(): any[]; // TODO
    maxBattleMembers(): number;
    leader(): any; // TODO
    reviveBattleMembers(): any[]; // TODO
    items(): any[]; // TODO
    weapons(): any[]; // TODO
    armors(): any[]; // TODO
    equipItems(): any[]; // TODO
    allItems(): any[]; // TODO
    itemContainer(item: any): any; // TODO
    setupStartingMembers(): any[]; // TODO
    name(): string;
    setupBattleTest(): void;
    setupBattleTestMembers(): any[]; // TODO
    setupBattleTestItems(): any[]; // TODO
    highestLevel(): number;
    addActor(actorId: number): void;
    removeActor(actorId: number): void;
    gold(): number;
    gainGold(amount: number): void;
    loseGold(amount: number): void;
    maxGold(): number;
    steps(): number;
    increaseSteps(): void;
    numItems(item: any): number; // TODO
    maxItems(item: any): number; // TODO
    hasMaxItems(item: any): boolean; // TODO
    hasItem(item: any, includeEquip?: boolean): boolean; // TODO
    isAnyMemberEquipped(item: any): boolean; // TODO
    gainItem(item: any, amount: number, includeEquip: boolean): void; // TODO
    discardMembersEquip(item: any, amount: number): void; // TODO
    loseItem(item: any, amount: number, includeEquip: boolean): void; // TODO
    consumeItem(item: any): void; // TODO
    canUse(item: any): boolean; // TODO
    canInput(): boolean;
    isAllDead(): boolean;
    onPlayerWalk(): void;
    menuActor(): any; // TODO
    setMenuActor(actor: any): void; // TODO
    makeMenuActorNext(): void;
    makeMenuActorPrevious(): void;
    targetActor(): any; // TODO
    setTargetActor(actor: any): void; // TODO
    lastItem(): any; // TODO
    setLastItem(item: any): void; // TODO
    swapOrder(index1: number, index2: number): void;
    charactersForSavefile(): any[]; // TODO
    facesForSavefile(): any[]; // TODO
    partyAbility(abilityId: number): boolean;
    hasEncounterHalf(): boolean;
    hasEncounterNone(): boolean;
    hasCancelSurprise(): boolean;
    hasRaisePreemptive(): boolean;
    hasGoldDouble(): boolean;
    hasDropItemDouble(): boolean;
    ratePreemptive(troopAgi: number): number;
    rateSurprise(troopAgi: number): number;
    performVictory(): void;
    performEscape(): void;
    removeBattleStates(): void;
    requestMotionRefresh(): void;
}

declare class Game_Troop extends Game_Unit
{
    static LETTER_TABLE_HALF: string[];
    static LETTER_TABLE_FULL: string[];

    initialize(): void;
    isEventRunning(): boolean;
    updateInterpreter(): void;
    turnCount(): number;
    members(): any[][]; // TODO
    clear(): void;
    troop(): any; // TODO
    setup(troopId: number): void;
    makeUniqueNames(): void;
    letterTable(): string[];
    enemyNames(): string[];
    meetsConditions(page: any): boolean; // TODO
    setupBattleEvent(): void;
    increaseTurn(): void;
    expTotal(): number;
    goldTotal(): number;
    goldRate(): number;
    makeDropItems(): any; // TODO
}

declare class Game_Map
{
    initialize(): void;
    setup(mapId: number): void;
    isEventRunning(): boolean;
    tileWidth(): number;
    tileHeight(): number;
    mapId(): number;
    tilesetId(): number;
    displayX(): number;
    displayY(): number;
    parallaxName(): string;
    battleback1Name(): string;
    battleback2Name(): string;
    requestRefresh(mapId: number): void;
    isNameDisplayEnabled(): boolean;
    disableNameDisplay(): void;
    enableNameDisplay(): void;
    createVehicles(): void;
    refereshVehicles(): void;
    vehicles(): Game_Vehicle[];
    vehicle(type: string): Game_Vehicle;
    boat(): Game_Vehicle;
    ship(): Game_Vehicle;
    airship(): Game_Vehicle;
    setupEvents(): void;
    events(): Game_Event[];
    event(eventId: number): Game_Event;
    eraseEvent(eventId: number): void;
    parallelCommonEvents(): any[]; // TODO
    setupScroll(): void;
    setupParallax(): void;
    setupBattleback(): void;
    setDisplayPos(x: number, y: number): void;
    parallaxOx(): number;
    parallaxOy(): number;
    tileset(): any; // TODO
    tilesetFlags(): any[]; // TODO
    displayName(): string;
    width(): number;
    height(): number;
    data(): any; // TODO
    isLoopHorizontal(): boolean;
    isLoopVertical(): boolean;
    isDashDisabled(): boolean;
    encounterList(): any; // TODO
    encounterStep(): any; // TODO
    isOverworld(): boolean;
    screenTileX(): number;
    screenTileY(): number;
    adjustX(x: number): number;
    adjustY(y: number): number;
    roundX(x: number): number;
    roundY(y: number): number;
    xWithDirection(x: number, d: number): number;
    yWithDirection(y: number, d: number): number;
    roundXWithDirection(x: number, d: number): number;
    roundYWithDirection(y: number, d: number): number;
    deltaX(x1: number, x2: number): number;
    deltaY(y1: number, y2: number): number;
    distance(x1: number, y1: number, x2: number, y2: number): number;
    canvasToMapX(x: number): number;
    canvasToMapY(y: number): number;
    autoplay(): void;
    refreshIfNeeded(): void;
    refresh(): void;
    refreshTileEvents(): void;
    eventsXy(x: number, y: number): Game_Event[];
    eventsXyNt(x: number, y: number): Game_Event[];
    tileEventsXy(x: number, y: number): any[]; // TODO
    eventIdXy(x: number, y: number): number;
    scrollDown(distance: number): void;
    scrollLeft(distance: number): void;
    scrollRight(distance: number): void;
    scrollUp(distance: number): void;
    isValid(x: number, y: number): boolean;
    checkPassage(x: number, y: number): boolean;
    tileId(x: number, y: number, z: number): any; // TODO
    layeredTiles(x: number, y: number): any; // TODO
    allTiles(x: number, y: number): any[]; // TODO
    autotileType(x: number, y: number, z: number): number;
    isPassable(x: number, y: number, d: number): boolean;
    isBoatPassable(x: number, y: number): boolean;
    isShipPassable(x: number, y: number): boolean;
    isAirshipLandOk(x: number, y: number): boolean;
    checkLayeredTilesFlags(x: number, y: number, bit: number): boolean;
    isLadder(x: number, y: number): boolean;
    isBush(x: number, y: number): boolean;
    isCounter(x: number, y: number): boolean;
    isDamageFloor(x: number, y: number): boolean;
    terrainTag(x: number, y: number): number;
    regionId(x: number, y: number): number;
    startScroll(direction: number, distance: number, speed: number): void;
    isScrolling(): boolean;
    update(sceneActive: boolean): void;
    updateScroll(): void;
    scrollDistance(): number;
    doScroll(direction: number, distance: number): void;
    updateEvents(): void;
    updateVehicles(): void;
    updateParallax(): void;
    changeTileset(tilesetId: number): void;
    changeBattleback(battleback1Name: string, battleback2Name: string): void;
    changeParallax(name: string, loopX: number, loopY: number, sx: number, sy: number): void;
    updateInterpreter(): void;
    unlockEvent(eventId: number): void;
    setupStartingEvent(): boolean;
    setupTestEvent(): boolean;
    setupStartingMapEvent(): boolean;
    setupAutorunCommonEvent(): boolean;
    isAnyEventStarting(): boolean;
}

declare class Game_CommonEvent
{
    initialize(commonEventId: void): void;
    event(): any; // TODO
    list(): any; // TODO
    refresh(): void;
    isActive(): boolean;
    update(): void;
}

declare class Game_CharacterBase
{
    x: number;
    y: number;
    initialize(): void;
    initMembers(): void;
    pos(x: number, y: number): boolean;
    posNt(x: number, y: number): boolean;
    moveSpeed(): number;
    setMoveSpeed(moveSpeed: number): void;
    moveFrequency(): number;
    setMoveFrequency(moveFrequency: number): void;
    opacity(): number;
    setOpacity(opacity: number): void;
    blendMode(): number;
    setBlendMode(blendMode: number): void;
    isNormalPriority(): boolean;
    setPriorityType(priorityType: number): void;
    isMoving(): boolean;
    isJumping(): boolean;
    jumpHeight(): number;
    isStopping(): boolean;
    checkStop(threshold: number): boolean;
    resetStopCount(): void;
    realMoveSpeed(): number;
    distancePerFrame(): number;
    isDashing(): boolean;
    isDebugThrough(): boolean;
    straighten(): void;
    reverseDir(d: number): number;
    canPass(x: number, y: number, d: number): boolean;
    canPassDiagonally(x: number, y: number, horz: number, vert: number): boolean;
    isMapPassable(x: number, y: number, d: number): boolean;
    isCollidedWithCharacters(x: number, y: number): boolean;
    isCollidedWithEvents(x: number, y: number): boolean;
    isCollidedWithVehicles(x: number, y: number): boolean;
    setPosition(x: number, y: number): void;
    copyPosition(character: any): void; // TODO
    locate(x: number, y: number): void;
    direction(): number;
    setDirection(d: number): void;
    isTile(): boolean;
    isObjectCharacter(): boolean;
    shiftY(): number;
    scrolledX(): number;
    scrolledY(): number;
    screenX(): number;
    screenY(): number;
    screenZ(): number;
    isNearTheScreen: boolean;
    update(): void;
    updateStop(): void;
    updateJump(): void;
    updateMove(): void;
    updateAnimation(): void;
    animationWait(): number;
    updateAnimationCount(): void;
    updatePattern(): void;
    maxPattern(): number;
    pattern(): number;
    setPattern(pattern: number): void;
    isOriginalPattern(): boolean;
    resetPattern(): void;
    refreshBushDepth(): void;
    isOnLadder(): boolean;
    isOnBush(): boolean;
    terrainTag(): boolean;
    regionId(): boolean;
    increaseSteps(): void;
    tileId(): void;
    characterName(): string;
    characterIndex(): number;
    setImage(characterName: string, characterIndex: number): void;
    setTileImage(tileId: number): void;
    checkEventTriggerTouchFront(d: number): void;
    checkEventTriggerTouch(x: number, y: number): boolean;
    isMovementSucceeded(x: number, y: number): boolean;
    setMovementSuccess(success: boolean): void;
    moveStraight(d: number): void;
    moveDiagonally(horz: number, vert: number): void;
    jump(xPlus: number, yPlus: number): void;
    hasWalkAnime(): boolean;
    setWalkAnime(walkAnime: boolean): void;
    hasStepAnime(): boolean;
    setStepAnime(stepAnime: boolean): void;
    isDirectionFixed(): boolean;
    setDirectionFix(directionFix: boolean): void;
    isThrough(): boolean;
    setThrough(through: boolean): void;
    isTransparent(): boolean;
    bushDepth(): number;
    setTransparent(transparent: boolean): void;
    requestAnimation(animationId: number): void;
    requestBalloon(balloonId: number): void;
    animationId(): number;
    balloonId(): number;
    startAnimation(): void;
    startBalloon(): void;
    isAnimationPlaying(): boolean;
    isBalloonPlaying(): boolean;
    endAnimation(): void;
    endBalloon(): void;
}

declare class Game_Character extends Game_CharacterBase
{
    static ROUTE_END: number;
    static ROUTE_MOVE_DOWN: number;
    static ROUTE_MOVE_LEFT: number;
    static ROUTE_MOVE_RIGHT: number;
    static ROUTE_MOVE_UP: number;
    static ROUTE_MOVE_LOWER_L: number;
    static ROUTE_MOVE_LOWER_R: number;
    static ROUTE_MOVE_UPPER_L: number;
    static ROUTE_MOVE_UPPER_R: number;
    static ROUTE_MOVE_RANDOM: number;
    static ROUTE_MOVE_TOWARD: number;
    static ROUTE_MOVE_AWAY: number;
    static ROUTE_MOVE_FORWARD: number;
    static ROUTE_MOVE_BACKWARD: number;
    static ROUTE_JUMP: number;
    static ROUTE_WAIT: number;
    static ROUTE_TURN_DOWN: number;
    static ROUTE_TURN_LEFT: number;
    static ROUTE_TURN_RIGHT: number;
    static ROUTE_TURN_UP: number;
    static ROUTE_TURN_90D_R: number;
    static ROUTE_TURN_90D_L: number;
    static ROUTE_TURN_180D: number;
    static ROUTE_TURN_90D_R_L: number;
    static ROUTE_TURN_RANDOM: number;
    static ROUTE_TURN_TOWARD: number;
    static ROUTE_TURN_AWAY: number;
    static ROUTE_SWITCH_ON: number;
    static ROUTE_SWITCH_OFF: number;
    static ROUTE_CHANGE_SPEED: number;
    static ROUTE_CHANGE_FREQ: number;
    static ROUTE_WALK_ANIME_ON: number;
    static ROUTE_WALK_ANIME_OFF: number;
    static ROUTE_STEP_ANIME_ON: number;
    static ROUTE_STEP_ANIME_OFF: number;
    static ROUTE_DIR_FIX_ON: number;
    static ROUTE_DIR_FIX_OFF: number;
    static ROUTE_THROUGH_ON: number;
    static ROUTE_THROUGH_OFF: number;
    static ROUTE_TRANSPARENT_ON: number;
    static ROUTE_TRANSPARENT_OFF: number;
    static ROUTE_CHANGE_IMAGE: number;
    static ROUTE_CHANGE_OPACITY: number;
    static ROUTE_CHANGE_BLEND_MODE: number;
    static ROUTE_PLAY_SE: number;
    static ROUTE_SCRIPT: number;

    initialize(): void;
    initMembers(): void;
    memorizeMoveRoute(); void;
    restoreMoveRoute(): void;
    isMoveRouteForcing(): boolean;
    setMoveRoute(moveRoute: any): void; // TODO
    forceMoveRoute(moveRoute: any): void; // TODO
    updateStop(): void;
    updateRoutineMove(): void;
    processMoveCommand(command: any): void // TODO
    deltaXFrom(x: number): number;
    deltaYFrom(y: number): number;
    moveRandom(): void;
    moveTowardCharacter(character: any): void; // TODO
    moveAwayFromCharacter(character: any): void; // TODO
    turnTowardCharacter(character: any): void; // TODO
    turnAwayFromCharacter(character: any): void; // TODO
    turnTowardPlayer(): void;
    turnAwayFromPlayer(): void;
    moveTowardPlayer(): void;
    moveAwayFromPlayer(): void;
    moveForward(): void;
    moveBackward(): void;
    processRouteEnd(): void;
    advanceMoveRouteIndex(): void;
    turnRight90(): void;
    turnLeft90(): void;
    turn180(): void;
    turnRightOrLeft90(): void;
    turnRandom(): void;
    findDirectionTo(goalX: number, goalY: number): number;
    searchLimit(): number;
}

declare class Game_Player extends Game_Character
{
    initialize(): void;
    initMembers(): void;
    clearTransferInfo(): void;
    followers(): Game_Followers;
    refresh(): void;
    isStopping(): boolean;
    reserveTransfer(mapId: number, x: number, y: number, d: number, fadeType: number): void;
    requestMapReload(): void;
    isTransferring(): boolean;
    newMapId(): number;
    fadeType(): number;
    performTransfer(): void;
    isMapPassable(x: number, y: number, d: number): boolean;
    vehicle(): any; // TODO
    isInBoat(): boolean;
    isInShip(): boolean;
    isInAirship(): boolean;
    isInVehicle(): boolean;
    isNormal(): boolean;
    isDashing(): boolean;
    isDebugThrough(): boolean;
    isCollided(x: number, y: number): boolean;
    centerX(): number;
    centerY(): number;
    center(x: number, y: number): void;
    locate(x: number, y: number): void;
    increaseSteps(): void;
    makeEncounterCount(): void;
    makeEncounterTroopId(): number;
    meetsEncounterConditions(encounter: any): boolean; // TODO
    executeEncounter(): boolean;
    startMapEvent(x: number, y: number, triggers: number[], normal: boolean): void;
    moveByInput(): void;
    canMove(): boolean;
    getInputDirection(): number; // TODO 要検証
    executeMove(direction: number): void;
    update(): void;
    update(sceneActive: boolean): void;
    updateDashing(): void;
    isDashButtonPressed(): boolean;
    updateScroll(lastScrolledX: number, lastScrolledY: number): void;
    updateVehicle(): void;
    updateVehicleGetOn(): void;
    updateVehicleGetOff(): void;
    updateNonmoving(wasMoving: boolean): void;
    triggerAction(): boolean;
    triggerButtonAction(): boolean;
    triggerTouchAction(): boolean;
    triggerTouchActionD1(x1: number, y1: number): boolean;
    triggerTouchActionD2(x2: number, y2: number): boolean;
    triggerTouchActionD3(x2: number, y2: number): boolean;
    updateEncounterCount(): void;
    canEncounter(): boolean;
    encounterProgressValue(): number;
    checkEventTriggerHere(triggers: number[]): void;
    checkEventTriggerThere(triggers: number[]): void;
    checkEventTriggerTouch(x: number, y: number): boolean;
    checkEventTriggerTouch(x: number, y: number): void;
    canStartLocalEvents(): boolean;
    getOnOffVehicle(): boolean;
    getOnVehicle(): boolean;
    getOffVehicle(): boolean;
    forceMoveForward(): void;
    isOnDamageFloor(): boolean;
    moveStraight(): void;
    moveDiagonally(): void;
    jump(xPlus: number, yPlus: number): void;
    showFollowers(): void;
    hideFollowers(): void;
    gatherFollowers(): void;
    areFollowersGathering(): boolean;
    areFollowersGathered(): boolean;
}

declare class Game_Follower extends Game_Character
{
    initialize(): void;
    refresh(): void;
    actor(): any; // TODO
    isVisible(): boolean;
    update(): void;
    chaseCharacter(character: any): void; // TODO
}

declare class Game_Followers extends Game_Character
{
    initialize(): void;
    isVisible(): boolean;
    show(): void;
    hide(): void;
    follower(index: number): Game_Follower;
    forEach(callback: Function, thisObject: this);
    reverseEach(callback: Function, thisObject: this);
    refresh(): void;
    update(): void;
    updateMove(): void;
    jumpAll(): void;
    synchronize(x: number, y: number, d: number);
    gather(): void;
    areGathering(): boolean;
    visibleFollowers(): boolean;
    areMoving(): boolean;
    areGathered(): boolean;
    isSomeoneCollided(): boolean;
}

declare class Game_Vehicle extends Game_Character
{
    initialize(): void;
    initMembers(): void;
    isBoat(): boolean;
    isShip(): boolean;
    isAirship: boolean;
    resetDirection(): void;
    initMoveSpeed(): void;
    vehicle(): Game_Vehicle;
    loadSystemSettings(): void;
    refresh(): void;
    setLocation(mapId: number, x: number, y: number): void;
    pos(x: number, y: number): boolean;
    isMapPassable(x: number, y: number, d: number): boolean;
    getOn(): void;
    getOff(): void;
    setBgm(bgm: any): void; // TODO
    playBgm(): void;
    syncWithPlayer(): void;
    screenY(): number;
    shadowX(): number;
    shadowY(): number;
    shadowOpacity(): number;
    canMove(): boolean;
    update(): void;
    updateAirship(): void;
    updateAirshipAltitude(): void;
    maxAltitude(): number;
    isLowest(): boolean;
    isHighest(): boolean;
    isTakeoffOk(): boolean;
    isLandOk(x: number, y: number, d: number): boolean;
}

declare class Game_Event extends Game_Character
{
    initialize();
    initialize(mapId: number, eventId: number): void;
    initMembers(): void;
    eventId(): number;
    event(): any; // TODO
    page(): any; // TODO
    list(): any; // TODO
    isCollidedWithCharacters(): boolean;
    isCollidedWithEvents(): boolean;
    isCollidedWithPlayerCharacters(): boolean;
    lock(): void;
    unlock(): void;
    updateStop(): void;
    updateSelfMovement(): void;
    stopCountThreshold(): number;
    moveTypeRandom(): void;
    moveTypeTowardPlayer(): void;
    isNearThePlayer(): number;
    moveTypeCustom(): void;
    isStarting(): boolean;
    clearStartingFlag(): void;
    isTriggerIn(triggers: number[]): boolean;
    start(): void;
    erase(): void;
    refresh(): void;
    findProperPageIndex(): number;
    meetsConditions(page: any): boolean;
    setupPage(): void;
    clearPageSettings(): void;
    setupPageSettings(): void;
    isOriginalPattern(): boolean;
    resetPattern(): void;
    checkEventTriggerTouch(x: number, y: number): void;
    checkEventTriggerTouch(x: number, y: number): boolean;
    checkEventTriggerAuto(): void;
    update(): void;
    updateParallel(): void;
    locate(x: number, y: number): void;
    forceMoveRoute(moveRoute: any): void; // TODO
}

declare class Game_Interpreter
{
    initialize(depth: number): void;
    checkOverflow(): void;
    clear(): void;
    setup(list: any, eventId: number): void;
    eventId(): number;
    isOnCurrentMap(): boolean;
    setupReservedCommonEvent(): boolean;
    isRunning(): boolean;
    update(): void;
    updateChild(): boolean;
    updateWait(): boolean;
    updateWaitCount(): boolean;
    updateWaitMode(): boolean;
    setWaitMode(waitMode: string): void;
    wait(duration: number): void;
    fadeSpeed(): number;
    executeCommand(): boolean;
    checkFreeze(): boolean;
    terminate(): void;
    skipBranch(): void;
    currentCommand(): any;
    nextEventCode(): number;
    iterateActorId(param: any, callback: Function): void;
    iterateActorIdEx(param1: any, param2: any, callback: Function): void;
    iterateActorIndex(param: any, callback: Function): void;
    iterateEnemyIndex(param: any, callback: Function): void;
    iterateBattler(param1: any, param2: any, callback: Function): void;
    character(param: any): any; // TODO
    operateValue(operation: number, operandType: number, operand: number): number;
    changeHp(target: any, value: number, allowDeath: boolean): void; // TODO
    command101(): boolean;
    command102(): boolean;
    setupChoices(params: any): void;
    command402(): boolean;
    command403(): boolean;
    command103(): boolean;
    setupNumInput(params: any): void;
    command104(): boolean;
    setupItemChoice(params: any): void;
    command105(): boolean;
    command108(): boolean;
    command111(): boolean;
    command411(): boolean;
    command112(): boolean;
    command413(): boolean;
    command113(): boolean;
    command115(): boolean;
    command117(): boolean;
    setupChild(list: any, eventId: number): void;
    command118(): boolean;
    command119(): boolean;
    jumpTo(index: number): void;
    command121(): boolean;
    command122(): boolean;
    gameDataOperand(type: number, param1: any, param2: any): number;
    operateVariable(variableId: number, operationType: number, value: number): void;
    command123(): boolean;
    command124(): boolean;
    command125(): boolean;
    command126(): boolean;
    command127(): boolean;
    command128(): boolean;
    command129(): boolean;
    command132(): boolean;
    command133(): boolean;
    command134(): boolean;
    command135(): boolean;
    command136(): boolean;
    command137(): boolean;
    command138(): boolean;
    command139(): boolean;
    command140(): boolean;
    command201(): boolean;
    command202(): boolean;
    command203(): boolean;
    command204(): boolean;
    command205(): boolean;
    command206(): boolean;
    command211(): boolean;
    command212(): boolean;
    command213(): boolean;
    command214(): boolean;
    command216(): boolean;
    command217(): boolean;
    command221(): boolean;
    command222(): boolean;
    command223(): boolean;
    command224(): boolean;
    command225(): boolean;
    command230(): boolean;
    command231(): boolean;
    command232(): boolean;
    command233(): boolean;
    command234(): boolean;
    command235(): boolean;
    command236(): boolean;
    command241(): boolean;
    command242(): boolean;
    command243(): boolean;
    command244(): boolean;
    command245(): boolean;
    command246(): boolean;
    command249(): boolean;
    command250(): boolean;
    command251(): boolean;
    command261(): boolean;
    videoFileExt(): string;
    command281(): boolean;
    command282(): boolean;
    command283(): boolean;
    command284(): boolean;
    command285(): boolean;
    command301(): boolean;
    command601(): boolean;
    command602(): boolean;
    command603(): boolean;
    command302(): boolean;
    command302(): boolean;
    command311(): boolean;
    command312(): boolean;
    command326(): boolean;
    command313(): boolean;
    command314(): boolean;
    command315(): boolean;
    command316(): boolean;
    command317(): boolean;
    command318(): boolean;
    command319(): boolean;
    command320(): boolean;
    command321(): boolean;
    command322(): boolean;
    command323(): boolean;
    command324(): boolean;
    command325(): boolean;
    command331(): boolean;
    command332(): boolean;
    command342(): boolean;
    command333(): boolean;
    command334(): boolean;
    command335(): boolean;
    command336(): boolean;
    command337(): boolean;
    command339(): boolean;
    command340(): boolean;
    command351(): boolean;
    command352(): boolean;
    command353(): boolean;
    command354(): boolean;
    command355(): boolean;
    command356(): boolean;
    pluginCommand(command: string, args: string[]): void;
}