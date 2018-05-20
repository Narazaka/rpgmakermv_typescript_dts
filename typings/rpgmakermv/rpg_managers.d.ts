/** アクターのデータ */
declare var $dataActors      : IDataActor[];
/** 職業のデータ */
declare var $dataClasses     : IDataClass[];
/** スキルのデータ */
declare var $dataSkills      : IDataSkill[];
/** アイテムのデータ */
declare var $dataItems       : IDataItem[];
/** 武器のデータ */
declare var $dataWeapons     : IDataWeapon[];
/** 防具のデータ */
declare var $dataArmors      : IDataArmor[];
/** 敵のデータ */
declare var $dataEnemies     : IDataEnemy[];
/** 敵グループのデータ */
declare var $dataTroops      : IDataTroop[];
/** ステートのデータ */
declare var $dataStates      : IDataState[];
/** アニメーションのデータ */
declare var $dataAnimations  : IDataAnimation[];
/** タイルセットのデータ */
declare var $dataTilesets    : IDataTileset[];
/** コモンイベントのデータ */
declare var $dataCommonEvents: IDataCommonEvent[];
/** システムのデータ */
declare var $dataSystem      : IDataSystem;
/** マップ情報のデータ */
declare var $dataMapInfos    : IDataMapInfo[];
/** マップのデータ */
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

/** データマネージャー */
declare class DataManager
{
    private constructor();

    static _globalId       : "RPGMV";
    static _lastAccessedId : number;
    static _errorUrl       : string;

