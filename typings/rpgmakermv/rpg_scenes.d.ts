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
