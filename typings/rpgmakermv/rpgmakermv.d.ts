/// <reference types="pixi-tilemap" />
/// <reference path="../lib/lib.dom.d.ts" />

declare class JsExtensions
{
    private constructor();
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
    private constructor();

    static RPGMAKER_NAME: string;
    static RPGMAKER_VERSION: string;
    static isOptionValid(name: string): boolean;
    static isNwjs(): boolean;
    static isMobileDevice(): boolean;
    static isMobileSafari(): boolean;
    static isAndroidChrome(): boolean;
    static canReadGameFiles(): boolean;
    static rgbToCssColor(r: number, g: number, b: number): string;
    static generateRuntimeId(): number;
    static isSupportPassiveEvent(): boolean;

    static _id: number;
    static _supportPassiveEvent: boolean;
}

declare interface IImageCacheItem
{
    bitmap: Bitmap;
    touch: number;
    key: string;
}

declare class ImageCache
{
    static limit: number;

    initialize(): void;
    add(key: string, value: Bitmap): void;
    get(key: string): Bitmap;
    reserve(key: string, value: Bitmap, reservationId: number): void;
    releaseReservation(reservationId: number): void;
    isReady(): boolean;
    getErrorBitmap(): Bitmap;

    _truncateCache(): void;
    _mustBeHeld(item: IImageCacheItem): boolean;
}

declare class RequestQueue
{
    constructor();
    initialize(): void;
    enqueue(key: string, value: Bitmap): void;
    update(): void;
    raisePriority(key: string): void;
    clear(): void;
}

declare class CacheEntry
{
    cache: CacheMap;
    key: string;
    item: Bitmap | Html5Audio | WebAudio;
    cached: boolean;
    touchTicks: number;
    touchSeconds: number;
    ttlTicks: number;
    ttlSeconds: number;
    freedByTTL: boolean;

    constructor(cache: CacheMap, key: string, item: Bitmap | Html5Audio | WebAudio);
    free(byTTL?: boolean): void;
    allocate(): CacheEntry;
    setTimeToLive(ticks?: number, seconds?: number): CacheEntry;
    isStillAlive(): boolean;
    touch(): void;
}

declare class CacheMap
{
    _inner: { [key: string]: CacheEntry };
    _lastRemovedEntries:  CacheEntry[];

    manager: typeof DataManager | typeof ConfigManager | typeof StorageManager | typeof ImageManager | typeof AudioManager | typeof SoundManager | typeof TextManager | typeof SceneManager | typeof BattleManager | typeof PluginManager;
    updateTicks: number;
    lastCheckTTL: number;
    delayCheckTTL: number;
    updateSeconds: number;

    constructor(manager: typeof DataManager | typeof ConfigManager | typeof StorageManager | typeof ImageManager | typeof AudioManager | typeof SoundManager | typeof TextManager | typeof SceneManager | typeof BattleManager | typeof PluginManager);
    checkTTL(): void;
    getItem(key: string): any;
    clear(): void;
    setItem(key: string, item: any): CacheEntry;
    update(ticks: number, delta: number): void;
}

declare class Point extends PIXI.Point
{
    constructor(x?: number, y?: number);
    initialize(x?: number, y?: number): void;
}

declare class Rectangle extends PIXI.Rectangle
{
    static emptyRectangle: Rectangle;

    constructor(x?: number, y?: number, width?: number, height?: number);
    initialize(x?: number, y?: number, width?: number, height?: number): void;
}

declare class Bitmap
{
    static _reuseImages: HTMLImageElement[];
    static load(url: string): Bitmap;
    static snap(stage: Stage): Bitmap;
    static request(url: string): Bitmap;

    url: string;
    baseTexture: PIXI.BaseTexture;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    rect: Rectangle;
    smooth: boolean;
    paintOpacity: number;
    cacheEntry: CacheEntry;
    fontFace: string;
    fontSize: number;
    fontItalic: boolean;
    textColor: string;
    outlineColor: string;
    outlineWidth: number;

    constructor(width?: number, height?: number);
    initialize(width?: number, height?: number): void;
    isReady(): boolean;
    isError(): boolean;
    touch(): void;
    resize(width: number, height: number): void;
    blt(source: Bitmap, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw?: number, dh?: number): void;
    bltImage(source: Bitmap, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw?: number, dh?: number): void;
    getPixel(x: number, y: number): string;
    getAlphaPixel(x: number, y: number): string;
    clearRect(x: number, y: number, width: number, height: number): void;
    clear(): void;
    fillRect(x: number, y: number, width: number, height: number, color: String): void;
    fillAll(color: string): void;
    gradientFillRect(x: number, y: number, width: number, height: number, color1: String, color2: string, vertical: boolean): void;
    drawCircle(x: number, y: number, radius: number, color: string): void;
    drawText(text: string, x: number, y: number, maxWidth?: number, lineHeight?: number, align?: string): void;
    measureTextWidth(text: string): number;
    adjustTone(r: number, g: number, b: number): void;
    rotateHue(offset: number): void;
    blur(): void;
    addLoadListener(listener: Function): void;
    checkDirty(): void;
    isRequestOnly(): boolean;
    isRequestReady(): boolean;
    startRequest(): void;

    _canvas: HTMLCanvasElement;
    _context: CanvasRenderingContext2D;
    _baseTexture: PIXI.BaseTexture;
    _image: HTMLImageElement;
    _url: string;
    _paintOpacity: number;
    _smooth: boolean;
    _loadListeners: Function[];
    _loadingState: string;
    _decodeAfterRequest: boolean;

    _makeFontNameText(): string;
    _drawTextOutline(text: string, tx: number, ty: number, maxWidth: number): void;
    _drawTextBody(text: string, tx: number, ty: number, maxWidth: number): void;
    _onLoad(): void;
    _callLoadListeners(): void;
    _onError(): void;
    _setDirty(): void;
    _createCanvas(width: number, height: number): void;
    _createBaseTexture(source: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement): void;
    _clearImgInstance(): void;
    _renewCanvas(): void;
    _requestImage(url: string): void;
}

declare var waitForLoading: boolean;
declare var register: boolean;

declare class Graphics
{
    private constructor();

    static frameCount: number;
    static BLEND_NORMAL: number;
    static BLEND_ADD: number;
    static BLEND_MULTIPLY: number;
    static BLEND_SCREEN: number;
    static width: number;
    static height: number;
    static boxWidth: number;
    static boxHeight: number;
    static scale: number;

    static initialize(width?: number, height?: number, type?: string): void;
    static tickStart(): void;
    static tickEnd(): void;
    static render(stage: Stage): void;
    static isWebGL(): boolean;
    static hasWebGL(): boolean;
    static canUseDifferenceBlend(): boolean;
    static canUseSaturationBlend(): boolean;
    static setLoadingImage(src: string): void;
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
    static pageToCanvasY(y: number): number;
    static isInsideCanvas(x: number, y: number): boolean;
    static callGC(): void;
    static canUseCssFontLoading(): boolean;
    static printLoadingError(url: string): void;
    static eraseLoadingError(): void;
    static setVideoVolume(value: number): void;
    static _setupCssFontLoading(): void;
    static _onTouchEnd(event: TouchEvent): void;

    static _width: number;
    static _height: number;
    static _rendererType: string;
    static _boxWidth: number;
    static _boxHeight: number;
    static _scale: number;
    static _realScale: number;
    static _errorShowed: boolean;
    static _errorPrinter: HTMLParagraphElement;
    static _canvas: HTMLCanvasElement;
    static _video: HTMLVideoElement;
    static _videoUnlocked: boolean;
    static _videoLoading: boolean;
    static _upperCanvas: HTMLCanvasElement;
    static _renderer: PIXI.SystemRenderer;
    static _fpsMeter: any;
    static _modeBox: HTMLDivElement;
    static _skipCount: number;
    static _maxSkip: number;
    static _rendered: boolean;
    static _loadingImage: HTMLImageElement;
    static _loadingCount: number;
    static _fpsMeterToggled: boolean;
    static _stretchEnabled: boolean;
    static _canUseDifferenceBlend: boolean;
    static _canUseSaturationBlend: boolean;
    static _hiddenCanvas: HTMLCanvasElement;
    static _cssFontLoading: boolean;
    static _fontLoaded: any; // FontFaceSet
    static _videoVolume: number;

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
    private constructor();

    static keyRepeatWait: number;
    static keyRepeatInterval: number;
    static keyMapper: { [key: number]: string };
    static gamepadMapper: { [key: number]: string };

    static initialize(): void;
    static clear(): void;
    static update(): void;
    static isPressed(keyName: string): boolean;
    static isTriggered(keyName: string): boolean;
    static isRepeated(keyName: string): boolean;
    static isLongPressed(keyName: string): boolean;

    static dir4: number;
    static dir8: number;
    static date: number;

    static _currentState: { [key: string]: boolean };
    static _previousState: { [key: string]: boolean };
    static _gamepadStates: boolean[][];
    static _latestButton: string;
    static _pressedTime: number;
    static _dir4: number;
    static _dir8: number;
    static _preferredAxis: string;
    static _date: number

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

declare interface IDataTouchInput
{
    triggered: boolean;
    cancelled: boolean;
    moved: boolean;
    released: boolean;
    wheelX: number;
    wheelY: number;
}

declare class TouchInput
{
    private constructor();

    static keyRepeatWait: number;
    static keyRepeatInterval: number;

    static initialize(): void;
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
    static _mousePressed: boolean;
    static _screenPressed: boolean;
    static _pressedTime: number;
    static _events: IDataTouchInput;
    static _triggered: boolean;
    static _cancelled: boolean;
    static _moved: boolean;
    static _released: boolean;
    static _wheelX: number;
    static _wheelY: number;
    static _x: number;
    static _y: number;
    static _date: number;

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
    static _counter: number;

    bitmap: Bitmap;
    width: number;
    height: number;
    opacity: number;

    constructor(bitmap?: Bitmap);
    initialize(bitmap?: Bitmap): void;
    update(): void;
    move(x: number, y: number): void;
    setFrame(x: number, y: number, width: number, height: number): void;
    getBlendColor(): number[];
    setBlendColor(color: number[]): void;
    getColorTone(): number[];
    setColorTone(tone: number[]): void;
    // 1.3.2で削除 updateTransform(): void;

    _bitmap: Bitmap;
    _frame: Rectangle;
    _realFrame: Rectangle;
    _offset: Point;
    _blendColor: number[];
    _colorTone: number[];
    _canvas: HTMLCanvasElement;
    _context: CanvasRenderingContext2D;
    _tintTexture: PIXI.BaseTexture;

    _onBitmapLoad(bitmapLoaded: Bitmap): void;
    _refresh(): void;
    _isInBitmapRect(x: number, y: number, w: number, h: number): boolean;
    _needsTint(): boolean;
    _createTinter(w: number, h: number): void;
    _executeTint(x: number, y: number, w: number, h: number): void;
    _renderCanvas_PIXI(renderer: PIXI.CanvasRenderer): void;
    _renderWebGL_PIXI(renderer: PIXI.WebGLRenderer): void;
    _renderCanvas(renderer: PIXI.CanvasRenderer): void;
    _speedUpCustomBlendModes(renderer: PIXI.CanvasRenderer): void;
    _renderWebGL(renderer: PIXI.WebGLRenderer): void;
}

declare class Tilemap extends PIXI.Container
{
    width: number;
    height: number;
    tileWidth: number;
    tileHeight: number;
    bitmaps: Bitmap[];
    origin: Point;
    flags: { [key: number]: boolean };
    animationCount: number;
    animationFrame: number;
    horizontalWrap: boolean;
    verticalWrap: boolean;

    constructor();
    initialize(): void;
    setData(width: number, height: number, data: number[]): void;
    isReady(): boolean;
    update(): void;
    refresh(): void;
    refreshTileset(): void;
    updateTransform(): void;

    _margin: number;
    _width: number;
    _height: number;
    _tileWidth: number;
    _tileHeight: number;
    _mapWidth: number;
    _mapHeight: number;
    _mapData: number[];
    _layerWidth: number;
    _layerHeight: number;
    _lastTiles: number[][][][];
    _needsRepaint: boolean;
    _lastAnimationFrame: number;
    _lastStartX: number;
    _lastStartY: number;
    _frameUpdated: boolean;
    _lowerBitmap: Bitmap;
    _upperBitmap: Bitmap;
    _lowerLayer: Sprite;
    _upperLayer: Sprite;

    _createLayers(): void;
    _updateLayerPositions(startX: number, startY: number): void;
    _paintAllTiles(startX: number, startY: number): void;
    _paintTiles(startX: number, startY: number, x: number, y: number): void;
    _readLastTiles(i: number, x: number, y: number): number[];
    _writeLastTiles(i: number, x: number, y: number, tiles: number[]): void;
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
    _compareChildOrder(a: Sprite, b: Sprite): number;

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
    roundPixels: boolean;
    animationFrame: number;
    lowerZLayer: PIXI.tilemap.ZLayer;
    upperZLayer: PIXI.tilemap.ZLayer;

    _lastBitmapLength: number;

    constructor();
    renderCanvas(renderer: PIXI.CanvasRenderer): void;
    renderWebGL(renderer: PIXI.WebGLRenderer): void;
    refresh(): void;
    refreshTileset(): void;
    updateTransform(): void;

    _hackRenderer(renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer): PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    _createLayers(): void;
    _updateLayerPositions(startX: number, startY: number): void;
    _paintAllTiles(startX: number, startY: number): void;
    _paintTiles(startX: number, startY: number, x: number, y: number): void;
    _drawTile(bitmap: Bitmap, tileId: number, dx: number, dy: number): void;
    _drawTile(layer: PIXI.tilemap.RectTileLayer, tileId: number, dx: number, dy: number): void;
    _drawNormalTile(bitmap: Bitmap, tileId: number, dx: number, dy: number): void;
    _drawNormalTile(layer: PIXI.tilemap.RectTileLayer, tileId: number, dx: number, dy: number): void;
    _drawAutotile(bitmap: Bitmap, tileId: number, dx: number, dy: number): void;
    _drawAutotile(layer: PIXI.tilemap.RectTileLayer, tileId: number, dx: number, dy: number): void;
    _drawTableEdge(bitmap: Bitmap, tileId: number, dx: number, dy: number): void;
    _drawTableEdge(layer: PIXI.tilemap.RectTileLayer, tileId: number, dx: number, dy: number): void;
    _drawShadow(bitmap: Bitmap, shadowBits: number, dx: number, dy: number): void;
    _drawShadow(layer: PIXI.tilemap.RectTileLayer, shadowBits: number, dx: number, dy: number): void;
}

declare class TilingSprite extends PIXI.extras.TilingSprite
{
    bitmap: Bitmap;
    opacity: number;
    spriteId: number;
    origin: Point;

    _bitmap: Bitmap;
    _width: number;
    _height: number;
    _frame: Rectangle;

    _renderCanvas_PIXI(renderer: PIXI.CanvasRenderer): void;
    _renderWebGL_PIXI(renderer: PIXI.WebGLRenderer): void;
    _renderCanvas(renderer: PIXI.CanvasRenderer): void;
    _renderWebGL(renderer: PIXI.WebGLRenderer): void;
    _onBitmapLoad(): void;
    _refresh(): void;

    constructor(bitmap: Bitmap);
    initialize(bitmap: Bitmap): void;
    update(): void;
    move(x?: number, y?: number, width?: number, height?: number): void;
    setFrame(x: number, y: number, width: number, height: number): void;
    updateTransform(): void;
    updateTransformTS(): void;
}

declare class ScreenSprite extends PIXI.Container
{
    static YEPWarned: boolean;
    static warnYep(): void;

    _graphics: PIXI.Graphics;
    _red: number;
    _green: number;
    _blue: number;
    _colorText: string;

    opacity: number;
    anchor: number;
    blendMode: number;

    constructor();
    initialize(): void;
    setBlack(): void;
    setWhite(): void;
    setColor(r?: number, g?: number, b?: number): void;
}

declare class Window extends PIXI.Container
{
    _isWindow: boolean;
    _windowskin: Bitmap;
    _width: number;
    _height: number;
    _cursorRect: Rectangle;
    _openness: number;
    _animationCount: number;
    _padding: number;
    _margin: number;
    _colorTone: number[];
    _windowSpriteContainer: PIXI.Container;
    _windowBackSprite: Sprite;
    _windowCursorSprite: Sprite;
    _windowFrameSprite: Sprite;
    _windowContentsSprite: Sprite;
    _windowArrowSprites: Sprite[];
    _windowPauseSignSprite: Sprite;

    active: boolean;
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
    origin: Point;
    downArrowVisible: boolean;
    upArrowVisible: boolean;
    pause: boolean;

    constructor();
    initialize(): void;
    update(): void;
    move(x?: number, y?: number, width?: number, height?: number): void;
    isOpen(): boolean;
    isClosed(): boolean;
    setCursorRect(x?: number, y?: number, width?: number, height?: number): void;
    setTone(r: number, g: number, b: number): void;
    addChildToBack(child: PIXI.DisplayObject): PIXI.DisplayObject;
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
    static voidFilter: PIXI.filters.VoidFilter;

    _width: number;
    _height: number;
    _tempCanvas: HTMLCanvasElement;
    _translationMatrix: number[];
    _windowMask: PIXI.Graphics;
    _windowRect: PIXI.Rectangle;
    _renderSprite: Sprite;

    width: number;
    height: number;
    filterArea: PIXI.Rectangle;

    constructor();
    initialize(): void;
    move(x: number, y: number, width: number, height: number): void;
    update(): void;
    renderCanvas(renderer: PIXI.CanvasRenderer): void;
    renderWebGL(renderer: PIXI.WebGLRenderer): void;
    onRemoveAsAChild(): void;

    _canvasClearWindowRect(renderSession: PIXI.CanvasRenderer, window: Window): void;
    _maskWindow(window: Window, shift: PIXI.Point): void;
}

declare class Weather extends PIXI.Container
{
    _width: number;
    _height: number;
    _sprites: Sprite[];
    _rainBitmap: Bitmap;
    _stormBitmap: Bitmap;
    _snowBitmap: Bitmap;
    _dimmerSprite: ScreenSprite;