    static _databaseFiles: {name: string, src: string}[];
    /**
     * データベースを読む
     *
     * バトルテストとイベントテストの場合はActors.jsonなどではなくTest_Actors.jsonなどをよむ
     */
    static loadDatabase(): void;
    /**
     * データファイルを読む
     * @param name 格納する変数名
     * @param src ファイルのURL部分 `data/${src}`が使われる
     */
    static loadDataFile(name: string, src: string): void;
    static isDatabaseLoaded(): boolean;
    /**
     * マップデータを読む
     *
     * `Map${mapId}.json`
     * @param mapId マップID 3桁にゼロパディングされて使われる
     */
    static loadMapData(mapId: number) : void;
    /**
     * $dataMapに空のデータをセットする
     */
    static makeEmptyMap(): void;
    static isMapLoaded(): boolean;
    static onLoad(object: IDataActor[] | IDataClass[] | IDataSkill[] | IDataItem[] | IDataWeapon[] | IDataArmor[] | IDataEnemy[] | IDataTroop[] | IDataState[] | IDataAnimation[] | IDataTileset[] | IDataCommonEvent[] | IDataSystem[] | IDataMapInfo[] | IDataMap[]): void;
    /**
     * メタ情報を展開し、metaプロパティに入れる
     *
     * `<foo>`は`{foo: true}`, `<foo:bar>`は`{foo: "bar"}`と展開される
     * @param data データ
     */
    static extractMetadata(data: IDataActor[] | IDataClass[] | IDataSkill[] | IDataItem[] | IDataWeapon[] | IDataArmor[] | IDataEnemy[] | IDataTroop[] | IDataState[] | IDataAnimation[] | IDataTileset[] | IDataCommonEvent[] | IDataSystem[] | IDataMapInfo[] | IDataMap[]): void;
    /**
     * _errorUrlがあれば例外を投げる
     */
    static checkError(): void;
    /**
     * バトルテストか？
     *
     * クエリに"btest"が存在するか
     */
    static isBattleTest(): boolean;
    /**
     * イベントテストか？
     *
     * クエリに"etest"が存在するか
     */
    static isEventTest(): boolean;
    static isSkill(item: IDataSkill): boolean;
    static isItem(item: IDataItem): boolean;
    static isWeapon(item: IDataWeapon): boolean;
    static isArmor(item: IDataArmor): boolean;
    /**
     * ゲームオブジェクト(`$game*`)を初期化する
     */
    static createGameObjects(): void;
    /**
     * 新規ゲーム用にデータを初期化する
     *
     * 1. ゲームオブジェクト初期化 `this.createGameObjects()`
     * 2. 新規ゲーム用の空きセーブデータ番号を取得 `this.selectSavefileForNewGame()`
     * 3. 開始パーティーメンバーを設定 `$gameParty.setupStartingMembers()`
     * 4. 初期位置への移動を予約 `$gamePlayer.reserveTransfer(...)`
     * 5. フレームカウントを初期化 `Graphics.frameCount = 0`
     */
    static setupNewGame(): void;
    /**
     * バトルテスト用にデータを初期化する
     *
     * 1. ゲームオブジェクト初期化 `this.createGameObjects()`
     * 2. バトルテスト用パーティーメンバーを設定 `$gameParty.setupBattleTest()`
     * 3. バトルマネージャーをバトルテスト用に設定
     */
    static setupBattleTest(): void;
    /**
     * イベントテスト用にデータを初期化する
     *
     * 1. ゲームオブジェクト初期化 `this.createGameObjects()`
     * 2. 新規ゲーム用の空きセーブデータ番号を取得 `this.selectSavefileForNewGame()`
     * 3. 開始パーティーメンバーを設定 `$gameParty.setupStartingMembers()`
     * 4. マップ-1の(8, 6)に移動予約 `$gamePlayer.reserveTransfer(-1, 8, 6)`
     * 5. 透明化を無効に `$gamePlayer.setTransparent(false)`
     */
    static setupEventTest(): void;
    /**
     * セーブファイル情報(`global.rpgsave`)をロード
     *
     * 存在しないセーブデータの情報は削除されてから返される
     */
    static loadGlobalInfo(): ISavefileInfo[];
    /**
     * セーブファイル情報(`global.rpgsave`)をセーブ
     * @param info セーブファイル情報
     */
    static saveGlobalInfo(info: ISavefileInfo[]): void;
    /**
     * このゲームのセーブデータか？
     * @param savefileId セーブファイルID
     */
    static isThisGameFile(savefileId: number): boolean;
    /**
     * セーブが存在するか？
     *
     * セーブファイル情報に存在し、かつこのゲームのセーブデータファイルが存在するか
     */
    static isAnySavefileExists(): boolean;
    /**
     * 最新のセーブファイルID
     *
     * タイムスタンプが一番新しいもの ない場合は1が返される
     */
    static latestSavefileId(): number;
    /**
     * 全てのセーブファイル画像をロードする
     */
    static loadAllSavefileImages(): void;
    /**
     * セーブファイル画像をロードする
     */
    static loadSavefileImages(info: ISavefileInfo): void;
    /**
     * セーブファイル数上限
     */
    static maxSavefiles(): number;
    /**
     * セーブする
     * @param savefileId セーブファイルID
     * @return 成功したか？
     */
    static saveGame(savefileId: number): boolean;
    /**
     * ロードする
     * @param savefileId セーブファイルID
     * @return 成功したか？
     */
    static loadGame(savefileId: number): boolean;
    /**
     * セーブファイル情報をロードする
     * @param savefileId セーブファイルID
     */
    static loadSavefileInfo(savefileId: number): ISavefileInfo;
    /**
     * 最後にアクセスされたセーブファイルID
     */
    static lastAccessedSavefileId(): number;
    /**
     * 例外処理なしのセーブ
     * @param savefileId セーブファイルID
     * @return 成功したか？
     */
    static saveGameWithoutRescue(savefileId: number): boolean;
    /**
     * 例外処理なしのロード
     * @param savefileId セーブファイルID
     * @return 成功したか？
     */
    static loadGameWithoutRescue(savefileId: number): boolean;
    /**
     * 新規ゲーム用の空きセーブデータ番号を`lastAccessedSavefileId`にセット
     */
    static selectSavefileForNewGame(): void;
    /**
     * セーブファイル情報を生成
     */
    static makeSavefileInfo(): ISavefileInfo;
    /**
     * セーブデータを生成
     */
    static makeSaveContents(): ISaveContents;
    /**
     * セーブデータを`$game*`に展開
     * @param contents セーブデータ
     */
    static extractSaveContents(contents: ISaveContents): void;
}

/** オプションデータ */
declare interface IConfig
{
    /** 常時ダッシュ */
    alwaysDash?: boolean;
    /** コマンド記憶 */
    commandRemember?: boolean;
    /** BGM 音量 */
    bgmVolume?: number;
    /** BGS 音量 */
    bgsVolume?: number;
    /** ME 音量 */
    meVolume?: number;
    /** SE 音量 */
    seVolume?: number;
}

/** オプションマネージャ */
declare class ConfigManager
{
    private constructor();

    /** 常時ダッシュ */
    static alwaysDash: boolean;
    /** コマンド記憶 */
    static commandRemember: boolean;

