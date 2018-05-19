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