    type: string;
    power: number;
    origin: Point;

    constructor();
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
    constructor();
    adjustHue(value: number): void;
    adjustSaturation(value?: number): void;
    adjustTone(r?: number, g?: number, b?: number): void;
}

declare class ToneSprite extends PIXI.Container
{
    constructor();
    initialize(): void;
    clear(): void;
    setTone(r?: number, g?: number, b?: number, gray?: number): void;

    _red: number;
    _green: number;
    _blue: number;
    _gray: number;

    _renderCanvas(renderer: PIXI.CanvasRenderer): void;
    _renderWebGL(renderer: PIXI.WebGLRenderer): void;
}

declare class Stage extends PIXI.Container
{
    constructor();
    initialize(): void;
}

declare class WebAudio
{
    static _masterVolume: number;
    static _context: AudioContext;
    static _masterGainNode: GainNode;
    static _initialized: boolean;
    static _unlocked: boolean;
    static _canPlayOgg: boolean;
    static _canPlayM4a: boolean;
    static _standAlone: typeof ResourceHandler;

    static initialize(noAudio: boolean): boolean;
    static canPlayOgg(): boolean;
    static canPlayM4a(): boolean;
    static setMasterVolume(value: number): void;

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

    url: string;
    volume: number;
    pitch: number;
    pan: number;

    constructor(url: string);
    initialize(url: string): void;
    clear(): void;
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

    _url: string;
    _buffer: AudioBuffer;
    _sourceNode: AudioBufferSourceNode;
    _gainNode: GainNode;
    _pannerNode: PannerNode;
    _totalTime: number;
    _sampleRate: number;
    _loopStart: number;
    _loopLength: number;
    _startTime: number;
    _volume: number;
    _pitch: number;
    _pan: number;
    _endTimer: number;
    _loadListeners: Function[];
    _stopListeners: Function[];
    _hasError: boolean;
    _autoPlay: boolean;

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
    private constructor();

    static _url: string;
    static _initialized: boolean;
    static _unlocked: boolean;
    static _audioElement: HTMLAudioElement;
    static _gainTweenInterval: number;
    static _tweenGain: number;
    static _tweenTargetGain: number;
    static _tweenGainStep: number;
    static _staticSePath: string;
    static _buffered: boolean;
    static _hasError: boolean;
    static _autoPlay: boolean;
    static _isLoading: boolean;
    static _loadListeners: Function[];
    static _volume: number;

    static url: string;
    static volume: string;

    static setup(url: string): void;
    static initialize(): boolean;
    static clear(): void;
    static setStaticSe(url: string): void;

    static _setupEventHandlers(): void;
    static _onTouchStart(): void;
    static _onVisibilityChange(): void;
    static _onLoadedData(): void;
    static _onError(): void;
    static _onEnded(): void;
    static _onHide(): void;
    static _onShow(): void;

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
}

declare class JsonEx
{
    private constructor();

    static maxDepth: number;
    static stringify(object: any): string;
    static parse(json: string): any;
    static makeDeepCopy(object: any): any;

    static _id: number;

    static _encode(value: any, circular: any[], depth: number): any;
    static _decode(value: any, circular: any[], registry: any): any;
    static _getConstructorName(value: any): any;
    static _resetPrototype(value: any, prototype: any): any;
    static _generateId(): number;
    static _restoreCircularReference(circulars: any[]): void;
    static _linkCircularReference(contents: any, circulars: any[], registry: any[]): void;
    static _cleanMetadata(object: any): void;
}

declare class Decrypter
{
    private constructor();

    static hasEncryptedImages: boolean;
    static hasEncryptedAudio: boolean;
    static SIGNATURE: string;
    static VER: string;
    static REMAIN: string;

    static _requestImgFile: any[]; // TODO おそらく未使用なので具体的な型が分からない。
    static _headerlength: number;
    static _xhrOk: number;
    static _encryptionKey: string;
    static _ignoreList: string[];

    static checkImgIgnore(url: string): boolean;
    static decryptImg(url: string, bitmap: Bitmap): void;
    static decryptHTML5Audio(url: string, bgm: IAudioObject, pos: number): void;
    static cutArrayHeader(arrayBuffer: ArrayBuffer, length: number): ArrayBuffer;
    static decryptArrayBuffer(arrayBuffer: ArrayBuffer): ArrayBuffer;
    static createBlobUrl(arrayBuffer: ArrayBuffer): string;
    static extToEncryptExt(url: string): string;
    static readEncryptionkey(): void;
}

declare class ResourceHandler
{
    private constructor();

    static _reloaders: Function[];
    static _defaultRetryInterval: number[];

    static createLoader(url: string, retryMethod: Function, resignMethod: Function, retryInterval: number): void;
    static exists(): boolean;
    static retry(): void;
}

declare interface IDataSound
{
    name?: string;
    pan?: number;
    pitch?: number;
    volume?: number;
}

declare interface IDataTrait
{
    code?: number;
    dataId?: number;
    value?: number;
}

/** 使用効果 */
declare interface IDataEffect
{
    code?: number;
    dataId?: number;
    value1?: number;
    value2?: number;
}

declare interface IDataAction
{
    conditionParam1?: number;
    conditionParam2?: number;
    conditionType?: number;
    rating?: number;
    skillId?: number;
}

declare interface IDataList
{
    code?: number;
    indent?: number;
    parameters?: number[];
}

declare interface IDataMapEventPageList extends IDataList
{
    parameters?: any[];
}

declare interface IDataMoveRouteCommand
{
    code?: number;
    parameters?: number[];
}

declare interface IDataMoveRoute
{
    list?: IDataMoveRouteCommand[];
    repeat?: boolean;
    skippable?: boolean;
    wait?: boolean;
}

/** アクター */
declare interface IDataActor
{
    id?: number;
    battlerName?: string;
    characterIndex?: number;
    characterName?: string;
    classId?: number;
    equips?: number[];
    faceIndex?: number;
    faceName?: string;
    traits?: IDataTrait[];
    initialLevel?: number;
    maxLevel?: number;
    name?: string;
    nickname?: string;
    note?: string;
    profile?: string;
    meta?: any;
}

/** 職業 */
declare interface IDataClass
{
    id?: number;
    expParams?: number[];
    traits?: IDataTrait[];
    learnings?: {
        level?: number;
        note?: string;
        skillId?: number;
    }[];
    name?: string;
    note?: string;
    params?: number[][];
    meta?: any;
}

/** スキル */
declare interface IDataSkill
{
    /** ID */
    id?: number;
    /** アニメーション */
    animationId?: number;
    /** ダメージ */
    damage?: {
        /** 会心 */
        critical?: boolean;
        /** 属性 */
        elementId?: number;
        /** 計算式 */
        formula?: string;
        /** タイプ */
        type?: number;
        /** 分散度 */
        variance?: number;
    }
    /** 説明 */
    description?: string;
    /** 使用効果 */
    effects?: IDataEffect[];
    /** 命中タイプ */
    hitType?: number;
    /** アイコン */
    iconIndex?: number;
    /** メッセージ (使用者の名前)～ */
    message1?: string;
    /** メッセージ */
    message2?: string;
    /** 消費MP */
    mpCost?: number;
    /** 名前 */
    name?: string;
    /** メモ */
    note?: string;
    /** 使用可能時 */
    occasion?: number;
    /** 連続回数 */
    repeats?: number;
    /** 武器タイプ1 */
    requiredWtypeId1?: number;
    /** 武器タイプ2 */
    requiredWtypeId2?: number;
    /** 範囲 */
    scope?: number;
    /** 速度補正 */
    speed?: number;
    /** スキルタイプ */
    stypeId?: number;
    /** 成功率 */
    successRate?: number;
    /** 消費TP */
    tpCost?: number;
    /** 得TP */
    tpGain?: number;
    /** メタ情報 */
    meta?: any;
}

/** 全アイテム共通 */
declare interface IDataAllItem
{
    id?: number;
    description?: string;
    name?: string;
    note?: string;
    iconIndex?: number;
    price?: number;
    meta?: any;
}

/** アイテム */
declare interface IDataItem extends IDataAllItem
{
    animationId?: number;
    consumable?: boolean;
    damage?: {
        critical?: boolean;
        elementId?: number;
        formula?: string;
        type?: number;
        variance?: number;
    }
    effects?: IDataEffect[];
    hitType?: number;
    itypeId?: number;
    occasion?: number;
    repeats?: number;
    scope?: number;
    speed?: number;
    successRate?: number;
    tpGain?: number;
}

/** 装備アイテム */
declare interface IDataEquipItem extends IDataAllItem
{
    etypeId?: number;
    traits?: IDataTrait[];
    params?: number[];
}

/** 武器 */
declare interface IDataWeapon extends IDataEquipItem
{
    animationId?: number;
    wtypeId?: number;
}

/** 防具 */
declare interface IDataArmor extends IDataEquipItem
{
    atypeId?: number;
}

/** ドロップアイテム */
declare interface IDataDropItem
{
    kind?: number;
    dataId?: number;
    denominator?: number;
}

/** 敵 */
declare interface IDataEnemy
{
    id?: number;
    actions?: IDataAction[];
    battlerHue?: number;
    battlerName?: string;
    dropItems?: IDataDropItem[];
    exp?: number;
    traits?: IDataTrait[];
    gold?: number;
    name?: string;
    note?: string;
    params?: number[];
    meta?: any;
}

declare interface IDataPage
{
    conditions?: {
        actorHP?: number;
        actorId?: number;
        actorValid?: boolean;
        enemyHp?: number;
        enemyIndex?: number;
        enemyValid?: boolean;
        switchId?: number;
        switchValid?: boolean;
        turnA?: number;
        turnB?: number;
        turnEnding?: boolean;
        turnValid?: boolean;
    };
    list?: {
        code?: number;
        indent?: number;
        parameters?: number[];
    }[];
    span?: number;
}

/** 敵グループ */
declare interface IDataTroop
{
    id?: number;
    members?: {
        enemyId?: number;
        x?: number;
        y?: number;
        hidden?: boolean;
    }[];
    name?: string;
    pages?: IDataPage[];
    meta?: any;
}

/** ステート */
declare interface IDataState
{
    id?: number;
    autoRemovalTiming?: number;
    chanceByDamage?: number;
    iconIndex?: number;
    maxTurns?: number;
    message1?: string;
    message2?: string;
    message3?: string;
    message4?: string;
    minTurns?: number;
    motion?: number;
    name?: string;
    note?: string;
    overlay?: number;
    priority?: number;
    releaseByDamage?: boolean;
    removeAtBattleEnd?: boolean;
    removeByDamage?: boolean;
    removeByRestriction?: boolean;
    removeByWalking?: boolean;
    restriction?: number;
    stepsToRemove?: number;
    traits?: IDataTrait[];
}

declare interface IDataAnimationTiming
{
    flashColor?: number[];
    flashDuration?: number;
    flashScope?: number;
    frame?: number;
    se?: IDataSound;
}

/** アニメーション */
declare interface IDataAnimation
{
    id?: number;
    animation1Hue?: number;
    animation1Name?: string;
    animation2Hue?: number;
    animation2Name?: string;
    frames?: number[][][];
    name?: string;
    position?: number;
    timings?: IDataAnimationTiming[];
    meta?: any;
}

/** タイルセット */
declare interface IDataTileset
{
    id?: number;
    flags?: number[];
    mode?: number;
    name?: string;
    note?: string;
    tilesetNames?: string[];
    meta?: any;
}

/** コモンイベント */
declare interface IDataCommonEvent
{
    id?: number;
    list?: IDataList[];
    name: string;
    switchId: number;
    trigger: number;
    meta?: any;
}

declare interface IVehicle
{
    bgm?: IDataSound;
    characterIndex?: number;
    characterName?: string;
    startMapId?: number;
    startX?: number;
    startY?: number;
}

declare interface IDataSystem
{
    airship?: IVehicle;
    armorTypes?: string[];
    attackMotions?: {
        type?: number;
        weaponImageId?: number;
    }[];
    battleBgm?: IDataSound;
    battleback1Name?: string;
    battleback2Name?: string;
    battlerHue?: number;
    battlerName?: string;
    boat?: IVehicle;
    currencyUnit?: string;
    defeatMe?: IDataSound;
    editMapId?: number;
    elements?: string[];
    equipTypes?: string[];
    gameTitle?: string;
    gameoverMe?: IDataSound;
    locale?: string;
    magicSkills?: number[];
    menuCommands?: boolean[];
    optDisplayTp?: boolean;
    optDrawTitle?: boolean;
    optExtraExp?: boolean;
    optFloorDeath?: boolean;
    optFollowers?: boolean;
    optSideView?: boolean;
    optSlipDeath?: boolean;
    optTransparent?: boolean;
    partyMembers?: number[];
    ship?: IVehicle;
    skillTypes?: string[];
    sounds?: IDataSound[];
    startMapId?: number;
    startX?: number;
    startY?: number;
    switches?: string[];
    terms?: {
        basic?: string[];
        commands: string[];
        params: string[];
        messages: {
            possession: string;
            expTotal: string;
            expNext: string;
            saveMessage: string;
            loadMessage: string;
            file?: string;
            partyName?: string;
            emerge?: string;
            preemptive?: string;
            surprise?: string;
            escapeStart?: string;
            escapeFailure?: string;
            victory?: string;
            defeat?: string;
            obtainExp?: string;
            obtainGold?: string;
            obtainItem?: string;
            levelUp?: string;
            obtainSkill?: string;
            useItem?: string;
            criticalToEnemy?: string;
            criticalToActor?: string;
            actorDamage?: string;
            actorRecovery?: string;
            actorGain?: string;
            actorLoss?: string;
            actorDrain?: string;
            actorNoDamage?: string;
            actorNoHit?: string;
            enemyDamage?: string;
            enemyRecovery?: string;
            enemyGain?: string;
            enemyLoss?: string;
            enemyDrain?: string;
            enemyNoDamage?: string;
            enemyNoHit?: string;
            evasion?: string;
            magicEvasion?: string;
            magicReflection?: string;
            counterAttack?: string;
            substitute?: string;
            buffAdd?: string;
            debuffAdd?: string;
            buffRemove?: string;
            actionFailure?: string;
            bgmVolume?: string;
            bgsVolume?: string;
            meVolume?: string;
            seVolume?: string;
            alwaysDash?: string;
            commandRemember?: string;
        };
    };
    testBattlers?: {
        actorId?: number;
        equips?: number[];
        level?: number;
    }[];
    testTroopId?: number;
    title1Name?: string;
    title2Name?: string;
    titleBgm?: IDataSound;
    variables?: string[];
    versionId?: number;
    victoryMe?: IDataSound;
    weaponTypes?: string;
    windowTone?: number[];
    meta?: any;
}

declare interface IDataMapInfo
{
    id?: number;
    expanded?: boolean;
    name?: string;
    order?: number;
    parentId?: number;
    scrollX?: number;
    scrollY?: number;
    meta?: any;
}

declare interface IDataEncounterList
{
    regionSet?: number[];
    troopId?: number;
    weight?: number;
}

declare interface IDataMapEventPage
{
    conditions?: {
        actorId?: number;
        actorValid?: boolean;
        itemId?: number;
        itemValid?: boolean;
        selfSwitchCh?: string;
        selfSwitchValid: boolean;
        switch1Id?: number;
        switch1Valid?: boolean;
        switch2Id?: number;
        switch2Valid?: boolean;
        variableId?: number;
        variableValid?: boolean;
        variableValue?: number;
    };
    directionFix?: boolean;
    image?: {
        tileId?: number;
        characterName?: string;
        direction?: number;
        pattern?: number;
        characterIndex?: number;
    }
    list?: IDataMapEventPageList[];
    moveFrequency?: number;
    moveRoute?: {
        list?: {
            code?: number;
            parameters?: number[];
        }[];
        repeat?: boolean;
        skippable?: boolean;
        wait?: boolean;
    };
    moveSpeed?: number;
    moveType?: number;
    priorityType?: number;
    stepAnime?: boolean;
    through?: boolean;
    trigger?: number;
    walkAnime?: boolean;
}

declare interface IDataMapEvent
{
    id?: number;
    name?: string;
    note?: string;
    pages?: IDataMapEventPage[];
}

declare interface IDataMap
{
    autoplayBgm?: boolean;
    autoplayBgs?: boolean;
    battleback1Name?: string;
    battleback2Name?: string;
    bgm?: IDataSound;
    bgs?: IDataSound;
    disableDashing?: boolean;
    displayName?: string;
    encounterList?: IDataEncounterList[];
    encounterStep?: number;
    height?: number;
    note?: string;
    parallaxLoopX?: boolean;
    parallaxLoopY?: boolean;
    parallaxName?: string;
    parallaxShow?: boolean;
    parallaxSx?: number;
    parallaxSy?: number;
    scrollType?: number;
    specifyBattleback?: boolean;
    tilesetId?: number;
    width?: number;
    data?: number[];
    events?: IDataMapEvent[];
    meta?: any;
}

declare var $dataActors      : IDataActor[];
declare var $dataClasses     : IDataClass[];
declare var $dataSkills      : IDataSkill[];
declare var $dataItems       : IDataItem[];
declare var $dataWeapons     : IDataWeapon[];
declare var $dataArmors      : IDataArmor[];
declare var $dataEnemies     : IDataEnemy[];
declare var $dataTroops      : IDataTroop[];
declare var $dataStates      : IDataState[];
declare var $dataAnimations  : IDataAnimation[];
declare var $dataTilesets    : IDataTileset[];
declare var $dataCommonEvents: IDataCommonEvent[];
declare var $dataSystem      : IDataSystem;
declare var $dataMapInfos    : IDataMapInfo[];
declare var $dataMap         : IDataMap;
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

declare interface ISavefileInfo
{
    globalId?: number;
    title?: string;
    characters?: [string, number][];
    faces?: [string, number][];
    playtime?: string;
    timestamp?: number;
}

declare interface ISaveContents
{
    system?         : Game_System;
    screen?         : Game_Screen;
    timer?          : Game_Timer;
    switches?       : Game_Switches;
    variables?      : Game_Variables;
    selfSwitches?   : Game_SelfSwitches;
    actors?         : Game_Actors;
    party?          : Game_Party;
    map?            : Game_Map;
    player?         : Game_Player;
}

declare class DataManager
{
    private constructor();

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
    static onLoad(object: IDataActor[] | IDataClass[] | IDataSkill[] | IDataItem[] | IDataWeapon[] | IDataArmor[] | IDataEnemy[] | IDataTroop[] | IDataState[] | IDataAnimation[] | IDataTileset[] | IDataCommonEvent[] | IDataSystem[] | IDataMapInfo[] | IDataMap[]): void;
    static extractMetadata(data: IDataActor[] | IDataClass[] | IDataSkill[] | IDataItem[] | IDataWeapon[] | IDataArmor[] | IDataEnemy[] | IDataTroop[] | IDataState[] | IDataAnimation[] | IDataTileset[] | IDataCommonEvent[] | IDataSystem[] | IDataMapInfo[] | IDataMap[]): void;
    static checkError(): void;
    static isBattleTest(): boolean;
    static isEventTest(): boolean;
    static isSkill(item: IDataSkill): boolean;
    static isItem(item: IDataItem): boolean;
    static isWeapon(item: IDataWeapon): boolean;
    static isArmor(item: IDataArmor): boolean;
    static createGameObjects(): void;
    static setupNewGame(): void;
    static setupBattleTest(): void;
    static setupEventTest(): void;
    static loadGlobalInfo(): void;
    static saveGlobalInfo(info: ISavefileInfo[]): void;
    static isThisGameFile(savefileId: number): boolean;
    static isAnySavefileExists(): boolean;
    static latestSavefileId(): number;
    static loadAllSavefileImages(): void;
    static loadSavefileImages(info: ISavefileInfo): void;
    static maxSavefiles(): number;
    static saveGame(savefileId: number): boolean;
    static loadGame(savefileId: number): boolean;
    static loadSavefileInfo(savefileId: number): ISavefileInfo;
    static lastAccessedSavefileId(): number;
    static saveGameWithoutRescue(savefileId: number): boolean;
    static loadGameWithoutRescue(savefileId: number): boolean;
    static selectSavefileForNewGame(): void;
    static makeSavefileInfo(): ISavefileInfo;
    static makeSaveContents(): ISaveContents;
    static extractSaveContents(contents: ISaveContents): void;
}

declare interface IConfig
{
    alwaysDash?: boolean;
    commandRemember?: boolean;
    bgmVolume?: number;
    bgsVolume?: number;
    meVolume?: number;
    seVolume?: number;
}

declare class ConfigManager
{
    private constructor();