    /** BGM 音量 */
    static bgmVolume: number;
    /** BGS 音量 */
    static bgsVolume: number;
    /** ME 音量 */
    static meVolume: number;
    /** SE 音量 */
    static seVolume: number;
    /**
     * ロード (`config.rpgsave`)
     */
    static load(): void;
    /**
     * セーブ (`config.rpgsave`)
     */
    static save(): void;
    /**
     * データを作成
     */
    static makeData(): IConfig;
    /**
     * データを適用
     */
    static applyData(config: IConfig): void;
    /**
     * オプションデータからフラグを取得
     *
     * - キーがなければfalse
     * @param config オプション
     * @param name キー名
     */
    static readFlag(config: IConfig, name: string): boolean;
    /**
     * オプションデータから音量を取得
     *
     * - 0から100に丸められる
     * - キーがなければ100
     * @param config オプション
     * @param name キー名
     */
    static readVolume(config: IConfig, name: string): number;
}

declare class StorageManager
{
    private constructor();

    /**
     * セーブする
     * @param savefileId セーブファイルID
     * @param json JSON文字列
     */
    static save(savefileId: number, json: string): void;
    /**
     * ロードする
     * @param savefileId セーブファイルID
     * @return JSON文字列
     */
    static load(savefileId: number): string;
    /**
     * 存在確認
     * @param savefileId セーブファイルID
     */
    static exists(savefileId: number): boolean;
    /**
     * 削除
     *
     * （セーブ中に利用する）
     * @param savefileId セーブファイルID
     */
    static remove(savefileId: number): void;
    /**
     * バックアップ
     *
     * （セーブ中に利用する）
     * @param savefileId セーブファイルID
     */
    static backup(savefileId: number): void;
    /**
     * バックアップ存在確認
     *
     * （セーブ中に利用する）
     * @param savefileId セーブファイルID
     */
    static backupExists(savefileId: number): void;
    /**
     * バックアップを削除する
     *
     * （セーブ中に利用する）
     * @param savefileId セーブファイルID
     */
    static cleanBackup(savefileId: number): void;
    /**
     * バックアップを戻す
     *
     * （セーブ中に利用する）
     * @param savefileId セーブファイルID
     */
    static restoreBackup(savefileId: number): void;
    /**
     * ローカルモードか？
     *
     * `Utils.isNwjs()`
     */
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
    /**
     * ローカルファイルのディレクトリパス
     */
    static localFileDirectoryPath(): string;
    /**
     * ローカルファイルパス
     *
     * - `savefileId < 0` なら `config.rpgsave`
     * - `savefileId === 0` なら `global.rpgsave`
     * - `savefileId > 0` なら `file${savefileId}.rpgsave`
     * @param savefileId セーブファイルID
     */
    static localFilePath(savefileId: number): string;
    /**
     * ウェブストレージキー
     *
     * - `savefileId < 0` なら `RPG Config`
     * - `savefileId === 0` なら `RPG Global`
     * - `savefileId > 0` なら `RPG File${savefileId}`
     * @param savefileId セーブファイルID
     */
    static webStorageKey(savefileId: number): string;
}

/**
 * 画像マネージャー(キャッシュやリクエストキュー付き)
 */
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
    /**
     * ObjectCharacterか
     *
     * ファイル名に`!`が存在するか
     * @param filename ファイル名
     */
    static isObjectCharacter(filename: string): boolean;
    /**
     * BigCharacterか
     *
     * ファイル名に`$`が存在するか
     * @param filename ファイル名
     */
    static isBigCharacter(filename: string): boolean;
    /**
     * ZeroParallaxか
     *
     * ファイル名の先頭が`!`であるか
     * @param filename ファイル名
     */
    static isZeroParallax(filename: string): boolean;
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

/** オーディオマネージャー */
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

    /** マスター音量を設定・取得 */
    static masterVolume: number;
    /** BGM 音量を設定・取得 */
    static bgmVolume: number;
    /** BGS 音量を設定・取得 */
    static bgsVolume: number;
    /** ME 音量を設定・取得 */
    static meVolume: number;
    /** SE 音量を設定・取得 */
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
    static audioFileExt(): "ogg" | "m4a";
    static shouldUseHtml5Audio(): boolean;
    static checkErrors(): void;
    static checkWebAudioError(webAudio: WebAudio): void;
}

/** システムSEマネージャー */
declare class SoundManager
{
    private constructor();

    /**
     * システムSE 0～3(カーソル・決定・キャンセル・ブザー)をロード
     */
    static preloadImportantSounds(): void;
    /**
     * システムSEをロード
     * @param n システムサウンド番号
     */
    static loadSystemSound(n: number): void;
    /**
     * システムSEを再生
     * @param n システムサウンド番号
     */
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

/** システムテキストマネージャー */
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

/** シーンマネージャー */
declare class SceneManager
{
    private constructor();

