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