    static alwaysDash: boolean;
    static commandRemember: boolean;

    static bgmVolume: number;
    static bgsVolume: number;
    static meVolume: number;
    static seVolume: number;
    static load(): void;
    static save(): void;
    static makeData(): IConfig;
    static applyData(config: IConfig): void;
    static readFlag(config: IConfig, name: string): boolean;
    static readVolume(config: IConfig, name: string): number;
}

declare class StorageManager
{
    private constructor();

    static save(savefileId: number, json: any): void;
    static load(savefileId: number): any;
    static exists(savefileId: number): boolean;
    static remove(savefileId: number): void;
    static backup(savefileId: number): void;
    static backupExists(savefileId: number): void;
    static cleanBackup(savefileId: number): void;
    static restoreBackup(savefileId: number): void;
    static isLocalMode(): boolean;
    static saveToLocalFile(savefileId: number, json: any): void;
    static loadFromLocalFile(savefileId: number): any;
    static loadFromLocalBackupFile(savefileId: number): any;
    static localFileBackupExists(savefileId: number): boolean;
    static localFileExists(savefileId: number): boolean;
    static removeLocalFile(savefileId: number): void;
    static saveToWebStorage(savefileId: number, json: any): void;
    static loadFromWebStorage(savefileId: number): any;
    static loadFromWebStorageBackup(savefileId: number): any;
    static webStorageBackupExists(savefileId: number): boolean;
    static webStorageExists(savefileId: number): boolean;
    static removeWebStorage(savefileId: number): void;
    static localFileDirectoryPath(): string;
    static localFilePath(savefileId: number): string;
    static webStorageKey(savefileId: number): string;
}

declare class ImageManager
{
    private constructor();

    static _imageCache: ImageCache;
    // static _requestQueue: RequestCache;
    static _systemReservationId: number;

    static _generateCacheKey(): string;

    static cache: CacheMap;

    static loadAnimation(filename: string, hue?: number): Bitmap;
    static loadBattleback1(filename: string, hue?: number): Bitmap;
    static loadBattleback2(filename: string, hue?: number): Bitmap;
    static loadEnemy(filename: string, hue?: number): Bitmap;
    static loadCharacter(filename: string, hue?: number): Bitmap;
    static loadFace(filename: string, hue?: number): Bitmap;
    static loadParallax(filename: string, hue?: number): Bitmap;
    static loadPicture(filename: string, hue?: number): Bitmap;
    static loadSvActor(filename: string, hue?: number): Bitmap;
    static loadSvEnemy(filename: string, hue?: number): Bitmap;
    static loadSystem(filename: string, hue?: number): Bitmap;
    static loadTileset(filename: string, hue?: number): Bitmap;
    static loadTitle1(filename: string, hue?: number): Bitmap;
    static loadTitle2(filename: string, hue?: number): Bitmap;
    static loadBitmap(folder: string, filename: string, hue?: number, smooth?: boolean): Bitmap;
    static loadEmptyBitmap(): Bitmap;
    static loadNormalBitmap(path: string, hue: number): Bitmap;
    static clear(): void;
    static isReady(): boolean;
    static isObjectCharacter(): boolean;
    static isBigCharacter(): boolean;
    static isZeroParallax(): boolean;
    static reserveAnimation(filename: string, hue: number, reservationId: number): Bitmap;
    static reserveBattleback1(filename: string, hue: number, reservationId: number): Bitmap;
    static reserveBattleback2(filename: string, hue: number, reservationId: number): Bitmap;
    static reserveEnemy(filename: string, hue: number, reservationId: number): Bitmap;
    static reserveCharacter(filename: string, hue: number, reservationId: number): Bitmap;
    static reserveFace(filename: string, hue: number, reservationId: number): Bitmap;
    static reserveParallax(filename: string, hue: number, reservationId: number): Bitmap;
    static reservePicture(filename: string, hue: number, reservationId: number): Bitmap;
    static reserveSvActor(filename: string, hue: number, reservationId: number): Bitmap;
    static reserveSvEnemy(filename: string, hue: number, reservationId: number): Bitmap;
    static reserveSystem(filename: string, hue: number, reservationId: number): Bitmap;
    static reserveTileset(filename: string, hue: number, reservationId: number): Bitmap;
    static reserveTitle1(filename: string, hue: number, reservationId: number): Bitmap;
    static reserveTitle2(filename: string, hue: number, reservationId: number): Bitmap;
    static reserveBitmap(folder: string, filename: string, hue: number, smooth: boolean, reservationId: number): Bitmap;
    static reserveNormalBitmap(path: string, hue: number, reservationId: number): Bitmap;
    static releaseReservation(reservationId: number): void;
    static setDefaultReservationId(reservationId: number): void;
    static requestAnimation(filename: string, hue: number): Bitmap;
    static requestBattleback1(filename: string, hue: number): Bitmap;
    static requestBattleback2(filename: string, hue: number): Bitmap;
    static requestEnemy(filename: string, hue: number): Bitmap;
    static requestCharacter(filename: string, hue: number): Bitmap;
    static requestFace(filename: string, hue: number): Bitmap;
    static requestParallax(filename: string, hue: number): Bitmap;
    static requestPicture(filename: string, hue: number): Bitmap;
    static requestSvActor(filename: string, hue: number): Bitmap;
    static requestSvEnemy(filename: string, hue: number): Bitmap;
    static requestSystem(filename: string, hue: number): Bitmap;
    static requestTileset(filename: string, hue: number): Bitmap;
    static requestTitle1(filename: string, hue: number): Bitmap;
    static requestTitle2(filename: string, hue: number): Bitmap;
    static requestBitmap(folder: string, filename: string, hue: number, smooth: boolean): Bitmap;
    static requestNormalBitmap(path: string, hue: number): Bitmap;
    static update(): void;
    static clearRequest(): void;
}

interface IAudioObject
{
    name: string;
    volume: number;
    pitch: number;
    pan: number;
    pos: number;
}

declare class AudioManager
{
    private constructor();

    static _masterVolume   : number;
    static _bgmVolume      : number;
    static _bgsVolume      : number;
    static _meVolume       : number;
    static _seVolume       : number;
    static _currentBgm     : IAudioObject;
    static _currentBgs     : IAudioObject;
    static _bgmBuffer      : WebAudio | Html5Audio;
    static _bgsBuffer      : WebAudio;
    static _meBuffer       : WebAudio;
    static _seBuffers      : WebAudio[];
    static _staticBuffers  : WebAudio[];
    static _replayFadeTime : number;
    static _path           : string;
    static _blobUrl        : string;

    static bgmVolume: number;
    static bgsVolume: number;
    static meVolume: number;
    static seVolume: number;

    static playBgm(bgm: IAudioObject, pos: number): void;
    static playEncryptedBgm(bgm: IAudioObject, pos: number): void;
    static createDecryptBuffer(url: string, bgm: IAudioObject, pos: number): void;
    static replayBgm(bgm: IAudioObject): void;
    static isCurrentBgm(bgm: IAudioObject): boolean;
    static updateBgmParameters(bgm: IAudioObject): void;
    static updateCurrentBgm(bgm: IAudioObject, pos: number): void;
    static stopBgm(): void;
    static fadeOutBgm(duration: number): void;
    static fadeInBgm(duration: number): void;
    static playBgs(bgs: IAudioObject, pos: number): void;
    static replayBgs(bgs: IAudioObject): void;
    static isCurrentBgs(bgs: IAudioObject): boolean;
    static updateBgsParameters(bgs: IAudioObject): void;
    static updateCurrentBgs(bgs: IAudioObject, pos: number): void;
    static stopBgs(): void;
    static fadeOutBgs(duration: number): void;
    static fadeInBgs(duration: number): void;
    static playMe(me: IDataSound): void;
    static updateMeParameters(me: IDataSound): void;
    static fadeOutMe(duration: number): void;
    static stopMe(): void;
    static playSe(se: IDataSound): void;
    static updateSeParameters(buffer: WebAudio | Html5Audio, se: IDataSound): void;
    static stopSe(): void;
    static playStaticSe(se: IDataSound): void;
    static loadStaticSe(se: IDataSound): void;
    static isStaticSe(se: IDataSound): boolean;
    static stopAll(): void;
    static saveBgm(): IAudioObject;
    static saveBgs(): IAudioObject;
    static makeEmptyAudioObject(): IAudioObject;
    static createBuffer(folder: number, name: string): Html5Audio | WebAudio;
    static updateBufferParameters(buffer: IAudioObject, configVolume: number, audio: IAudioObject): void;
    static audioFileExt(): string;
    static shouldUseHtml5Audio(): boolean;
    static checkErrors(): void;
    static checkWebAudioError(webAudio: WebAudio): void;
}

declare class SoundManager
{
    private constructor();

    static preloadImportantSounds(): void;
    static loadSystemSound(n: number): void;
    static playSystemSound(n: number): void;
    static playCursor(): void;
    static playOk(): void;
    static playCancel(): void;
    static playBuzzer(): void;
    static playEquip(): void;
    static playSave(): void;
    static playLoad(): void;
    static playBattleStart(): void;
    static playEscapeion(): void;
    static playEnemyAttack(): void;
    static playEnemyDamage(): void;
    static playEnemyCollapse(): void;
    static playBossCollapse1(): void;
    static playBossCollapse2(): void;
    static playActorDamage(): void;
    static playActorCollapse(): void;
    static playRecoveryion(): void;
    static playMiss(): void;
    static playEvasionion(): void;
    static playMagicEvasion(): void;
    static playReflectioni(): void;
    static playShop(): void;
    static playUseItem(): void;
    static playUseSkill(): void;
}

declare class TextManager
{
    private constructor();

    static basic(basicId: number): string;
    static param(paramId: number): string;
    static command(commandId: number): string;
    static message(messageId: number): string;
    static getter(method: Function, param: number): Function;

    static currencyUnit: string;
    static level: string;
    static levelA: string;
    static hp: string;
    static hpA: string;
    static mp: string;
    static mpA: string;
    static tp: string;
    static tpA: string;
    static exp: string;
    static expA: string;
    static fight: string;
    static escape: string;
    static attack: string;
    static guard: string;
    static item: string;
    static skill: string;
    static equip: string;
    static status: string;
    static formation: string;
    static save: string;
    static gameEnd: string;
    static options: string;
    static weapon: string;
    static armor: string;
    static keyItem: string;
    static equip2: string;
    static optimize: string;
    static clear: string;
    static newGame: string;
    static continue_: string;
    static toTitle: string;
    static cancel: string;
    static buy: string;
    static sell: string;
    static alwaysDash: string;
    static commandRemember: string;
    static bgmVolume: string;
    static bgsVolume: string;
    static meVolume: string;
    static seVolume: string;
    static possession: string;
    static expTotal: string;
    static expNext: string;
    static saveMessage: string;
    static loadMessage: string;
    static file: string;
    static partyName: string;
    static emerge: string;
    static preemptive: string;
    static surprise: string;
    static escapeStart: string;
    static escapeFailure: string;
    static victory: string;
    static defeat: string;
    static obtainExp: string;
    static obtainGold: string;
    static obtainItem: string;
    static levelUp: string;
    static obtainSkill: string;
    static useItem: string;
    static criticalToEnemy: string;
    static criticalToActor: string;
    static actorDamage: string;
    static actorRecovery: string;
    static actorGain: string;
    static actorLoss: string;
    static actorDrain: string;
    static actorNoDamage: string;
    static actorNoHit: string;
    static enemyDamage: string;
    static enemyRecovery: string;
    static enemyGain: string;
    static enemyLoss: string;
    static enemyDrain: string;
    static enemyNoDamage: string;
    static enemyNoHit: string;
    static evasion: string;
    static magicEvasion: string;
    static magicReflection: string;
    static counterAttack: string;
    static substitute: string;
    static buffAdd: string;
    static debuffAdd: string;
    static buffRemove: string;
    static actionFailure: string;
}

declare class SceneManager
{
    private constructor();

    static _getTimeInMsWithoutMobileSafari: number;
    static _scene: Scene_Base;
    static _nextScene: Scene_Base;
    static _stack: typeof Scene_Base[];
    static _stopped: boolean;
    static _sceneStarted: boolean;
    static _exiting: boolean;
    static _previousClass: typeof Scene_Base;
    static _backgroundBitmap: Bitmap;
    static _screenWidth: number;
    static _screenHeight: number;
    static _boxWidth: number;
    static _boxHeight: number;
    static _deltaTime: number;
    static _currentTime: number;
    static _accumulator: number;

    static run(sceneClass: typeof Scene_Base): void;
    static initialize(): void;
    static initGraphics(): void;
    static preferableRendererType(): string;
    static shouldUseCanvasRenderer(): boolean;
    static checkWebGL(): void;
    static checkFileAccess(): void;
    static initAudio(): void;
    static initInput(): void;
    static initNwjs(): void;
    static checkPluginErrors(): void;
    static setupErrorHandlers(): void;
    static requestUpdate(): void;
    static update(): void;
    static terminate(): void;
    static onError(e: ErrorEvent): void;
    static onKeyDown(event: KeyboardEvent): void;
    static catchException(e: ErrorEvent): void;
    static tickStart(): void;
    static tickEnd(): void;
    static updateInputData(): void;
    static updateMain(): void;
    static updateManagers(): void;
    static changeScene(): void;
    static updateScene(): void;
    static renderScene(): void;
    static onSceneCreate(): void;
    static onSceneStart(): void;
    static onSceneLoading(): void;
    static isSceneChanging(): boolean;
    static isCurrentSceneBusy(): boolean;
    static isCurrentSceneStarted(): boolean;
    static isNextScene(sceneClass: typeof Scene_Base): boolean;
    static isPreviousScene(sceneClass: typeof Scene_Base): boolean;
    static goto(sceneClass: typeof Scene_Base): void;
    static push(sceneClass: typeof Scene_Base): void;
    static pop(): void;
    static exit(): void;
    static clearStack(): void;
    static stop(): void;
    static prepareNextScene(): void;
    static snap(): void;
    static snapForBackground(): void;
    static backgroundBitmap(): Bitmap;
    static resume(): void;
}

declare interface IDataRewards
{
    gold: number;
    exp: number;
    items: IDataAllItem[];
}

declare class BattleManager
{
    private constructor();

    static _phase: string;
    static _canEscape: boolean;
    static _canLose: boolean;
    static _battleTest: boolean;
    static _eventCallback: Function;
    static _preemptive: boolean;
    static _surprise: boolean;
    static _actorIndex: number;
    static _actionForcedBattler: Game_Battler;
    static _mapBgm: IAudioObject;
    static _mapBgs: IAudioObject;
    static _actionBattlers: Game_Battler[];
    static _subject: Game_Battler;
    static _action: Game_Action;
    static _targets: Game_Battler[];
    static _logWindow: Window_BattleLog;
    static _statusWindow: Window_BattleStatus;
    static _spriteset: Spriteset_Battle;
    static _escapeRatio: number;
    static _escaped: boolean;
    static _rewards: IDataRewards;

