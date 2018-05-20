declare interface IDataSound
{
    name: string;
    pan: number;
    pitch: number;
    volume: number;
}

declare interface IDataTrait
{
    code: number;
    dataId: number;
    value: number;
}

/** 使用効果 */
declare interface IDataEffect
{
    code: number;
    dataId: number;
    value1: number;
    value2: number;
}

declare interface IDataAction
{
    conditionParam1: number;
    conditionParam2: number;
    conditionType: number;
    rating: number;
    skillId: number;
}

declare interface IDataList
{
    code: number;
    indent: number;
    parameters: number[];
}

declare interface IDataMapEventPageList extends IDataList
{
    parameters: any[];
}

declare interface IDataMoveRouteCommand
{
    code: number;
    parameters: number[];
}

declare interface IDataMoveRoute
{
    list: IDataMoveRouteCommand[];
    repeat: boolean;
    skippable: boolean;
    wait: boolean;
}

/** アクター */
declare interface IDataActor
{
    id: number;
    battlerName: string;
    characterIndex: number;
    characterName: string;
    classId: number;
    equips: number[];
    faceIndex: number;
    faceName: string;
    traits: IDataTrait[];
    initialLevel: number;
    maxLevel: number;
    name: string;
    nickname: string;
    note: string;
    profile: string;
    meta: IDataMeta;
}

/** 職業 */
declare interface IDataClass
{
    id: number;
    expParams: number[];
    traits: IDataTrait[];
    learnings: {
        level: number;
        note: string;
        skillId: number;
    }[];
    name: string;
    note: string;
    params: number[][];
    meta: IDataMeta;
}

/** スキル */
declare interface IDataSkill
{
    /** ID */
    id: number;
    /** アニメーション */
    animationId: number;
    /** ダメージ */
    damage: {
        /** 会心 */
        critical: boolean;
        /** 属性 */
        elementId: number;
        /** 計算式 */
        formula: string;
        /** タイプ */
        type: number;
        /** 分散度 */
        variance: number;
    }
    /** 説明 */
    description: string;
    /** 使用効果 */
    effects: IDataEffect[];
    /** 命中タイプ */
    hitType: number;
    /** アイコン */
    iconIndex: number;
    /** メッセージ (使用者の名前)～ */
    message1: string;
    /** メッセージ */
    message2: string;
    /** 消費MP */
    mpCost: number;
    /** 名前 */
    name: string;
    /** メモ */
    note: string;
    /** 使用可能時 */
    occasion: number;
    /** 連続回数 */
    repeats: number;
    /** 武器タイプ1 */
    requiredWtypeId1: number;
    /** 武器タイプ2 */
    requiredWtypeId2: number;
    /** 範囲 */
    scope: number;
    /** 速度補正 */
    speed: number;
    /** スキルタイプ */
    stypeId: number;
    /** 成功率 */
    successRate: number;
    /** 消費TP */
    tpCost: number;
    /** 得TP */
    tpGain: number;
    /** メタ情報 */
    meta: IDataMeta;
}

/** 全アイテム共通 */
declare interface IDataAllItem
{
    id: number;
    description: string;
    name: string;
    note: string;
    iconIndex: number;
    price: number;
    meta: IDataMeta;
}

/** アイテム */
declare interface IDataItem extends IDataAllItem
{
    animationId: number;
    consumable: boolean;
    damage: {
        critical: boolean;
        elementId: number;
        formula: string;
        type: number;
        variance: number;
    }
    effects: IDataEffect[];
    hitType: number;
    itypeId: number;
    occasion: number;
    repeats: number;
    scope: number;
    speed: number;
    successRate: number;
    tpGain: number;
}

/** 装備アイテム */
declare interface IDataEquipItem extends IDataAllItem
{
    etypeId: number;
    traits: IDataTrait[];
    params: number[];
}

/** 武器 */
declare interface IDataWeapon extends IDataEquipItem
{
    animationId: number;
    wtypeId: number;
}