    static _getTimeInMsWithoutMobileSafari: number;
    /** 現在のシーン */
    static _scene: Scene_Base;
    /** 次のシーン */
    static _nextScene: Scene_Base;
    /** シーンスタック */
    static _stack: typeof Scene_Base[];
    /** 描画停止中 */
    static _stopped: boolean;
    /** シーンが開始したか */
    static _sceneStarted: boolean;
    /** 終了中 */
    static _exiting: boolean;
    /** 前のシーン */
    static _previousClass: typeof Scene_Base;
    /** ブラーのかけられた背景 */
    static _backgroundBitmap: Bitmap;
    /** 描画領域横幅 */
    static _screenWidth: number;
    /** 描画領域縦幅 */
    static _screenHeight: number;
    /** ボックス横幅(描画領域と同じ) */
    static _boxWidth: number;
    /** ボックス縦幅(描画領域と同じ) */
    static _boxHeight: number;
    static _deltaTime: number;
    static _currentTime: number;
    static _accumulator: number;

    /**
     * シーンマネージャーを実行
     *
     * 1. 初期化 initialize
     * 2. シーン移動 goto(sceneClass)
     * 3. 描画開始 requestUpdate
     * @param sceneClass シーンクラス
     */
    static run(sceneClass: typeof Scene_Base): void;
    /**
     * 初期化
     *
     * 1. initGraphics
     * 1. checkFileAccess
     * 1. initAudio
     * 1. initInput
     * 1. initNwjs
     * 1. checkPluginErrors
     * 1. setupErrorHandlers
     */
    static initialize(): void;
    /**
     * Graphicsを初期化
     *
     * 1. Graphicsの大きさを設定
     * 1. Graphicsのローディング画像を設定
     * 1. showfpsが有効ならfpsを表示する
     * 1. 強制WebGLが使えない場合エラー
     */
    static initGraphics(): void;
    /**
     * レンダリング方式
     *
     * - クエリにwebglまたはcanvasがあれば強制的に選択
     * - そうでなければ自動選択
     */
    static preferableRendererType(): "canvas" | "webgl" | "auto";
    /**
     * canvasを利用するべきか
     *
     * モバイルデバイスの場合true
     */
    static shouldUseCanvasRenderer(): boolean;
    /**
     * ブラウザのWebGL機能を調べる
     */
    static checkWebGL(): void;
    /**
     * ブラウザのファイルアクセス機能を調べる
     */
    static checkFileAccess(): void;
    /**
     * オーディオを初期化
     *
     * クエリにnoaudioがなく初期化不能ならエラー
     */
    static initAudio(): void;
    /**
     * Input・TouchInputを初期化
     */
    static initInput(): void;
    /**
     * NW.JSならそれを初期化
     */
    static initNwjs(): void;
    /**
     * PluginManagerのエラーがないか？
     */
    static checkPluginErrors(): void;
    /**
     * 以下のイベントハンドラを設定
     *
     * - windowのerrorハンドラ
     * - F5リロード
     * - F8デバッグ(クエリにtestがあるときのみ)
     */
    static setupErrorHandlers(): void;
    /**
     * 描画停止中でなければrequestAnimationFrame(this.update)
     */
    static requestUpdate(): void;
    /**
     * 1. tickStart
     * 1. updateInputData (MobileSafariのみ)
     * 1. updateManagers = `ImageManager.update()`
     * 1. updateMain
     * 1. tickEnd
     */
    static update(): void;
    /** ウインドウを閉じる */
    static terminate(): void;
    /** エラーハンドラ */
    static onError(e: ErrorEvent): void;
    /** キーハンドラ */
    static onKeyDown(event: KeyboardEvent): void;
    /**
     * 例外ハンドラ
     *
     * - 画面上にエラーを表示
     * - オーディオを停止
     * - 描画停止
     */
    static catchException(e: ErrorEvent): void;
    /** `Graphics.tickStart()` */
    static tickStart(): void;
    /** `Graphics.tickEnd()` */
    static tickEnd(): void;
    /** `Input.update()` `TouchInput.update()` */
    static updateInputData(): void;
    /**
     * 1. 何回か
     *   1. updateInputData (MobileSafari以外)
     *   1. changeScene
     *   1. updateScene
     * 1. renderScene
     * 1. requestUpdate
     */
    static updateMain(): void;
    /**
     * `ImageManager.update()`
     */
    static updateManagers(): void;
    /**
     * シーン変更をハンドルする
     *
     * - シーン変更中かつ現在のシーンがbusyでないなら
     *   1. 現在のシーン.terminate()
     *   1. 現在のシーンから次のシーンに非同期ロードのハンドルを付け替える
     *   1. 次のシーン.create()
     *   1. 次のシーン.onSceneCreate() = Graphics ローディング開始
     * - 終了中なら
     *   1. 上記の次のシーンが無い版
     *   1. this.terminate()
     */
    static changeScene(): void;
    /**
     * シーンをupdateする
     *
     * - シーンがreadyかつstartしていないなら
     *   1. シーン.start()
     *   1. onSceneStart = Graphics ローディング終了
     * - シーンがstartしているなら
     *   1. シーン.update()
     */
    static updateScene(): void;
    /**
     * シーンをレンダリングする
     *
     * - シーンがスタートしているなら
     *   - Graphics.render(scene)
     * - そうでなければ
     *   - onSceneLoading = Graphics ローディング継続
     */
    static renderScene(): void;
    /** シーン作成=ローディング開始 Graphics.startLoading() */
    static onSceneCreate(): void;
    /** シーン開始=ローディング終了 Graphics.endLoading() */
    static onSceneStart(): void;
    /** シーンローディング=ローディング継続 Graphics.updateLoading() */
    static onSceneLoading(): void;
    /**
     * シーン変更中
     *
     * 終了中か次のシーンが存在
     */
    static isSceneChanging(): boolean;
    /** 現在のシーンがbusy */
    static isCurrentSceneBusy(): boolean;
    /** 現在のシーンが開始済み */
    static isCurrentSceneStarted(): boolean;
    /** 次のシーンか */
    static isNextScene(sceneClass: typeof Scene_Base): boolean;
    /** 前のシーンか */
    static isPreviousScene(sceneClass: typeof Scene_Base): boolean;