    static setup(troopId: number, canEscape: boolean, canLose: boolean): void;
    static initMembers(): void;
    static isBattleTest(): boolean;
    static setBattleTest(battleTest: boolean): void;
    static setEventCallback(callback: Function): void;
    static setLogWindow(logWindow: Window_BattleLog): void;
    static setStatusWindow(statusWindow: Window_BattleStatus): void;
    static setSpriteset(spriteset: Spriteset_Battle): void;
    static onEncounter(): void;
    static ratePreemptive(): number;
    static rateSurprise(): number;
    static saveBgmAndBgs(): void;
    static playBattleBgm(): void;
    static playVictoryMe(): void;
    static playDefeatMe(): void;
    static replayBgmAndBgs(): void;
    static makeEscapeRatio(): void;
    static update(): void;
    static updateEvent(): boolean;
    static updateEventMain(): boolean;
    static isBusy(): boolean;
    static isInputting(): boolean;
    static isInTurn(): boolean;
    static isTurnEnd(): boolean;
    static isAborting(): boolean;
    static isBattleEnd(): boolean;
    static canEscape(): boolean;
    static canLose(): boolean;
    static isEscaped(): boolean;
    static actor(): Game_Actor;
    static clearActor(): void;
    static changeActor(newActorIndex: number, lastActorActionState: string): void;
    static startBattle(): void;
    static displayStartMessages(): void;
    static startInput(): void;
    static inputtingAction(): Game_Action;
    static selectNextCommand(): void;
    static selectPreviousCommand(): void;
    static refreshStatus(): void;
    static startTurn(): void;
    static updateTurn(): void;
    static processTurn(): void;
    static endTurn(): void;
    static updateTurnEnd(): void;
    static getNextSubject(): void;
    static allBattleMembers(): Game_Battler;
    static makeActionOrders(): void;
    static startAction(): void;
    static updateAction(): void;
    static endAction(): void;
    static invokeAction(subject: Game_Battler, target: Game_Battler): void;
    static invokeNormalAction(subject: Game_Battler, target: Game_Battler): void;
    static invokeCounterAttack(subject: Game_Battler, target: Game_Battler): void;
    static invokeMagicReflection(subject: Game_Battler, target: Game_Battler): void;
    static applySubstitute(target: Game_Battler): Game_Battler;
    static checkSubstitute(target: Game_Battler): Game_Battler;
    static isActionForced(): boolean;
    static forceAction(battler: Game_Battler): void;
    static processForcedAction(): void;
    static abort(): void;
    static checkBattleEnd(): boolean;
    static checkAbort(): boolean;
    static checkAbort2(): boolean;
    static processVictory(): void;
    static processEscape(): boolean;
    static processAbort(): void;
    static processDefeat(): void;
    static endBattle(result: number): void;
    static updateBattleEnd(): void;
    static makeRewards(): void;
    static displayVictoryMessage(): void;
    static displayDefeatMessage(): void;
    static makeRewadisplayEscapeSuccessMessagerds(): void;
    static displayEscapeFailureMessage(): void;
    static displayRewards(): void;
    static displayExp(): void;
    static displayGold(): void;
    static displayDropItems(): void;
    static gainRewards(): void;
    static gainExp(): void;
    static gainGold(): void;
    static gainDropItems(): void;
}

declare interface IDataPlugin
{
    name: string;
    status: boolean;
    description: string;
    parameters: PluginParameters;
}

declare type PluginParameters = { [key: string]: string; };

declare class PluginManager
{
    private constructor();

    static _path: string;
    static _scripts: string[];
    static _errorUrls: string[];
    static _parameters: PluginParameters;

    static setup(plugins: IDataPlugin[]): void;
    static checkErrors(): void;
    static parameters(name: string): PluginParameters;
    static setParameters(name: string, parameters: PluginParameters): void;
    static loadScript(name: string): void;
    static onError(e: ErrorEvent): void;
}

declare class Game_Temp
{
    constructor();
    initialize(): void;
    isPlaytest(): boolean;
    reserveCommonEvent(commonEventId: number): void;
    clearCommonEvent(): void;
    isCommonEventReserved(): boolean;
    reservedCommonEvent(): IDataCommonEvent;
    setDestination(x: number, y: number): void;
    clearDestination(): void;
    isDestinationValid(): void;
    destinationX(): number;
    destinationY(): number;

    _isPlaytest: boolean;
    _commonEventId: number;
    _destinationX: number;
    _destinationY: number;
}

declare class Game_System
{
    _saveEnabled: boolean;
    _menuEnabled: boolean;
    _encounterEnabled: boolean;
    _formationEnabled: boolean;
    _battleCount: number;
    _winCount: number;
    _escapeCount: number;
    _saveCount: number;
    _versionId: number;
    _framesOnSave: number;
    _bgmOnSave: IAudioObject;
    _bgsOnSave: IAudioObject;
    _windowTone: number[];
    _battleBgm: IDataSound;
    _victoryMe: IDataSound;
    _defeatMe: IDataSound;
    _savedBgm: IDataSound;
    _walkingBgm: IDataSound;

    constructor();
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
    versionId(): number;
    windowTone(): number[];
    setWindowTone(value: number[]): void;
    battleBgm(): IDataSound;
    setBattleBgm(value: IDataSound): void;
    victoryMe(): IDataSound;
    setVictoryMe(value: IDataSound): void;
    defeatMe(): IDataSound;
    setDefeatMe(value: IDataSound): void;
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
    saveWalkingBgm2(): void;
}

declare class Game_Timer
{
    _frames: number;
    _working: boolean;

    constructor();
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
    _texts: string[];
    _choices: string[];
    _faceName: string;
    _faceIndex: number;
    _background: number;
    _positionType: number;
    _choiceDefaultType: number;
    _choiceCancelType: number;
    _choiceBackground: number;
    _choicePositionType: number;
    _numInputVariableId: number;
    _numInputMaxDigits: number;
    _itemChoiceVariableId: number;
    _itemChoiceItypeId: number;
    _scrollMode: boolean;
    _scrollSpeed: number;
    _scrollNoFast: boolean;
    _choiceCallback: Function;

    constructor();
    initialize(): void;
    clear(): void;
    choices(): string[];
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
    setChoices(choices: string[], defaultType: number, cancelType: number): void;
    setChoiceBackground(background: number): void;
    setChoicePositionType(positionType: number): void;
    setNumberInput(variableId: number, maxDigits: number): void;
    setItemChoice(variableId: number, itemType: number): void;
    setScroll(speed: number, noFast: boolean): void;
    setChoiceCallback(callback: Function): void;
    onChoice(n: number): void;
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
    constructor();
    initialize(): void;
    clear(): void;
    value(switchId: number): boolean;
    setValue(switchId: number, value: boolean): void;
    onChange(): void;

    _data: boolean[];
}

declare class Game_Variables
{
    constructor();
    initialize(): void;
    clear(): void;
    value(variableId: number): number;
    setValue(variableId: number, value: number): number;
    onChange(): void;

    _data: number[];
}

declare class Game_SelfSwitches
{
    constructor();
    initialize(): void;
    clear(): void;
    value(key: number[]): boolean;
    setValue(key: (number | string)[], value: boolean): void;
    onChange(): void;

    _data: { [key: string]: boolean };
}

declare class Game_Screen
{
    _brightness: number;
    _zoomX: number;
    _zoomY: number;
    _zoomScale: number;
    _zoomScaleTarget: number;
    _zoomDuration: number;
    _weatherType: string;
    _weatherPower: number;
    _weatherPowerTarget: number;
    _weatherDuration: number;
    _pictures: Game_Picture[];
    _fadeOutDuration: number;
    _fadeInDuration: number;
    _tone: number[];
    _toneTarget: number[];
    _toneDuration: number;
    _flashColor: number[];
    _flashDuration: number;
    _shake: number;
    _shakePower: number;
    _shakeSpeed: number;
    _shakeDuration: number;

    constructor();
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
    startFlash(color: number[], duration: number): void;
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
    _name: string;
    _origin: number;
    _x: number;
    _y: number;
    _scaleX: number;
    _scaleY: number;
    _opacity: number;
    _blendMode: number;
    _tone: number[];
    _toneTarget: number[];
    _toneDuration: number;
    _angle: number;
    _rotationSpeed: number;
    _targetX: number;
    _targetY: number;
    _targetScaleX: number;
    _targetScaleY: number;
    _targetOpacity: number;
    _duration: number;

    constructor();
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
    _dataClass: string;
    _itemId: number;

    constructor(item?: IDataItem);
    initialize(item: IDataItem): void;
    isSkill(): boolean;
    isItem(): boolean;
    isUsableItem(): boolean;
    isWeapon(): boolean;
    isArmor(): boolean;
    isEquipItem(): boolean;
    isNull(): boolean;
    itemId(): number;
    object(): IDataItem;
    setObject(item: IDataItem): void;
    setEquip(isWeapon: boolean, itemId: number): void;
}

declare class Game_Action
{
    constructor(subject: Game_Battler, forcing: boolean);

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

    _subjectActorId: number;
    _subjectEnemyIndex: number;
    _forcing: boolean;
    _item: Game_Item;
    _targetIndex: number;

    constructor(subject: Game_Battler, forcing?: boolean);
    initialize(subject: Game_Battler, forcing: boolean): void;
    clear(): void;
    setSubject(subject: Game_Battler): void;
    subject(): Game_Battler;
    friendsUnit(): Game_Unit;
    opponentsUnit(): Game_Unit;
    setEnemyAction(action: boolean): void;
    setAttack(): void;
    setGuard(): void;
    setSkill(skillId: number): void;
    setItem(itemId: number): void;
    setItemObject(object: IDataItem): void
    setTarget(targetIndex: number): void;
    item(): IDataItem;
    isSkill(): boolean;
    isItem(): boolean;
    numRepeats(): number;
    checkItemScope(list: number[]): boolean;
    isForOpponent(): boolean;
    isForFriend(): boolean;
    isForDeadFriend(): boolean;
    isForUser(): boolean;
    isForOne(): boolean;
    isForRandom(): boolean;
    isForAll(): boolean;
    needsSelection(): boolean;
    numTargets(): number;
    checkDamageType(list: number[]): boolean;
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
    makeTargets(): Game_Battler[];
    repeatTargets(targets: Game_Battler[]): Game_Battler[];
    confusionTarget(): Game_Battler;
    targetsForOpponents(): Game_Battler[];
    targetsForFriends(): Game_Battler[];
    evaluate(): number;
    itemTargetCandidates(): Game_Battler[];
    evaluateWithTarget(target: Game_Battler): number;
    testApply(target: Game_Battler): boolean;
    hasItemAnyValidEffects(target: Game_Battler): number;
    testItemEffect(target: Game_Battler, effect: IDataEffect): number;
    itemCnt(target: Game_Battler): number;
    itemMrf(target: Game_Battler): number;
    itemHit(target: Game_Battler): number;
    itemEva(target: Game_Battler): number;
    itemCri(target: Game_Battler): number;
    apply(target: Game_Battler): void;
    makeDamageValue(target: Game_Battler, critical: boolean): number;
    evalDamageFormula(target: Game_Battler): number;
    calcElementRate(target: Game_Battler): number;
    elementsMaxRate(target: Game_Battler, elements: number[]): number;
    applyCritical(damage: number): number;
    applyVariance(damage: number, variance: number): number;
    applyGuard(damage: number, target: Game_Battler): number;
    executeDamage(target: Game_Battler, value: number): void;
    executeHpDamage(target: Game_Battler, value: number): void;
    executeMpDamage(target: Game_Battler, value: number): void;
    gainDrainedHp(value: number): void;
    gainDrainedMp(value: number): void;
    applyItemEffect(target: Game_Battler, effect: IDataEffect): void;
    itemEffectRecoverHp(target: Game_Battler, effect: IDataEffect): void;
    itemEffectRecoverMp(target: Game_Battler, effect: IDataEffect): void;
    itemEffectGainTp(target: Game_Battler, effect: IDataEffect): void;
    itemEffectAddState(target: Game_Battler, effect: IDataEffect): void;
    itemEffectAddAttackState(target: Game_Battler, effect: IDataEffect): void;
    itemEffectAddNormalState(target: Game_Battler, effect: IDataEffect): void;
    itemEffectRemoveState(target: Game_Battler, effect: IDataEffect): void;
    itemEffectAddBuff(target: Game_Battler, effect: IDataEffect): void;
    itemEffectAddDebuff(target: Game_Battler, effect: IDataEffect): void;
    itemEffectRemoveBuff(target: Game_Battler, effect: IDataEffect): void;
    itemEffectRemoveDebuff(target: Game_Battler, effect: IDataEffect): void;
    itemEffectSpecial(target: Game_Battler, effect: IDataEffect): void;
    itemEffectGrow(target: Game_Battler, effect: IDataEffect): void;
    itemEffectLearnSkill(target: Game_Battler, effect: IDataEffect): void;
    itemEffectCommonEvent(target: Game_Battler, effect: IDataEffect): void;
    makeSuccess(target: Game_Battler): void;
    applyItemUserEffect(target: Game_Battler): void;
    lukEffectRate(target: Game_Battler): number;
    applyGlobal(): void;
}

declare class Game_ActionResult
{
    used: boolean;
    missed: boolean;
    evaded: boolean;
    physical: boolean;
    drain: boolean;
    critical: boolean;
    success: boolean;
    hpAffected: boolean;
    hpDamage: number;
    mpDamage: number;
    tpDamage: number;
    addedStates: IDataState[];
    removedStates: IDataState[];
    addedBuffs: number[];
    addedDebuffs: number[];
    removedBuffs: number[];

    constructor();
    initialize(): void;
    clear(): void;
    addedStateObjects(): IDataState[];
    removedStateObjects(): IDataState[];
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

    _hp: number;
    _mp: number;
    _tp: number;
    _hidden: boolean;
    _paramPlus: number[];
    _states: number[];
    _stateTurns: { [key: number]: number };
    _buffs: number[];
    _buffTurns: number[];

    constructor();
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
    states(): IDataState[];
    stateIcons(): number[];
    buffIcons(): number[];
    buffIconIndex(buffLevel: number, paramId: number): number;
    allIcons(): number[];
    traitObjects(): IDataState[];
    allTraits(): IDataTrait[];
    traits(code: number): IDataTrait[];
    traitsWithId(code: number, id: number): IDataTrait[];
    traitsPi(code: number, id: number): number;
    traitsSum(code: number, id: number): number;
    traitsSumAll(code: number): number;
    traitsSet(code: number): number[];
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
    stateResistSet(): number[];
    isStateResist(stateId: number): boolean;
    attackElements(): number[];
    attackStates(): number[];
    attackStatesRate(stateId: number): number;
    attackSpeed(): number;
    attackTimesAdd(): number;
    addedSkillTypes(): number[];
    isSkillTypeSealed(stypeId: number): boolean;
    addedSkills(): number[];
    isSkillSealed(skillId: number): boolean;
    isEquipWtypeOk(wtypeId: number): boolean;
    isEquipAtypeOk(atypeId: number): boolean;
    isEquipTypeLocked(etypeId: number): boolean;
    isEquipTypeSealed(etypeId: number): boolean;
    slotType(): number;
    isDualWield(): boolean;
    actionPlusSet(): number[];
    specialFlag(flagId: number): boolean;
    collapseType(): number;
    partyAbility(abilityId: number): boolean;
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
    isSkillWtypeOk(skill: IDataSkill): boolean;
    skillMpCost(skill: IDataSkill): number;
    skillTpCost(skill: IDataSkill): number;
    canPaySkillCost(skill: IDataSkill): boolean;
    paySkillCost(skill: IDataSkill): void;
    isOccasionOk(item: IDataAllItem): boolean;
    meetsUsableItemConditions(item: IDataAllItem): boolean;
    meetsSkillConditions(skill: IDataSkill): boolean;
    meetsItemConditions(skill: IDataSkill): boolean;
    canUse(item: IDataAllItem): boolean;
    canEquip(item: IDataAllItem): boolean;
    canEquipWeapon(item: IDataAllItem): boolean;
    canEquipArmor(item: IDataAllItem): boolean;
    attackSkillId(): number;
    guardSkillId(): number;
    canAttack(): boolean;
    canGuard(): boolean;
}

declare interface IGame_BattlerAnimation
{
    animationId: string;
    mirror: boolean;
    delay: number;
}

declare class Game_Battler extends Game_BattlerBase
{
    _actions: Game_Action[];
    _speed: number;
    _result: Game_ActionResult;
    _actionState: string;
    _lastTargetIndex: number;
    _animations: IGame_BattlerAnimation[];
    _damagePopup: boolean;
    _effectType: string;
    _motionType: string;
    _weaponImageId: number;
    _motionRefresh: boolean;
    _selected: boolean;

    constructor();
    initialize(): void;
    initMembers(): void;
    clearAnimations(): void;
    clearDamagePopup(): void;
    clearWeaponAnimation(): void;
    clearEffect(): void;
    clearMotion(): void;
    requestEffect(effectType: string): void;
    requestMotion(motionType: string): void;
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
    effectType(): string;
    motionType(): string;
    weaponImageId(): number;
    shiftAnimation(): IGame_BattlerAnimation;
    startAnimation(animationId: number, mirror: boolean, delay: number): void;
    startDamagePopup(): void;
    startWeaponAnimation(weaponImageId: number): void;
    action(index: number): Game_Action;
    setAction(index: number, action: Game_Action): void;
    numActions(): number;
    clearActions(): void;
    result(): Game_ActionResult;
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
    removeStatesAuto(timing: number): void;
    removeBuffsAuto(): void;
    removeStatesByDamage(): void;
    makeActionTimes(): number;
    makeActions(): void;
    speed(): number;
    makeSpeed(): void;
    currentAction(): Game_Action;
    removeCurrentAction(): void;
    setLastTarnget(target: Game_Battler): void
    forceAction(skillId: number, targetIndex: number): void;
    useItem(item: IDataAllItem): void;
    consumeItem(item: IDataAllItem): void;
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
    setActionState(actionState: string): void;
    isUndecided(): boolean;
    isInputting(): boolean;
    isWaiting(): boolean;
    isActing(): boolean;
    isChanting(): boolean;
    isGuardWaiting(): boolean;
    performActionStart(action: Game_Action): void;
    performAction(action: Game_Action): void;
    performActionEnd(): void;
    performDamage(): void;
    performMiss(): void;
    performRecovery(): void;
    performEvasion(): void;
    performMagicEvasion(): void;
    performCounter(): void;
    performReflection(): void;
    performSubstitute(target: Game_Battler): void;
    performCollapse(): void;
}

declare class Game_Actor extends Game_Battler
{
    level: number;