/** 防具 */
declare interface IDataArmor extends IDataEquipItem
{
    atypeId: number;
}

/** ドロップアイテム */
declare interface IDataDropItem
{
    kind: number;
    dataId: number;
    denominator: number;
}

/** 敵 */
declare interface IDataEnemy
{
    id: number;
    actions: IDataAction[];
    battlerHue: number;
    battlerName: string;
    dropItems: IDataDropItem[];
    exp: number;
    traits: IDataTrait[];
    gold: number;
    name: string;
    note: string;
    params: number[];
    meta: IDataMeta;
}

declare interface IDataPage
{
    conditions: {
        actorHP: number;
        actorId: number;
        actorValid: boolean;
        enemyHp: number;
        enemyIndex: number;
        enemyValid: boolean;
        switchId: number;
        switchValid: boolean;
        turnA: number;
        turnB: number;
        turnEnding: boolean;
        turnValid: boolean;
    };
    list: IDataList[];
    span: number;
}

/** 敵グループ */
declare interface IDataTroop
{
    id: number;
    members: {
        enemyId: number;
        x: number;
        y: number;
        hidden: boolean;
    }[];
    name: string;
    pages: IDataPage[];
}

/** ステート */
declare interface IDataState
{
    id: number;
    autoRemovalTiming: number;
    chanceByDamage: number;
    iconIndex: number;
    maxTurns: number;
    message1: string;
    message2: string;
    message3: string;
    message4: string;
    minTurns: number;
    motion: number;
    name: string;
    note: string;
    overlay: number;
    priority: number;
    releaseByDamage: boolean;
    removeAtBattleEnd: boolean;
    removeByDamage: boolean;
    removeByRestriction: boolean;
    removeByWalking: boolean;
    restriction: number;
    stepsToRemove: number;
    traits: IDataTrait[];
    meta: IDataMeta;
}

declare interface IDataAnimationTiming
{
    flashColor: number[];
    flashDuration: number;
    flashScope: number;
    frame: number;
    se: IDataSound;
}

/** アニメーション */
declare interface IDataAnimation
{
    id: number;
    animation1Hue: number;
    animation1Name: string;
    animation2Hue: number;
    animation2Name: string;
    frames: number[][][];
    name: string;
    position: number;
    timings: IDataAnimationTiming[];
}

/** タイルセット */
declare interface IDataTileset
{
    id: number;
    flags: number[];
    mode: number;
    name: string;
    note: string;
    tilesetNames: string[];
    meta: IDataMeta;
}

/** コモンイベント */
declare interface IDataCommonEvent
{
    id: number;
    list: IDataList[];
    name: string;
    switchId: number;
    trigger: number;
}

declare interface IVehicle
{
    bgm: IDataSound;
    characterIndex: number;
    characterName: string;
    startMapId: number;
    startX: number;
    startY: number;
}