    /**
     * シーンを移動する
     *
     * 次のシーンを設定し、現在のシーンがあれば停止する
     * @param sceneClass シーンクラス
     */
    static goto(sceneClass: typeof Scene_Base): void;
    /**
     * シーンを移動する（スタックに乗せる）
     * @param sceneClass シーンクラス
     */
    static push(sceneClass: typeof Scene_Base): void;
    /**
     * シーンを移動する（スタックから下ろす）
     */
    static pop(): void;
    /** 終了する */
    static exit(): void;
    /** スタックをクリアする */
    static clearStack(): void;
    /** 描画停止する */
    static stop(): void;
    /** 次のシーンのprepareを呼ぶ */
    static prepareNextScene(): void;
    /** シーンのスナップショットを返す */
    static snap(): Bitmap;
    /** 背景のスナップショットをとりブラーをかける */
    static snapForBackground(): void;
    /** ブラーのかけられた背景 */
    static backgroundBitmap(): Bitmap;
    /** 描画再開する */
    static resume(): void;
}

/** バトル報酬 */
declare interface IDataRewards
{
    /** ゴールド */
    gold: number;
    /** 経験値 */
    exp: number;
    /** アイテム */
    items: IDataAllItem[];
}

/** バトルマネージャー */
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

/** プラグイン指定 */
declare interface IDataPlugin
{
    /** 名前 */
    name: string;
    /** 状態(ON/OFF) */
    status: boolean;
    /** 説明 */
    description: string;
    /** プラグインパラメーター */
    parameters: PluginParameters;
}

/** プラグインパラメーター */
declare type PluginParameters = { [key: string]: string; };

/** プラグインマネージャー */
declare class PluginManager
{
    private constructor();

    static _path: string;
    static _scripts: string[];
    static _errorUrls: string[];
    static _parameters: PluginParameters;

    /** プラグインを読み込む */
    static setup(plugins: IDataPlugin[]): void;
    /** 読み込みエラーがあれば例外 */
    static checkErrors(): void;
    /**
     * プラグインパラメーター
     * @param name プラグイン名
     */
    static parameters(name: string): PluginParameters;
    /**
     * プラグインパラメーターを設定
     * @param name プラグイン名
     * @param parameters プラグインパラメーター
     */
    static setParameters(name: string, parameters: PluginParameters): void;
    /**
     * プラグインスクリプトをファイルからロードする
     * @param name プラグイン名
     */
    static loadScript(name: string): void;
    /**
     * ロード時のエラーで呼ばれる内部関数
     */
    static onError(e: ErrorEvent): void;
}