    _actorId: number;
    _name: string;
    _nickname: string;
    _classId: number;
    _level: number;
    _characterName: string;
    _characterIndex: number;
    _faceName: string;
    _faceIndex: number;
    _battlerName: string;
    _exp: { [key: number]: number };
    _skills: number[];
    _equips: Game_Item[];
    _actionInputIndex: number;
    _lastMenuSkill: Game_Item;
    _lastBattleSkill : Game_Item;
    _lastCommandSymbol: string;
    _profile: string;
    _stateSteps: { [key: number]: number };

    constructor();
    initialize(): void;
    initialize(actorId: number): void;
    initMembers(): void;
    setup(actorId: number): void;
    actorId(): number;
    actor(): IDataActor;
    name(): string;
    setName(name: string): void;
    nickname(): string;
    setNickname(nickname: string): void;
    profile(): string;
    setProfile(profile: string): void;
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
    initEquips(equips: number[]): void;
    equipSlots(): number[];
    equips(): Game_Item[];
    weapons(): IDataWeapon[];
    armors(): IDataArmor[];
    hasWeapon(weapon: IDataWeapon): boolean;
    hasArmor(armor: IDataArmor): boolean;
    isEquipChangeOk(slotId: number): boolean;
    changeEquip(slotId: number, item: IDataEquipItem): void;
    forceChangeEquip(slotId: number, item: IDataEquipItem): void;
    tradeItemWithParty(newItem: IDataEquipItem, oldItem: IDataEquipItem): boolean;
    changeEquipById(etypeId: number, itemId: number): void;
    isEquipped(item: IDataAllItem): boolean;
    discardEquip(item: IDataEquipItem): void;
    releaseUnequippableItems(forcing: boolean): void;
    clearEquipments(): void;
    optimizeEquipments(): void;
    bestEquipItem(slotId: number): IDataEquipItem;
    calcEquipItemPerformance(item: IDataEquipItem): number;
    isSkillWtypeOk(skill: IDataSkill): boolean;
    isWtypeEquipped(wtypeId: number): boolean;
    refresh(): void;
    isActor(): boolean;
    friendsUnit(): Game_Party;
    opponentsUnit(): Game_Troop;
    index(): number;
    isBattleMember(): boolean;
    isFormationChangeOk(): boolean;
    currentClass(): IDataClass;
    isClass(gameClass: IDataClass): boolean;
    skills(): IDataSkill[];
    usableSkills(): IDataSkill[];
    traitObjects(): IDataState[];
    attackElements(): number[];
    hasNoWeapons(): boolean;
    bareHandsElementId(): number;
    paramMax(paramId: number): number;
    paramBase(paramId: number): number;
    paramPlus(paramId: number): number;
    attackAnimationId1(): number;
    attackAnimationId2(): number;
    bareHandsAnimationId(): number;
    changeExp(exp: number, show: boolean): void;
    levelUp(): void;
    levelDown(): void;
    findNewSkills(lastSkills: IDataSkill[]): IDataSkill[];
    displayLevelUp(newSkills: IDataSkill[]): void;
    gainExp(exp: number): void;
    finalExpRate(): number;
    benchMembersExpRate(): number;
    shouldDisplayLevelUp(): boolean;
    changeLevel(level: number, show: boolean): void;
    learnSkill(skillId: number): void;
    forgetSkill(skillId: number): void;
    isLearnedSkill(skillId: number): boolean;
    hasSkill(skillId: number): boolean;
    changeClass(classId: number, keepExp: number): void;
    setCharacterImage(characterName: string, characterIndex: number): void;
    setFaceImage(faceName: string, faceIndex: number): void;
    setBattlerImage(battlerName: string): void;
    isSpriteVisible(): boolean;
    startAnimation(animationId: number, mirror: boolean, delay: number): void;
    performActionStart(aciton: Game_Action): void;
    performAction(aciton: Game_Action): void;
    performActionEnd(): void;
    performAttack(): void;
    performDamage(): void;
    performEvasion(): void;
    performMagicEvasion(): void;
    performCounter(): void;
    performCollapse(): void;
    performVictory(): void;
    performEscape(): void;
    makeActionList(): Game_Action[];
    makeAutoBattleActions(): void;
    makeConfusionActions(): void;
    makeActions(): void;
    onPlayerWalk(): void;
    updateStateSteps(state: IDataState): void;
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
    inputtingAction(): Game_Action;
    selectNextCommand(): boolean;
    selectPreviousCommand(): boolean;
    lastMenuSkill(): IDataSkill;
    setLastMenuSkill(skill: IDataSkill): void;
    lastBattleSkill(): IDataSkill;
    setLastBattleSkill(skill: IDataSkill): void;
    lastCommandSymbol(): string;
    setLastCommandSymbol(symbol: string): void;
    testEscape(item: IDataAllItem): boolean;
    meetsUsableItemConditions(item: IDataAllItem): boolean;
}

declare class Game_Enemy extends Game_Battler
{
    _enemyId: number;
    _letter: string;
    _plural: boolean;
    _screenX: number;
    _screenY: number;

    constructor();
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
    enemy(): IDataEnemy;
    traitObjects(): IDataState[];
    paramBase(paramId: number): number;
    exp(): number;
    gold(): number;
    makeDropItems(): IDataAllItem[];
    dropItemRate(): number;
    itemObject(kind: number, dataId: number): IDataAllItem;
    isSpriteVisible(): boolean;
    screenX(): number;
    screenY(): number;
    battlerName(): string;
    battlerHue(): number;
    originalName(): string;
    name(): string;
    isLetterEmpty(): string;
    setLetter(letter: string): void;
    setPlural(plural: string): void;
    performActionStart(action: Game_Action): void;
    performAction(action: Game_Action): void;
    performActionEnd(): void;
    performDamage(): void;
    performCollapse(): void;
    transform(enemyId: number): void;
    meetsCondition(action: IDataAction): boolean;
    meetsTurnCondition(param1: number, param2: number): boolean;
    meetsHpCondition(param1: number, param2: number): boolean;
    meetsMpCondition(param1: number, param2: number): boolean;
    meetsStateCondition(param: number): boolean;
    meetsPartyLevelCondition(param: number): boolean;
    meetsSwitchCondition(param: number): boolean;
    isActionValid(action: IDataAction): boolean;
    selectAction(actionList: IDataAction[], ratingZero: number): IDataAction;
    selectAllActions(actionList: IDataAction[]): void;
    makeActions(): void;
}

declare class Game_Actors
{
    _data: Game_Actor[];

    constructor();
    initialize(): void;
    actor(actorId: number): Game_Actor;
}

declare class Game_Unit
{
    _inBattle: boolean;

    constructor();
    initialize(): void;
    inBattle(): boolean;
    members(): Game_Battler[];
    aliveMembers(): Game_Battler[];
    deadMembers(): Game_Battler[];
    movableMembers(): Game_Battler[];
    clearActions(): void;
    agility(): number;
    tgrSum(): number;
    randomTarget(): Game_Battler;
    randomDeadTarget(): Game_Battler;
    smoothTarget(): Game_Battler;
    smoothDeadTarget(): Game_Battler;
    clearResults(): void;
    onBattleStart(): void;
    onBattleEnd(): void;
    makeActions(): void;
    select(): void;
    isAllDead(): boolean;
    substituteBattler(): Game_Battler;
}

declare class Game_Party extends Game_Unit
{
    static ABILITY_ENCOUNTER_HALF: number;
    static ABILITY_ENCOUNTER_NONE: number;
    static ABILITY_CANCEL_SURPRISE: number;
    static ABILITY_RAISE_PREEMPTIVE: number;
    static ABILITY_GOLD_DOUBLE: number;
    static ABILITY_DROP_ITEM_DOUBLE: number;

    _gold: number;
    _steps: number;
    _lastItem: Game_Item;
    _menuActorId: number;
    _targetActorId: number;
    _actors: number[];

    _items: { [key: number]: number };
    _weapons: { [key: number]: number };
    _armors: { [key: number]: number };

    constructor();
    initialize(): void;
    initAllItems(): void;
    exists(): boolean;
    size(): number;
    isEmpty(): boolean;
    members(): Game_Actor[];
    allMembers(): Game_Actor[];
    battleMembers(): Game_Actor[];
    maxBattleMembers(): number;
    leader(): Game_Actor;
    reviveBattleMembers(): Game_Actor[];
    items(): IDataItem[];
    weapons(): IDataWeapon[];
    armors(): IDataArmor[];
    equipItems(): IDataEquipItem[];
    allItems(): IDataAllItem[];
    itemContainer(item: IDataAllItem): IDataItem[] | IDataWeapon[] | IDataArmor[];
    setupStartingMembers(): void;
    name(): string;
    setupBattleTest(): void;
    setupBattleTestMembers(): void;
    setupBattleTestItems(): void;
    highestLevel(): number;
    addActor(actorId: number): void;
    removeActor(actorId: number): void;
    gold(): number;
    gainGold(amount: number): void;
    loseGold(amount: number): void;
    maxGold(): number;
    steps(): number;
    increaseSteps(): void;
    numItems(item: IDataAllItem): number;
    maxItems(item: IDataAllItem): number;
    hasMaxItems(item: IDataAllItem): boolean;
    hasItem(item: IDataAllItem, includeEquip?: boolean): boolean;
    isAnyMemberEquipped(item: IDataAllItem): boolean;
    gainItem(item: IDataAllItem, amount: number, includeEquip: boolean): void;
    discardMembersEquip(item: IDataAllItem, amount: number): void;
    loseItem(item: IDataAllItem, amount: number, includeEquip: boolean): void;
    consumeItem(item: IDataAllItem): void;
    canUse(item: IDataAllItem): boolean;
    canInput(): boolean;
    isAllDead(): boolean;
    onPlayerWalk(): void;
    menuActor(): Game_Actor;
    setMenuActor(actor: Game_Actor): void;
    makeMenuActorNext(): void;
    makeMenuActorPrevious(): void;
    targetActor(): Game_Actor;
    setTargetActor(actor: Game_Actor): void;
    lastItem(): IDataAllItem;
    setLastItem(item: IDataAllItem): void;
    swapOrder(index1: number, index2: number): void;
    charactersForSavefile(): [string, number];
    facesForSavefile(): [string, number];
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

    _interpreter: Game_Interpreter;
    _turnCount: number;
    _enemies: Game_Enemy[];
    _troopId: number;
    _eventFlags: { [key: number]: boolean };
    _namesCount: { [key: string]: number };

    constructor();
    initialize(): void;
    isEventRunning(): boolean;
    updateInterpreter(): void;
    turnCount(): number;
    members(): Game_Enemy[];
    clear(): void;
    troop(): IDataTroop;
    setup(troopId: number): void;
    makeUniqueNames(): void;
    letterTable(): string[];
    enemyNames(): string[];
    meetsConditions(page: IDataPage): boolean;
    setupBattleEvent(): void;
    increaseTurn(): void;
    expTotal(): number;
    goldTotal(): number;
    goldRate(): number;
    makeDropItems(): IDataItem[];
}

declare class Game_Map
{
    _interpreter: Game_Interpreter;
    _mapId: number;
    _tilesetId: number;
    _events: Game_Event[];
    _commonEvents: Game_CommonEvent[];
    _vehicles: Game_Vehicle[];
    _displayX: number;
    _displayY: number;
    _nameDisplay: boolean;
    _scrollDirection: number;
    _scrollRest: number;
    _scrollSpeed: number;
    _parallaxName: string;
    _parallaxZero: boolean;
    _parallaxLoopX: boolean;
    _parallaxLoopY: boolean;
    _parallaxSx: number;
    _parallaxSy: number;
    _parallaxX: number;
    _parallaxY: number;
    _battleback1Name: string;
    _battleback2Name: string;
    _needsRefresh: boolean;

    constructor();
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
    parallelCommonEvents(): Game_CommonEvent[];
    setupScroll(): void;
    setupParallax(): void;
    setupBattleback(): void;
    setDisplayPos(x: number, y: number): void;
    parallaxOx(): number;
    parallaxOy(): number;
    tileset(): IDataTileset;
    tilesetFlags(): number[];
    displayName(): string;
    width(): number;
    height(): number;
    data(): number[];
    isLoopHorizontal(): boolean;
    isLoopVertical(): boolean;
    isDashDisabled(): boolean;
    encounterList(): IDataEncounterList;
    encounterStep(): number;
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
    tileEventsXy(x: number, y: number): Game_Event[];
    eventIdXy(x: number, y: number): number;
    scrollDown(distance: number): void;
    scrollLeft(distance: number): void;
    scrollRight(distance: number): void;
    scrollUp(distance: number): void;
    isValid(x: number, y: number): boolean;
    checkPassage(x: number, y: number): boolean;
    tileId(x: number, y: number, z: number): number;
    layeredTiles(x: number, y: number): number[];
    allTiles(x: number, y: number): number[];
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
    _commonEventId: number;
    _interpreter: Game_Interpreter;

    constructor(commonEventId: number);
    initialize(commonEventId: number): void;
    event(): IDataCommonEvent;
    list(): IDataList;
    refresh(): void;
    isActive(): boolean;
    update(): void;
}

declare class Game_CharacterBase
{
    x: number;
    y: number;

    _x: number;
    _y: number;
    _realX: number;
    _realY: number;
    _moveSpeed: number;
    _moveFrequency: number;
    _opacity: number;
    _blendMode: number;
    _direction: number;
    _pattern: number;
    _priorityType: number;
    _tileId: number;
    _characterName: string;
    _characterIndex: number;
    _isObjectCharacter: boolean;
    _walkAnime: boolean;
    _stepAnime: boolean;
    _directionFix: boolean;
    _through: boolean;
    _transparent: boolean;
    _bushDepth: number;
    _animationId: number;
    _balloonId: number;
    _animationPlaying: boolean;
    _balloonPlaying: boolean;
    _animationCount: number;
    _stopCount: number;
    _jumpCount: number;
    _jumpPeak: number;
    _movementSuccess: boolean;

    constructor();
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
    copyPosition(character: Game_CharacterBase): void;
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
    isNearTheScreen(): boolean;
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

    _moveRouteForcing: boolean;
    _moveRoute: IDataMoveRoute;
    _moveRouteIndex: number;
    _originalMoveRoute: IDataMoveRoute;
    _originalMoveRouteIndex: number;
    _waitCount: number;

    constructor();
    initialize(): void;
    initMembers(): void;
    memorizeMoveRoute(): void;
    restoreMoveRoute(): void;
    isMoveRouteForcing(): boolean;
    setMoveRoute(moveRoute: IDataMoveRoute): void;
    forceMoveRoute(moveRoute: IDataMoveRoute): void;
    updateStop(): void;
    updateRoutineMove(): void;
    processMoveCommand(command: IDataMoveRouteCommand): void
    deltaXFrom(x: number): number;
    deltaYFrom(y: number): number;
    moveRandom(): void;
    moveTowardCharacter(character: Game_CharacterBase): void;
    moveAwayFromCharacter(character: Game_CharacterBase): void;
    turnTowardCharacter(character: Game_CharacterBase): void;
    turnAwayFromCharacter(character: Game_CharacterBase): void;
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
    _vehicleType: string;
    _vehicleGettingOn: boolean;
    _vehicleGettingOff: boolean;
    _dashing: boolean;
    _needsMapReload: boolean;
    _transferring: boolean;
    _newMapId: number;
    _newX: number;
    _newY: number;
    _newDirection: number;
    _fadeType: number;
    _followers: Game_Followers;
    _encounterCount: number;

    constructor();
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
    vehicle(): IVehicle;
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
    meetsEncounterConditions(encounter: IDataEncounterList): boolean;
    executeEncounter(): boolean;
    startMapEvent(x: number, y: number, triggers: number[], normal: boolean): void;
    moveByInput(): void;
    canMove(): boolean;
    getInputDirection(): number;
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
    _memberIndex: number;

    constructor();
    initialize(): void;
    refresh(): void;
    actor(): Game_Actor;
    isVisible(): boolean;
    update(): void;
    chaseCharacter(character: Game_CharacterBase): void;
}

declare class Game_Followers extends Game_Character
{
    _visible: boolean;
    _gathering: boolean;
    _data: Game_Follower[];

    constructor();
    initialize(): void;
    isVisible(): boolean;
    show(): void;
    hide(): void;
    follower(index: number): Game_Follower;
    forEach(callback: Function, thisObject: this): void;
    reverseEach(callback: Function, thisObject: this): void;
    refresh(): void;
    update(): void;
    updateMove(): void;
    jumpAll(): void;
    synchronize(x: number, y: number, d: number): void;
    gather(): void;
    areGathering(): boolean;
    visibleFollowers(): boolean;
    areMoving(): boolean;
    areGathered(): boolean;
    isSomeoneCollided(): boolean;
}

declare class Game_Vehicle extends Game_Character
{
    _type: string;
    _mapId: number;
    _altitude: number;
    _driving: boolean;
    _bgm: IAudioObject;

    constructor();
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
    setBgm(bgm: IAudioObject): void;
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
    _mapId: number;
    _eventId: number;
    _moveType: number;
    _trigger: number;
    _starting: boolean;
    _erased: boolean;
    _pageIndex: number;
    _originalPattern: number;
    _originalDirection: number;
    _prelockDirection: number;
    _locked: boolean;
    _interpreter: Game_Interpreter;

    constructor();
    constructor(mapId: number, eventId: number);
    initialize(): void;
    initialize(mapId: number, eventId: number): void;
    initMembers(): void;
    eventId(): number;
    event(): IDataMapEvent;
    page(): IDataMapEventPage;
    list(): IDataMapEventPageList;
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
    meetsConditions(page: IDataMapEventPage): boolean;
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
    forceMoveRoute(moveRoute: IDataMoveRoute): void;
}

declare class Game_Interpreter
{
    _depth: number;
    _branch: { [key: number]: number };
    _params: any[];
    _indent: number;
    _frameCount: number;
    _freezeChecker: number;
    _mapId: number;
    _eventId: number;
    _list: IDataMapEventPageList[];
    _index: number;
    _childInterpreter: Game_Interpreter;
    _character: Game_Character;