declare interface IDataSystem
{
    airship: IVehicle;
    armorTypes: string[];
    attackMotions: {
        type: number;
        weaponImageId: number;
    }[];
    battleBgm: IDataSound;
    battleback1Name: string;
    battleback2Name: string;
    battlerHue: number;
    battlerName: string;
    boat: IVehicle;
    currencyUnit: string;
    defeatMe: IDataSound;
    editMapId: number;
    elements: string[];
    equipTypes: string[];
    gameTitle: string;
    gameoverMe: IDataSound;
    locale: string;
    magicSkills: number[];
    menuCommands: boolean[];
    optDisplayTp: boolean;
    optDrawTitle: boolean;
    optExtraExp: boolean;
    optFloorDeath: boolean;
    optFollowers: boolean;
    optSideView: boolean;
    optSlipDeath: boolean;
    optTransparent: boolean;
    partyMembers: number[];
    ship: IVehicle;
    skillTypes: string[];
    sounds: IDataSound[];
    startMapId: number;
    startX: number;
    startY: number;
    switches: string[];
    terms: {
        basic: string[];
        commands: string[];
        params: string[];
        messages: {
            possession: string;
            expTotal: string;
            expNext: string;
            saveMessage: string;
            loadMessage: string;
            file: string;
            partyName: string;
            emerge: string;
            preemptive: string;
            surprise: string;
            escapeStart: string;
            escapeFailure: string;
            victory: string;
            defeat: string;
            obtainExp: string;
            obtainGold: string;
            obtainItem: string;
            levelUp: string;
            obtainSkill: string;
            useItem: string;
            criticalToEnemy: string;
            criticalToActor: string;
            actorDamage: string;
            actorRecovery: string;
            actorGain: string;
            actorLoss: string;
            actorDrain: string;
            actorNoDamage: string;
            actorNoHit: string;
            enemyDamage: string;
            enemyRecovery: string;
            enemyGain: string;
            enemyLoss: string;
            enemyDrain: string;
            enemyNoDamage: string;
            enemyNoHit: string;
            evasion: string;
            magicEvasion: string;
            magicReflection: string;
            counterAttack: string;
            substitute: string;
            buffAdd: string;
            debuffAdd: string;
            buffRemove: string;
            actionFailure: string;
            bgmVolume: string;
            bgsVolume: string;
            meVolume: string;
            seVolume: string;
            alwaysDash: string;
            commandRemember: string;
        };
    };
    testBattlers: {
        actorId: number;
        equips: number[];
        level: number;
    }[];
    testTroopId: number;
    title1Name: string;
    title2Name: string;
    titleBgm: IDataSound;
    variables: string[];
    versionId: number;
    victoryMe: IDataSound;
    weaponTypes: string;
    windowTone: number[];
}

declare interface IDataMapInfo
{
    id: number;
    expanded: boolean;
    name: string;
    order: number;
    parentId: number;
    scrollX: number;
    scrollY: number;
}

declare interface IDataEncounterList
{
    regionSet: number[];
    troopId: number;
    weight: number;
}

declare interface IDataMapEventPage
{
    conditions: {
        actorId: number;
        actorValid: boolean;
        itemId: number;
        itemValid: boolean;
        selfSwitchCh: string;
        selfSwitchValid: boolean;
        switch1Id: number;
        switch1Valid: boolean;
        switch2Id: number;
        switch2Valid: boolean;
        variableId: number;
        variableValid: boolean;
        variableValue: number;
    };
    directionFix: boolean;
    image: {
        tileId: number;
        characterName: string;
        direction: number;
        pattern: number;
        characterIndex: number;
    }
    list: IDataMapEventPageList[];
    moveFrequency: number;
    moveRoute: {
        list: {
            code: number;
            parameters: number[];
        }[];
        repeat: boolean;
        skippable: boolean;
        wait: boolean;
    };
    moveSpeed: number;
    moveType: number;
    priorityType: number;
    stepAnime: boolean;
    through: boolean;
    trigger: number;
    walkAnime: boolean;
}

declare interface IDataMapEvent
{
    id: number;
    name: string;
    note: string;
    pages: IDataMapEventPage[];
    meta: IDataMeta;
}

declare interface IDataMap
{
    autoplayBgm: boolean;
    autoplayBgs: boolean;
    battleback1Name: string;
    battleback2Name: string;
    bgm: IDataSound;
    bgs: IDataSound;
    disableDashing: boolean;
    displayName: string;
    encounterList: IDataEncounterList[];
    encounterStep: number;
    height: number;
    note: string;
    parallaxLoopX: boolean;
    parallaxLoopY: boolean;
    parallaxName: string;
    parallaxShow: boolean;
    parallaxSx: number;
    parallaxSy: number;
    scrollType: number;
    specifyBattleback: boolean;
    tilesetId: number;
    width: number;
    data: number[];
    events: IDataMapEvent[];
    meta: IDataMeta;
}

declare interface IDataMeta {
  [name: string]: string | true;
}