    constructor(depth?: number);
    initialize(depth?: number): void;
    checkOverflow(): void;
    clear(): void;
    setup(list: IDataMapEventPageList[], eventId?: number): void;
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
    currentCommand(): IDataMapEventPageList;
    nextEventCode(): number;
    iterateActorId(param: number, callback: Function): void;
    iterateActorEx(param1: number, param2: number, callback: Function): void;
    iterateActorIndex(param: number, callback: Function): void;
    iterateEnemyIndex(param: number, callback: Function): void;
    iterateBattler(param1: number, param2: number, callback: Function): void;
    character(param: number): Game_Character;
    operateValue(operation: number, operandType: number, operand: number): number;
    changeHp(target: Game_Battler, value: number, allowDeath: boolean): void;
    command101(): boolean;
    command102(): boolean;
    setupChoices(params: (number|string)[]): void;
    command402(): boolean;
    command403(): boolean;
    command103(): boolean;
    setupNumInput(params: (number|string)[]): void;
    command104(): boolean;
    setupItemChoice(params: (number|string)[]): void;
    command105(): boolean;
    command108(): boolean;
    command111(): boolean;
    command411(): boolean;
    command112(): boolean;
    command413(): boolean;
    command113(): boolean;
    command115(): boolean;
    command117(): boolean;
    setupChild(list: IDataMapEventPageList[], eventId: number): void;
    command118(): boolean;
    command119(): boolean;
    jumpTo(index: number): void;
    command121(): boolean;
    command122(): boolean;
    gameDataOperand(type: number, param1: number, param2: number): number;
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
    static requestImages(list: IDataMapEventPageList[], commonList: number[]): void;
}

declare class Scene_Base extends Stage
{
    _active: boolean;
    _fadeSign: number;
    _fadeDuration: number;
    _fadeSprite: ScreenSprite;
    _windowLayer: WindowLayer;
    _spriteset: Spriteset_Base;

    constructor();
    initialize(): void;
    create(): void;
    isActive(): boolean;
    isReady(): boolean;
    start(): void;
    update(): void;
    stop(): void;
    isBusy(): boolean;
    terminate(): void;
    createWindowLayer(): void;
    addWindow(window: Window_Base): void;
    startFadeIn(duration?: number, white?: boolean): void;
    startFadeOut(duration?: number, white?: boolean): void;
    createFadeSprite(white?: boolean): void;
    updateFade(): void;
    updateChildren(): void;
    popScene(): void;
    checkGameover(): void;
    fadeOutAll(): void;
    fadeSpeed(): number;
    slowFadeSpeed(): number;
    attachReservation(): void;
    detachReservation(): void;
}

declare class Scene_Boot extends Scene_Base
{
    _startDate: number;

    static loadSystemImages(): void;

    constructor();
    initialize(): void;
    create(): void;
    loadSystemWindowImage(): void;
    isReady(): boolean;
    isGameFontLoaded(): boolean;
    start(): void;
    updateDocumentTitle(): void;
    checkPlayerLocation(): void;
}

declare class Scene_Title extends Scene_Base
{
    _commandWindow: Window_TitleCommand;
    _backSprite1: Sprite;
    _backSprite2: Sprite;
    _gameTitleSprite: Sprite;

    constructor();
    initialize(): void;
    create(): void;
    start(): void;
    update(): void;
    isBusy(): boolean;
    terminate(): void;
    createBackground(): void;
    createForeground(): void;
    drawGameTitle(): void;
    centerSprite(sprite: Sprite_Base): void;
    createCommandWindow(): void;
    commandNewGame(): void;
    commandContinue(): void;
    commandOptions(): void;
    playTitleMusic(): void;
}

declare class Scene_Map extends Scene_Base
{
    _waitCount: number;
    _encounterEffectDuration: number;
    _mapLoaded: boolean;
    _mapNameWindow: Window_MapName;
    _messageWindow: Window_Message;
    _scrollTextWindow: Window_ScrollText;
    _spriteset: Spriteset_Map;
    _touchCount: number;
    _transfer: boolean;

    menuCalling: boolean;

    constructor();
    initialize(): void;
    create(): void;
    isReady(): boolean;
    onMapLoaded(): void;
    start(): void;
    update(): void;
    updateMainMultiply(): void;
    updateMain(): void;
    isFastForward(): boolean;
    stop(): void;
    isBusy(): boolean;
    terminate(): void;
    needsFadeIn(): boolean;
    needsSlowFadeOut(): boolean;
    updateWaitCount(): boolean;
    updateDestination(): void;
    isMapTouchOk(): boolean;
    processMapTouch(): void;
    isSceneChangeOk(): boolean;
    updateScene(): void;
    createDisplayObjects(): void;
    createSpriteset(): void;
    createAllWindows(): void;
    createMapNameWindow(): void;
    createMessageWindow(): void;
    createScrollTextWindow(): void;
    updateTransferPlayer(): void;
    updateEncounter(): void;
    updateCallMenu(): void;
    isMenuEnabled(): boolean;
    isMenuCalled(): boolean;
    callMenu(): void;
    updateCallDebug(): void;
    isDebugCalled(): boolean;
    fadeInForTransfer(): void;
    fadeOutForTransfer(): void;
    launchBattle(): void;
    stopAudioOnBattleStart(): void;
    startEncounterEffect(): void;
    updateEncounterEffect(): void;
    snapForBattleBackground(): void;
    startFlashForEncounter(duration: number): void;
    encounterEffectSpeed(): number;
}

declare class Scene_MenuBase extends Scene_Base
{
    _actor: Game_Actor;
    _backgroundSprite: Sprite;
    _helpWindow: Window_Help;

    constructor();
    initialize(): void;
    create(): void;
    actor(): Game_Actor;
    updateActor(): void;
    createBackground(): void;
    setBackgroundOpacity(opacity: number): void;
    createHelpWindow(): void;
    nextActor(): void;
    previousActor(): void;
    onActorChange(): void;
}

declare class Scene_Menu extends Scene_MenuBase
{
    _statusWindow: Window_MenuStatus;
    _goldWindow: Window_Gold;
    _commandWindow: Window_MenuCommand;

    constructor();
    initialize(): void;
    create(): void;
    start(): void;
    createCommandWindow(): void;
    createGoldWindow(): void;
    createStatusWindow(): void;
    commandItem(): void;
    commandPersonal(): void;
    commandFormation(): void;
    commandOptions(): void;
    commandSave(): void;
    commandGameEnd(): void;
    onPersonalOk(): void;
    onPersonalCancel(): void;
    onFormationOk(): void;
    onFormationCancel(): void;
}

declare class Scene_ItemBase extends Scene_MenuBase
{
    _actorWindow: Window_MenuActor;
    _itemWindow: Window_Selectable;

    constructor();
    initialize(): void;
    create(): void;
    createActorWindow(): void;
    item(): IDataAllItem;
    user(): Game_Actor;
    isCursorLeft(): boolean;
    showSubWindow(window: Window_Base): void;
    hideSubWindow(window: Window_Base): void;
    onActorOk(): void;
    onActorCancel(): void;
    determineItem(): void;
    useItem(): void;
    activateItemWindow(): void;
    itemTargetActors(): void;
    canUse(): boolean;
    isItemEffectsValid(): boolean;
    applyItem(): void;
    checkCommonEvent(): void;
}

declare class Scene_Item extends Scene_ItemBase
{
    _categoryWindow: Window_ItemCategory;
    _itemWindow: Window_ItemList;

    constructor();
    initialize(): void;
    create(): void;
    createCategoryWindow(): void;
    createItemWindow(): void;
    user(): Game_Actor;
    onCategoryOk(): void;
    onItemOk(): void;
    onItemCancel(): void;
    playSeForItem(): void;
    useItem(): void;
}

declare class Scene_Skill extends Scene_ItemBase
{
    _skillTypeWindow: Window_SkillType;
    _statusWindow: Window_SkillStatus;
    _itemWindow: Window_SkillList;

    constructor();
    initialize(): void;
    create(): void;
    start(): void;
    createSkillTypeWindow(): void;
    createStatusWindow(): void;
    createItemWindow(): void;
    refreshActor(): void;
    user(): Game_Actor;
    commandSkill(): void;
    onItemOk(): void;
    onItemCancel(): void;
    playSeForItem(): void;
    useItem(): void;
    onActorChange(): void;
}

declare class Scene_Equip extends Scene_MenuBase
{
    _statusWindow: Window_EquipStatus;
    _commandWindow: Window_EquipCommand;
    _slotWindow: Window_EquipSlot;
    _itemWindow: Window_EquipItem;

    constructor();
    initialize(): void;
    create(): void;
    createStatusWindow(): void;
    createCommandWindow(): void;
    createSlotWindow(): void;
    createItemWindow(): void;
    refreshActor(): void;
    commandEquip(): void;
    commandOptimize(): void;
    commandClear(): void;
    onSlotOk(): void;
    onSlotCancel(): void;
    onItemOk(): void;
    onItemCancel(): void;
    onActorChange(): void;
}

declare class Scene_Status extends Scene_MenuBase
{
    _statusWindow: Window_Status;

    constructor();
    initialize(): void;
    create(): void;
    refreshActor(): void;
    onActorChange(): void;
}

declare class Scene_Options extends Scene_MenuBase
{
    _optionsWindow: Window_Options;

    constructor();
    initialize(): void;
    create(): void;
    terminate(): void;
    createOptionsWindow(): void;
}

declare class Scene_File extends Scene_MenuBase
{
    _listWindow: Window_SavefileList;
    _helpWindow: Window_Help;

    constructor();
    initialize(): void;
    create(): void;
    start(): void;
    savefileId(): number;
    createHelpWindow(): void;
    createListWindow(): void;
    mode(): string;
    activateListWindow(): void;
    helpWindowText(): string;
    firstSavefileIndex(): number;
    onSavefileOk(): void;
}

declare class Scene_Save extends Scene_File
{
    constructor();
    initialize(): void;
    mode(): string;
    helpWindowText(): string;
    firstSavefileIndex(): number;
    onSavefileOk(): void;
    onSaveSuccess(): void;
    onSaveFailure(): void;
}

declare class Scene_Load extends Scene_File
{
    _loadSuccess: boolean;

    constructor();
    initialize(): void;
    terminate(): void;
    mode(): string;
    helpWindowText(): string;
    firstSavefileIndex(): number;
    onSavefileOk(): void;
    onSaveSuccess(): void;
    onSaveFailure(): void;
    reloadMapIfUpdated(): void;
}

declare class Scene_GameEnd extends Scene_MenuBase
{
    _commandWindow: Window_GameEnd;

    constructor();
    initialize(): void;
    create(): void;
    stop(): void;
    createBackground(): void;
    createCommandWindow(): void;
    commandToTitle(): void;
}

declare class Scene_Shop extends Scene_MenuBase
{
    _goods: any[][];
    _purchaseOnly: boolean;
    _item: IDataAllItem;
    _goldWindow: Window_Gold;
    _commandWindow: Window_ShopCommand;
    _dummyWindow: Window_Base;
    _numberWindow: Window_ShopNumber;
    _statusWindow: Window_ShopStatus;
    _buyWindow: Window_ShopBuy;
    _categoryWindow: Window_ItemCategory;
    _sellWindow: Window_ShopSell;

    constructor();
    initialize(): void;
    prepare(goods: any[][], purchaseOnly: boolean): void;
    create(): void;
    createGoldWindow(): void;
    createCommandWindow(): void;
    createDummyWindow(): void;
    createNumberWindow(): void;
    createStatusWindow(): void;
    createBuyWindow(): void;
    createCategoryWindow(): void;
    createSellWindow(): void;
    activateBuyWindow(): void;
    activateSellWindow(): void;
    commandBuy(): void;
    commandSell(): void;
    onBuyOk(): void;
    onBuyCancel(): void;
    onCategoryOk(): void;
    onCategoryCancel(): void;
    onSellOk(): void;
    onSellCancel(): void;
    onNumberOk(): void;
    onNumberCancel(): void;
    doBuy(number: number): void;
    doSell(number: number): void;
    endNumberInput(): void;
    maxBuy(): number;
    maxSell(): number;
    money(): number;
    currencyUnit(): string;
    buyingPrice(): number;
    sellingPrice(): number;
}

declare class Scene_Name extends Scene_MenuBase
{
    _actor: Game_Actor;
    _actorId: number;
    _maxLength: number;
    _editWindow: Window_NameEdit;
    _inputWindow: Window_NameInput;

    constructor();
    initialize(): void;
    prepare(actorId: number, maxLength: number): void;
    create(): void;
    start(): void;
    createEditWindow(): void;
    createInputWindow(): void;
    onInputOk(): void;
}

declare class Scene_Debug extends Scene_MenuBase
{
    _editWindow: Window_DebugEdit;
    _rangeWindow: Window_DebugRange;
    _debugHelpWindow : Window_Base;

    constructor();
    initialize(): void;
    create(): void;
    createRangeWindow(): void;
    createEditWindow(): void;
    createDebugHelpWindow(): void;
    onRangeOk(): void;
    onEditCancel(): void;
    refreshHelpWindow(): void;
    helpText(): string;
}

declare class Scene_Battle extends Scene_Base
{
    _partyCommandWindow: Window_PartyCommand;
    _actorCommandWindow: Window_ActorCommand;
    _skillWindow: Window_BattleSkill;
    _itemWindow: Window_BattleItem;
    _actorWindow: Window_BattleActor;
    _enemyWindow: Window_BattleEnemy;
    _helpWindow: Window_Help;
    _statusWindow: Window_BattleStatus;
    _spriteset: Spriteset_Battle;
    _logWindow: Window_BattleLog;
    _messageWindow: Window_Message;
    _scrollTextWindow: Window_ScrollText;

    constructor();
    initialize(): void;
    create(): void;
    start(): void;
    update(): void;
    updateBattleProcess(): void;
    isAnyInputWindowActive(): boolean;
    changeInputWindow(): void;
    stop(): void;
    terminate(): void;
    needsSlowFadeOut(): boolean;
    updateStatusWindow(): void;
    updateWindowPositions(): void;
    createDisplayObjects(): void;
    createSpriteset(): void;
    createAllWindows(): void;
    createLogWindow(): void;
    createStatusWindow(): void;
    createPartyCommandWindow(): void;
    createActorCommandWindow(): void;
    createHelpWindow(): void;
    createSkillWindow(): void;
    createItemWindow(): void;
    createActorWindow(): void;
    createEnemyWindow(): void;
    createMessageWindow(): void;
    createScrollTextWindow(): void;
    refreshStatus(): void;
    startPartyCommandSelection(): void;
    commandFight(): void;
    commandEscape(): void;
    startActorCommandSelection(): void;
    commandAttack(): void;
    commandSkill(): void;
    commandGuard(): void;
    commandItem(): void;
    selectNextCommand(): void;
    selectPreviousCommand(): void;
    selectActorSelection(): void;
    onActorOk(): void;
    onActorCancel(): void;
    selectEnemySelection(): void;
    onEnemyOk(): void;
    onEnemyCancel(): void;
    onSkillOk(): void;
    onSkillCancel(): void;
    onItemOk(): void;
    onItemCancel(): void;
    onSelectAction(): void;
    endCommandSelection(): void;
}

declare class Scene_Gameover extends Scene_Base
{
    _backSprite: Sprite;

    constructor();
    initialize(): void;
    create(): void;
    start(): void;
    update(): void;
    stop(): void;
    terminate(): void;
    playGameoverMusic(): void;
    createBackground(): void;
    isTriggered(): boolean;
    gotoTitle(): void;
}

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

declare interface ITextState
{
    index?: number;
    x?: number;
    y?: number;
    left?: number;
    text?: string;
    height?: number;
}

declare class Window_Base extends Window
{
    static _iconWidth: number;
    static _iconHeight: number;
    static _faceWidth: number;
    static _faceHeight: number;

    _opening: boolean;
    _closing: boolean;
    _dimmerSprite: Sprite;

    constructor(x?: number, y?: number, width?: number, height?: number);
    initialize(): void;
    initialize(x?: number, y?: number, width?: number, height?: number): void;
    lineHeight(): number;
    standardFontFace(): string;
    standardFontSize(): number;
    standardPadding(): number;
    textPadding(): number;
    standardBackOpacity(): number;
    loadWindowskin(): void;
    updatePadding(): void;
    updateBackOpacity(): void;
    contentsWidth(): number;
    contentsHeight(): number;
    fittingHeight(numLines: number): number;
    updateTone(): void;
    createContents(): void;
    resetFontSettings(): void;
    resetTextColor(): void;
    update(): void;
    updateOpen(): void;
    updateClose(): void;
    open(): void;
    close(): void;
    isOpening(): boolean;
    isClosing(): boolean;
    show(): void;
    hide(): void;
    activate(): void;
    deactivate(): void;
    textColor(n: number): string;
    normalColor(): string;
    systemColor(): string;
    crisisColor(): string;
    deathColor(): string;
    gaugeBackColor(): string;
    hpGaugeColor1(): string;
    hpGaugeColor2(): string;
    mpGaugeColor1(): string;
    mpGaugeColor2(): string;
    mpCostColor(): string;
    powerUpColor(): string;
    powerDownColor(): string;
    tpGaugeColor1(): string;
    tpGaugeColor2(): string;
    tpCostColor(): string;
    pendingColor(): string;
    translucentOpacity(): number;
    changeTextColor(color: string): void;
    changePaintOpacity(enabled: boolean): void;
    drawText(text: string, x: number, y: number, maxWidth?: number, align?: string): void;
    textWidth(text: string): number;
    drawTextEx(text: string, x: number, y: number): number;
    convertEscapeCharacters(text: string): string;
    actorName(n: number): string;
    partyMemberName(n: number): string;
    processCharacter(textState: ITextState): void;
    processNormalCharacter(textState: ITextState): void;
    processNewLine(textState: ITextState): void;
    processNewPage(textState: ITextState): void;
    obtainEscapeCode(textState: ITextState): string;
    obtainEscapeParam(textState: ITextState): string;
    processEscapeCharacter(code : string, textState: ITextState): void;
    processDrawIcon(iconIndex: number, textState: ITextState): void;
    makeFontBigger(): void;
    makeFontSmaller(): void;
    calcTextHeight(textState: ITextState, all: boolean): number;
    drawIcon(iconIndex: number, x: number, y: number): void;
    drawFace(faceName: string, faceIndex: number, x: number, y: number, width?: number, height?: number): void;
    drawCharacter(characterName: string, characterIndex: number, x: number, y: number): void;
    drawGauge(x: number, y: number, width: number, rate: number, color1: string, color2: string): void;
    hpColor(actor: Game_Battler): string;
    mpColor(actor: Game_Battler): string;
    tpColor(actor: Game_Battler): string;
    drawActorCharacter(actor: Game_Actor, x: number, y: number): void;
    drawActorFace(actor: Game_Actor, x: number, y: number, width?: number, height?: number): void;
    drawActorName(actor: Game_Actor, x: number, y: number, width?: number): void;
    drawActorClass(actor: Game_Actor, x: number, y: number, width?: number): void;
    drawActorNickname(actor: Game_Actor, x: number, y: number, width?: number): void;
    drawActorLevel(actor: Game_Actor, x: number, y: number): void;
    drawActorIcons(actor: Game_Actor, x: number, y: number, width?: number): void;
    drawCurrentAndMax(current: number, max: number, x: number, y: number, width: number, color1: string, color2: string): void;
    drawActorHp(actor: Game_Actor, x: number, y: number, width?: number): void;
    drawActorMp(actor: Game_Actor, x: number, y: number, width?: number): void;
    drawActorTp(actor: Game_Actor, x: number, y: number, width?: number): void;
    drawActorSimpleStatus(actor: Game_Actor, x: number, y: number, width: number): void;
    drawItemName(item: IDataAllItem, x: number, y: number, width?: number): void;
    drawCurrencyValue(value: number, unit: string, x: number, y: number, width: number): void;
    paramchangeTextColor(change: number): string;
    setBackgroundType(type: number): void;
    showBackgroundDimmer(): void;
    hideBackgroundDimmer(): void;
    updateBackgroundDimmer(): void;
    refreshDimmerBitmap(): void;
    dimColor1(): string;
    dimColor2(): string;
    canvasToLocalX(x: number): number;
    canvasToLocalY(y: number): number;
}

declare class Window_Selectable extends Window_Base
{
    _index: number;
    _cursorFixed: boolean;
    _cursorAll: boolean;
    _stayCount: number;
    _helpWindow: Window_Help;
    _handlers: { [key: string]: Function };
    _touching: boolean;
    _scrollX: number;
    _scrollY: number;

    downArrowVisible: boolean;
    upArrowVisible: boolean;

    constructor(x?: number, y?: number, width?: number, height?: number);
    initialize(): void;
    initialize(x?: number, y?: number, width?: number, height?: number): void;
    index(): number;
    cursorFixed(): boolean;
    setCursorFixed(cursorFixed: boolean): void;
    cursorAll(): boolean;
    setCursorAll(cursorAll: boolean): void;
    maxCols(): number;
    maxItems(): number;
    spacing(): number;
    itemWidth(): number;
    itemHeight(): number;
    maxRows(): number;
    activate(): void;
    deactivate(): void;
    select(index: number): void;
    deselect(): void;
    reselect(): void;
    row(): number;
    topRow(): number;
    maxTopRow(): number;
    setTopRow(row: number): void;
    resetScroll(): void;
    maxPageRows(): number;
    maxPageItems(): number;
    isHorizontal(): boolean;
    bottomRow(): number;
    setBottomRow(row: number): void;
    topIndex(): number;
    itemRect(index: number): Rectangle;
    itemRectForText(index: number): Rectangle;
    setHelpWindow(helpWindow: Window_Help): void;
    showHelpWindow(): void;
    hideHelpWindow(): void;
    setHandler(symbol: string, method: Function): void;
    isHandled(symbol: string): boolean;
    callHandler(symbol: string): void;
    isOpenAndActive(): boolean;
    isCursorMovable(): boolean;
    cursorDown(wrap: boolean): void;
    cursorUp(wrap: boolean): void;
    cursorRight(wrap: boolean): void;
    cursorLeft(wrap: boolean): void;
    cursorPagedown(): void;
    cursorPageup(): void;
    scrollDown(): void;
    scrollUp(): void;
    update(): void;
    updateArrows(): void;
    processCursorMove(): void;
    processHandling(): void;
    processWheel(): void;
    processTouch(): void;
    isTouchedInsideFrame(): boolean;
    onTouch(triggered: boolean): void;
    hitTest(x: number, y: number): number;
    isContentsArea(x: number, y: number): boolean;
    isTouchOkEnabled(): boolean;
    isOkEnabled(): boolean;
    isCancelEnabled(): boolean;
    isOkTriggered(): boolean;
    isCancelTriggered(): boolean;
    processOk(): void;
    playOkSound(): void;
    playBuzzerSound(): void;
    callOkHandler(): void;
    processCancel(): void;
    callCancelHandler(): void;
    processPageup(): void;
    processPagedown(): void;
    updateInputData(): void;
    updateCursor(): void;
    isCursorVisible(): boolean;
    ensureCursorVisible(): void;
    callUpdateHelp(): void;
    updateHelp(): void;
    setHelpWindowItem(item: IDataAllItem): void;
    isCurrentItemEnabled(): boolean;
    drawAllItems(): void;
    drawItem(index: number): void;
    clearItem(index: number): void;
    redrawItem(index: number): void;
    redrawCurrentItem(): void;
    refresh(): void;
}

declare class IDataCommandList
{
    name: string;
    symbol: string;
    enabled: boolean;
    ext: number;
}

declare class Window_Command extends Window_Selectable
{
    _list: IDataCommandList[];

    constructor(x?: number, y?: number);
    initialize(): void;
    initialize(x?: number, y?: number): void;
    windowWidth(): number;
    windowHeight(): number;
    numVisibleRows(): number;
    maxItems(): number;
    clearCommandList(): void;
    makeCommandList(): void;
    addCommand(name: string, symbol: string, enabled?: boolean, ext?: number): void;
    commandName(index: number): string;
    commandSymbol(index: number): string;
    isCommandEnabled(index: number): boolean;
    currentData(): IDataCommandList;
    isCurrentItemEnabled(): boolean;
    currentSymbol(): string;
    currentExt(): number;
    findSymbol(symbol: string): number;
    selectSymbol(symbol: string): void;
    findExt(ext: number): number;
    selectExt(ext: number): void;
    drawItem(index: number): void;
    itemTextAlign(): string;
    isOkEnabled(): boolean;
    callOkHandler(): void;
    refresh(): void;
}

declare class Window_HorzCommand extends Window_Command
{
    constructor(x?: number, y?: number);
    initialize(): void;
    initialize(x?: number, y?: number): void;
    numVisibleRows(): number;
    maxCols(): number;
    itemTextAlign(): string;
}

declare class Window_Help extends Window_Base
{
    _text: string;

    constructor(numLines?: number);
    initialize(): void;
    initialize(numLines?: number): void;
    setText(text: string): void;
    clear(): void;
    setItem(item: IDataAllItem): void;
    refresh(): void;
}

declare class Window_Gold extends Window_Base
{
    constructor(x?: number, y?: number);
    initialize(): void;
    initialize(x?: number, y?: number): void;
    windowWidth(): number;
    windowHeight(): number;
    refresh(): void;
    value(): number;
    currencyUnit(): string;
    open(): void;
}

declare class Window_MenuCommand extends Window_Command
{
    static _lastCommandSymbol: string;

    static initCommandPosition(): void;

    constructor(x?: number, y?: number);
    initialize(): void;
    initialize(x?: number, y?: number): void;
    windowWidth(): number;
    numVisibleRows(): number;
    makeCommandList(): void;
    addMainCommands(): void;
    addFormationCommand(): void;
    addOriginalCommands(): void;
    addOptionsCommand(): void;
    addSaveCommand(): void;
    addGameEndCommand(): void;
    needsCommand(name: string): boolean;
    areMainCommandsEnabled(): boolean;
    isFormationEnabled(): boolean;
    isOptionsEnabled(): boolean;
    isSaveEnabled(): boolean;
    isGameEndEnabled(): boolean;
    processOk(): void;
    selectLast(): void;
}

declare class Window_MenuStatus extends Window_Selectable
{
    _formationMode: boolean;
    _pendingIndex: number;

    constructor(x?: number, y?: number);
    initialize(): void;
    initialize(x?: number, y?: number): void;
    windowWidth(): number;
    windowHeight(): number;
    maxItems(): number;
    itemHeight(): number;
    numVisibleRows(): number;
    loadImages(): void;
    drawItem(index: number): void;
    drawItemBackground(index: number): void;
    drawItemImage(index: number): void;
    drawItemStatus(index: number): void;
    processOk(): void;
    isCurrentItemEnabled(): boolean;
    selectLast(): void;
    formationMode(): boolean;
    setFormationMode(formationMode: boolean): void;
    pendingIndex(): number;
    setPendingIndex(index: number): void;
}

declare class Window_MenuActor extends Window_MenuStatus
{
    constructor();
    initialize(): void;
    processOk(): void;
    selectLast(): void;
    selectForItem(item: IDataAllItem): void;
}

declare class Window_ItemCategory extends Window_HorzCommand
{
    _itemWindow: Window_ItemList;

    constructor();
    initialize(): void;
    windowWidth(): number;
    maxCols(): number;
    update(): void;
    makeCommandList(): void;
    setItemWindow(itemWindow: Window_ItemList): void;
}

declare class Window_ItemList extends Window_Selectable
{
    _category: string;
    _data: IDataAllItem[];

    constructor(x?: number, y?: number, width?: number, height?: number);
    initialize(): void;
    initialize(x?: number, y?: number, width?: number, height?: number): void;
    setCategory(category: string): void;
    spacing(): number;
    maxItems(): number;
    item(): IDataAllItem;
    isCurrentItemEnabled(): boolean;
    includes(item: IDataAllItem): boolean;
    needsNumber(): number;
    isEnabled(item: IDataAllItem): boolean;
    makeItemList(): void;
    selectLast(): void;
    drawItem(index: number): void;
    numberWidth(): number;
    drawItemNumber(item: IDataAllItem, x: number, y: number, width: number): void;
    updateHelp(): void;
    refresh(): void;
}

declare class Window_SkillType extends Window_Command
{
    _actor: Game_Actor;
    _skillWindow: Window_SkillList;

    constructor(x?: number, y?: number);
    initialize(): void;
    initialize(x?: number, y?: number): void;
    windowWidth(): number;
    setActor(actor: Game_Actor): void;
    numVisibleRows(): number;
    makeCommandList(): void;
    update(): void;
    setSkillWindow(skillWindow: Window_SkillList): void;
    selectLast(): void;
}

declare class Window_SkillStatus extends Window_Base
{
    _actor: Game_Actor;

    constructor(x?: number, y?: number, width?: number, height?: number);
    initialize(): void;
    initialize(x?: number, y?: number, width?: number, height?: number): void;
    setActor(actor: Game_Actor): void;
    refresh(): void;
}

declare class Window_SkillList extends Window_Selectable
{
    _actor: Game_Actor;
    _stypeId: number;
    _data: IDataAllItem[];

    constructor(x?: number, y?: number, width?: number, height?: number);
    initialize(): void;
    initialize(x?: number, y?: number, width?: number, height?: number): void;
    setActor(actor: Game_Actor): void;
    setStypeId(stypeId: number): void;
    maxCols(): number;
    spacing(): number;
    maxItems(): number;
    item(): IDataAllItem;
    isCurrentItemEnabled(): boolean;
    includes(item: IDataAllItem): boolean;
    isEnabled(item: IDataAllItem): boolean;
    makeItemList(): void;
    selectLast(): void;
    drawItem(index: number): void;
    costWidth(): number;
    drawSkillCost(skill: IDataSkill, x: number, y: number, width: number): void;
    updateHelp(): void;
    refresh(): void;
}

declare class Window_EquipStatus extends Window_Base
{
    _actor: Game_Actor;
    _tempActor: Game_Actor;

    constructor(x?: number, y?: number);
    initialize(): void;
    initialize(x?: number, y?: number): void;
    windowWidth(): number;
    windowHeight(): number;
    numVisibleRows(): number;
    setActor(actor: Game_Actor): void;
    refresh(): void;
    setTempActor(tempActor: Game_Actor): void;
    drawItem(x: number, y: number, paramId: number): void;
    drawParamName(x: number, y: number, paramId: number): void;
    drawCurrentParam(x: number, y: number, paramId: number): void;
    drawRightArrow(x: number, y: number): void;
    drawNewParam(x: number, y: number, paramId: number): void;
}

declare class Window_EquipCommand extends Window_HorzCommand
{
    _windowWidth: number;

    constructor(x?: number, y?: number, width?: number);
    initialize(): void;
    initialize(x?: number, y?: number, width?: number): void;
    windowWidth(): number;
    maxCols(): number;
    makeCommandList(): void;
}

declare class Window_EquipSlot extends Window_Selectable
{
    _actor: Game_Actor;
    _itemWindow: Window_EquipItem;
    _statusWindow: Window_EquipStatus;

    constructor(x?: number, y?: number, width?: number, height?: number);
    initialize(): void;
    initialize(x?: number, y?: number, width?: number, height?: number): void;
    setActor(actor: Game_Actor): void;
    update(): void;
    maxItems(): number;
    item(): IDataAllItem;
    drawItem(index: number): void;
    slotName(index: number): string;
    isEnabled(index: number): boolean;
    isCurrentItemEnabled(): boolean;
    setStatusWindow(statusWindow: Window_EquipStatus): void;
    setItemWindow(itemWindow: Window_EquipItem): void;
    updateHelp(): void;
}

declare class Window_EquipItem extends Window_ItemList
{
    _actor: Game_Actor;
    _slotId: number;
    _statusWindow: Window_EquipStatus;

    constructor(x?: number, y?: number, width?: number, height?: number);
    initialize(): void;
    initialize(x?: number, y?: number, width?: number, height?: number): void;
    setActor(actor: Game_Actor): void;
    setSlotId(slotId: number): void;
    includes(item: IDataAllItem): boolean;
    isEnabled(item: IDataAllItem): boolean;
    selectLast(): void;
    setStatusWindow(statusWindow: Window_EquipStatus): void;
    updateHelp(): void;
    playOkSound(): void;
}

declare class Window_Status extends Window_Selectable
{
    _actor: Game_Actor;

    constructor();
    initialize(): void;
    setActor(actor: Game_Actor): void;
    refresh(): void;
    drawBlock1(y: number): void;
    drawBlock2(y: number): void;
    drawBlock3(y: number): void;
    drawBlock4(y: number): void;
    drawHorzLine(y: number): void;
    lineColor(): string;
    drawBasicInfo(x: number, y: number): void;
    drawParameters(x: number, y: number): void;
    drawExpInfo(x: number, y: number): void;
    drawEquipments(x: number, y: number): void;
    drawProfile(x: number, y: number): void;
    maxEquipmentLines(): number;
}

declare class Window_Options extends Window_Command
{
    constructor();
    initialize(): void;
    windowWidth(): number;
    windowHeight(): number;
    updatePlacement(): void;
    makeCommandList(): void;
    addGeneralOptions(): void;
    addVolumeOptions(): void;
    drawItem(index: number): void;
    statusWidth(): number;
    statusText(index: number): string;
    isVolumeSymbol(symbol: string): boolean;
    booleanStatusText(value: number): string;
    volumeStatusText(value: number): string;
    processOk(): void;
    cursorRight(wrap: boolean): void;
    cursorLeft(wrap: boolean): void;
    volumeOffset(): number;
    changeValue(symbol: string, value: number): void;
    getConfigValue(symbol: string): number | boolean;
    setConfigValue(symbol: string, volume: number | boolean): void;
}

declare class Window_SavefileList extends Window_Selectable
{
    _mode: string;

    constructor(x?: number, y?: number, width?: number, height?: number);
    initialize(): void;
    initialize(x?: number, y?: number, width?: number, height?: number): void;
    setMode(mode: string): void;
    maxItems(): number;
    maxVisibleItems(): number;
    itemHeight(): number;
    drawItem(index: number): void;
    drawFileId(id: number, x: number, y: number): void;
    drawContents(info: ISavefileInfo, rect: Rectangle, valid: boolean): void;
    drawGameTitle(info: ISavefileInfo, x: number, y: number, width: number): void;
    drawPartyCharacters(info: ISavefileInfo, x: number, y: number): void;
    drawPlaytime(info: ISavefileInfo, x: number, y: number, width: number): void;
    playOkSound(): void;
}

declare class Window_ShopCommand extends Window_HorzCommand
{
    _windowWidth: number;
    _purchaseOnly: boolean;

    constructor(width?: number, purchaseOnly?: boolean);
    initialize(): void;
    initialize(width?: number, purchaseOnly?: boolean): void;
    windowWidth(): number;
    maxCols(): number;
    makeCommandList(): void;
}

declare class Window_ShopBuy extends Window_Selectable
{
    _shopGoods: any[][];
    _money: number;
    _data: IDataAllItem[];
    _price: number[];
    _statusWindow: Window_EquipStatus;

    constructor(x?: number, y?: number, height?: number, shopGoods?: any[][]);
    initialize(): void;
    initialize(x?: number, y?: number, height?: number, shopGoods?: any[][]): void;
    windowWidth(): number;
    maxItems(): number;
    item(): IDataAllItem;
    setMoney(money: number): void;
    isCurrentItemEnabled(): boolean;
    price(item: IDataAllItem): number;
    isEnabled(item: IDataAllItem): boolean;
    refresh(): void;
    makeItemList(): void;
    drawItem(index: number): void;
    setStatusWindow(statusWindow: Window_EquipStatus): void;
    updateHelp(): void;
}

declare class Window_ShopSell extends Window_ItemList
{
    constructor(x?: number, y?: number, width?: number, height?: number);
    initialize(): void;
    initialize(x?: number, y?: number, width?: number, height?: number): void;
    isEnabled(item: IDataAllItem): boolean;
}

declare class Window_ShopNumber extends Window_Selectable
{
    _item: IDataAllItem;
    _max: number;
    _price: number;
    _number: number;
    _currencyUnit: string;
    _buttons: Sprite_Button[];

    constructor(x?: number, y?: number, height?: number);
    initialize(): void;
    initialize(x?: number, y?: number, height?: number): void;
    windowWidth(): number;
    number(): number;
    setup(item: IDataAllItem, max: number, price: number): void;
    setCurrencyUnit(currencyUnit: string): void;
    createButtons(): void;
    placeButtons(): void;
    updateButtonsVisiblity(): void;
    showButtons(): void;
    hideButtons(): void;
    refresh(): void;
    drawMultiplicationSign(): void;
    drawNumber(): void;
    drawTotalPrice(): void;
    itemY(): number;
    priceY(): number;
    buttonY(): number;
    cursorWidth(): number;
    cursorX(): number;
    maxDigits(): number;
    update(): void;
    isOkTriggered(): boolean;
    playOkSound(): void;
    processNumberChange(): void;
    changeNumber(amount: number): void;
    updateCursor(): void;
    onButtonUp(): void;
    onButtonUp2(): void;
    onButtonDown(): void;
    onButtonDown2(): void;
    onButtonOk(): void;
}

declare class Window_ShopStatus extends Window_Base
{
    _item: IDataAllItem;
    _pageIndex: number;

    constructor(x?: number, y?: number, width?: number, height?: number);
    initialize(): void;
    initialize(x?: number, y?: number, width?: number, height?: number): void;
    refresh(): void;
    setItem(item: IDataAllItem): void;
    isEquipItem(): boolean;
    drawPossession(x: number, y: number): void;
    drawEquipInfo(x: number, y: number): void;
    statusMembers(): Game_Actor[];
    pageSize(): number;
    maxPages(): number;
    drawActorEquipInfo(x: number, y: number, actor: Game_Actor): void;
    drawActorParamChange(x: number, y: number, actor: Game_Actor, item1: IDataAllItem): void;
    currentEquippedItem(actor: Game_Actor, etypeId: number): IDataAllItem;
    update(): void;
    updatePage(): void;
    isPageChangeEnabled(): boolean;
    isPageChangeRequested(): boolean;
    isTouchedInsideFrame(): boolean;
    changePage(): void;
}

declare class Window_NameEdit extends Window_Base
{
    _actor: Game_Actor;
    _name: string;
    _index: number;
    _maxLength: number;
    _defaultName: string;

    constructor(actor?: Game_Actor, maxLength?: number);
    initialize(): void;
    initialize(actor?: Game_Actor, maxLength?: number): void;
    windowWidth(): number;
    windowHeight(): number;
    restoreDefault(): boolean;
    add(ch: string): boolean;
    back(): boolean;
    faceWidth(): number;
    charWidth(): number;
    left(): number;
    itemRect(index: number): { x: number, y: number, width: number, height: number };
    underlineRect(index: number): { x: number, y: number, width: number, height: number };
    underlineColor(): void;
    drawUnderline(index: number): void;
    drawChar(index: number): void;
    refresh(): void;
}

declare class Window_NameInput extends Window_Selectable
{
    static LATIN1: string[];
    static LATIN2: string[];
    static RUSSIA: string[];
    static JAPAN1: string[];
    static JAPAN2: string[];
    static JAPAN3: string[];

    _editWindow: Window_NameEdit;
    _page: number;
    _index: number;

    constructor(editWindow?: Window_NameEdit);
    initialize(): void;
    initialize(editWindow?: Window_NameEdit): void;
    windowHeight(): number;
    table(): string[][];
    maxCols(): number;
    maxItems(): number;
    character(): string;
    isPageChange(): boolean;
    isOk(): boolean;
    itemRect(index: number): Rectangle;
    itemRect(index: number): { x: number, y: number, width: number, height: number };
    refresh(): void;
    updateCursor(): void;
    isCursorMovable(): boolean;
    cursorDown(wrap: boolean): void;
    cursorUp(wrap: boolean): void;
    cursorRight(wrap: boolean): void;
    cursorLeft(wrap: boolean): void;
    cursorPagedown(): void;
    cursorPageup(): void;
    processCursorMove(): void;
    processHandling(): void;
    isCancelEnabled(): boolean;
    processCancel(): void;
    processJump(): void;
    processBack(): void;
    processOk(): void;
    onNameAdd(): void;
    onNameOk(): void;
}

declare class Window_ChoiceList extends Window_Command
{
    _messageWindow: Window_Message;
    _background: number;

    constructor(messageWindow?: Window_Message);
    initialize(): void;
    initialize(messageWindow?: Window_Message): void;
    start(): void;
    selectDefault(): void;
    updatePlacement(): void;
    updateBackground(): void;
    windowWidth(): number;
    numVisibleRows(): number;
    maxChoiceWidth(): number;
    textWidthEx(text: string): number;
    contentsHeight(): number;
    makeCommandList(): void;
    drawItem(index: number): void;
    isCancelEnabled(): boolean;
    isOkTriggered(): boolean;
    callOkHandler(): void;
    callCancelHandler(): void;
}

declare class Window_NumberInput extends Window_Selectable
{
    _messageWindow: Window_Message;
    _number: number;
    _maxDigits: number;
    _buttons: Sprite_Button[];

    constructor(messageWindow?: Window_Message);
    initialize(): void;
    initialize(messageWindow?: Window_Message): void;
    start(): void;
    updatePlacement(): void;
    windowWidth(): number;
    windowHeight(): number;
    maxCols(): number;
    maxItems(): number;
    spacing(): number;
    itemWidth(): number;
    createButtons(): void;
    placeButtons(): void;
    updateButtonsVisiblity(): void;
    showButtons(): void;
    hideButtons(): void;
    buttonY(): number;
    update(): void;
    processDigitChange(): void;
    changeDigit(up: boolean): void;
    isTouchOkEnabled(): boolean;
    isOkEnabled(): boolean;
    isCancelEnabled(): boolean;
    isOkTriggered(): boolean;
    processOk(): void;
    drawItem(index: number): void;
    onButtonUp(): void;
    onButtonDown(): void;
    onButtonOk(): void;
}

declare class Window_EventItem extends Window_ItemList
{
    _messageWindow: Window_Message;

    constructor(messageWindow?: Window_Message);
    initialize(): void;
    initialize(messageWindow?: Window_Message): void;
    windowHeight(): number;
    numVisibleRows(): number;
    start(): void;
    updatePlacement(): void;
    includes(item: IDataAllItem): boolean;
    isEnabled(item: IDataAllItem): boolean;
    onOk(): void;
    onCancel(): void;
}

declare class Window_Message extends Window_Base
{
    _background: number;
    _positionType: number;
    _waitCount: number;
    _faceBitmap: Bitmap;
    _textState: ITextState;
    _goldWindow: Window_Gold;
    _choiceWindow: Window_ChoiceList;
    _numberWindow: Window_NumberInput;
    _itemWindow: Window_EventItem;
    _showFast: boolean;
    _lineShowFast: boolean;
    _pauseSkip: boolean;

    constructor();
    initialize(): void;
    initMembers(): void;
    subWindows(): Window_Base[];
    createSubWindows(): void;
    windowWidth(): number;
    windowHeight(): number;
    clearFlags(): void;
    numVisibleRows(): number;
    update(): void;
    checkToNotClose(): void;
    canStart(): boolean;
    startMessage(): void;
    updatePlacement(): void;
    updateBackground(): void;
    terminateMessage(): void;
    updateWait(): void;
    updateLoading(): void;
    updateInput(): void;
    isAnySubWindowActive(): boolean;
    updateMessage(): boolean;
    onEndOfText(): void;
    startInput(): boolean;
    isTriggered(): boolean;
    doesContinue(): boolean;
    areSettingsChanged(): boolean;
    updateShowFast(): void;
    newPage(textState: ITextState): void;
    loadMessageFace(): void;
    drawMessageFace(): void;
    newLineX(): number;
    processNewLine(textState: ITextState): void;
    processNewPage(textState: ITextState): void;
    isEndOfText(textState: ITextState): boolean;
    needsNewPage(textState: ITextState): boolean;
    processEscapeCharacter(code: string, textState: ITextState): void;
    startWait(count: number): void;
    startPause(): void;
}

declare class Window_ScrollText extends Window_Base
{
    _text: string;
    _allTextHeight: number;

    constructor();
    initialize(): void;
    update(): void;
    startMessage(): void;
    refresh(): void;
    contentsHeight(): number;
    updateMessage(): void;
    scrollSpeed(): number;
    isFastForward(): boolean;
    fastForwardRate(): number;
    terminateMessage(): void;
}

declare class Window_MapName extends Window_Base
{
    _showCount: number;

    constructor();
    initialize(): void;
    windowWidth(): number;
    windowHeight(): number;
    update(): void;
    updateFadeIn(): void;
    updateFadeOut(): void;
    open(): void;
    close(): void;
    refresh(): void;
    drawBackground(x: number, y: number, width: number, height: number): void;
}

declare class Window_BattleLog extends Window_Selectable
{
    _lines: string[];
    _methods: { name: string, params: any[] }[];
    _waitCount: number;
    _waitMode: string;
    _baseLineStack: number[];
    _spriteset: Spriteset_Battle;
    _backBitmap: Bitmap;
    _backSprite: Sprite;

    constructor();
    initialize(): void;
    setSpriteset(spriteset: Spriteset_Battle): void;
    windowWidth(): number;
    windowHeight(): number;
    maxLines(): number;
    createBackBitmap(): void;
    createBackSprite(): void;
    numLines(): number;
    messageSpeed(): number;
    isBusy(): boolean;
    update(): void;
    updateWait(): number;
    updateWaitCount(): number;
    updateWaitMode(): number;
    setWaitMode(waitMode: string): void;
    callNextMethod(): void;
    isFastForward(): boolean;
    push(methodName: string, ...args: any[]): void;
    clear(): void;
    wait(): void;
    waitForEffect(): void;
    waitForMovement(): void;
    addText(text: string): void;
    pushBaseLine(): void;
    popBaseLine(): void;
    waitForNewLine(): void;
    popupDamage(target: Game_Battler): void;
    performActionStart(subject: Game_Battler, action: Game_Action): void;
    performAction(subject: Game_Battler, action: Game_Action): void;
    performActionEnd(subject: Game_Battler): void;
    performDamage(target: Game_Battler): void;
    performMiss(target: Game_Battler): void;
    performRecovery(target: Game_Battler): void;
    performEvasion(target: Game_Battler): void;
    performMagicEvasion(target: Game_Battler): void;
    performCounter(target: Game_Battler): void;
    performReflection(target: Game_Battler): void;
    performSubstitute(substitute: Game_Battler, target: Game_Battler): void;
    performCollapse(target: Game_Battler): void;
    showAnimation(subject: Game_Battler, targets: Game_Battler[], animationId: number): void;
    showAttackAnimation(subject: Game_Battler, targets: Game_Battler[]): void;
    showActorAttackAnimation(subject: Game_Battler, targets: Game_Battler[]): void;
    showEnemyAttackAnimation(subject: Game_Battler, targets: Game_Battler[]): void;
    showNormalAnimation(targets: Game_Battler[], animationId: number, mirror: boolean): void;
    animationBaseDelay(): number;
    animationNextDelay(): number;
    refresh(): void;
    drawBackground(): void;
    backRect(): {x: number, y: number, width: number, height: number };
    backColor(): string;
    backPaintOpacity(): number;
    drawLineText(index: number): void;
    startTurn(): void;
    startAction(subject: Game_Battler, action: Game_Action, targets: Game_Battler[]): void;
    endAction(subject: Game_Battler): void;
    displayCurrentState(subject: Game_Battler): void;
    displayRegeneration(subject: Game_Battler): void;
    displayAction(subject: Game_Battler, item: IDataItem): void;
    displayCounter(target: Game_Battler): void;
    displayReflection(target: Game_Battler): void;
    displaySubstitute(substitute: Game_Battler, target: Game_Battler): void;
    displayActionResults(substitute: Game_Battler, target: Game_Battler): void;
    displayFailure(target: Game_Battler): void;
    displayCritical(target: Game_Battler): void;
    displayDamage(target: Game_Battler): void;
    displayMiss(target: Game_Battler): void;
    displayEvasion(target: Game_Battler): void;
    displayHpDamage(target: Game_Battler): void;
    displayMpDamage(target: Game_Battler): void;
    displayTpDamage(target: Game_Battler): void;
    displayAffectedStatus(target: Game_Battler): void;
    displayAutoAffectedStatus(target: Game_Battler): void;
    displayChangedStates(target: Game_Battler): void;
    displayAddedStates(target: Game_Battler): void;
    displayRemovedStates(target: Game_Battler): void;
    displayChangedBuffs(target: Game_Battler): void;
    displayBuffs(target: Game_Battler, buffs: number[], fmt: string): void;
    makeHpDamageText(target: Game_Battler): void;
    makeMpDamageText(target: Game_Battler): void;
    makeTpDamageText(target: Game_Battler): void;
}

declare class Window_PartyCommand extends Window_Command
{
    constructor();
    initialize(): void;
    windowWidth(): number;
    numVisibleRows(): number;
    makeCommandList(): void;
    setup(): void;
}

declare class Window_ActorCommand extends Window_Command
{
    _actor: Game_Actor;

    constructor();
    initialize(): void;
    windowWidth(): number;
    numVisibleRows(): number;
    makeCommandList(): void;
    addAttackCommand(): void;
    addSkillCommands(): void;
    addGuardCommand(): void;
    addItemCommand(): void;
    setup(actor: Game_Actor): void;
    processOk(): void;
    selectLast(): void;
}

declare class Window_BattleStatus extends Window_Selectable
{
    constructor();
    initialize(): void;
    windowWidth(): number;
    windowHeight(): number;
    numVisibleRows(): number;
    maxItems(): number;
    refresh(): void;
    drawItem(index: number): void;
    basicAreaRect(index: number): void;
    gaugeAreaRect(index: number): void;
    gaugeAreaWidth(): number;
    drawBasicArea(rect: { x: number, y: number, width: number, height: number }, actor: Game_Actor): void;
    drawGaugeArea(rect: { x: number, y: number, width: number, height: number }, actor: Game_Actor): void;
    drawGaugeAreaWithTp(rect: { x: number, y: number, width: number, height: number }, actor: Game_Actor): void;
    drawGaugeAreaWithoutTp(rect: { x: number, y: number, width: number, height: number }, actor: Game_Actor): void;
}

declare class Window_BattleActor extends Window_BattleStatus
{
    constructor(x?: number, y?: number);
    initialize(): void;
    initialize(x?: number, y?: number): void;
    show(): void;
    hide(): void;
    select(index: number): void;
    actor(): Game_Actor;
}

declare class Window_BattleEnemy extends Window_Selectable
{
    _enemies: Game_Enemy[];

    constructor(x?: number, y?: number);
    initialize(): void;
    initialize(x?: number, y?: number): void;
    windowWidth(): number;
    windowHeight(): number;
    numVisibleRows(): number;
    maxCols(): number;
    maxItems(): number;
    enemy(): Game_Enemy;
    enemyIndex(): number;
    drawItem(index: number): void;
    show(): void;
    hide(): void;
    refresh(): void;
    select(index: number): void;
}

declare class Window_BattleSkill extends Window_SkillList
{
    constructor(x?: number, y?: number, width?: number, height?: number);
    initialize(): void;
    initialize(x?: number, y?: number, width?: number, height?: number): void;
    show(): void;
    hide(): void;
}

declare class Window_BattleItem extends Window_ItemList
{
    constructor(x?: number, y?: number, width?: number, height?: number);
    initialize(): void;
    initialize(x?: number, y?: number, width?: number, height?: number): void;
    includes(item: IDataAllItem): boolean;
    show(): void;
    hide(): void;
}

declare class Window_TitleCommand extends Window_Command
{
    static _lastCommandSymbol: string;
    static initCommandPosition(): void;

    constructor();
    initialize(): void;
    windowWidth(): number;
    updatePlacement(): void;
    makeCommandList(): void;
    isContinueEnabled(): boolean;
    processOk(): void;
    selectLast(): void;
}

declare class Window_GameEnd extends Window_Command
{
    constructor();
    initialize(): void;
    windowWidth(): number;
    updatePlacement(): void;
    makeCommandList(): void;
}

declare class Window_DebugRange extends Window_Selectable
{
    _maxSwitches: number;
    _maxVariables: number;
    _editWindow: Window_DebugEdit;

    constructor(x?: number, y?: number);
    initialize(): void;
    initialize(x?: number, y?: number): void;
    windowWidth(): number;
    windowHeight(): number;
    maxItems(): number;
    update(): void;
    mode(): string;
    topId(): number;
    refresh(): void;
    drawItem(index: number): void;
    isCancelTriggered(): boolean;
    processCancel(): void;
    setEditWindow(editWindow: Window_DebugEdit): void;
}

declare class Window_DebugEdit extends Window_Selectable
{
    _mode: string;
    _topId: number;

    constructor(x?: number, y?: number, width?: number);
    initialize(): void;
    initialize(x?: number, y?: number, width?: number): void;
    maxItems(): number;
    refresh(): void;
    drawItem(index: number): void;
    itemName(dataId: number): string;
    itemStatus(dataId: number): void;
    setMode(mode: string): void;
    setTopId(id: number): void;
    currentId(): number;
    update(): void;
    updateSwitch(): void;
    updateVariable(): void;
}