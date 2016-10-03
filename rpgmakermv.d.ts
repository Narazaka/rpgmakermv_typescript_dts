declare module MV
{
    export class Game_CharacterBase
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
        blendMode(): any; // TODO
        setBlendMode(blendMode: any): void; // TODO
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

    export class Game_Character extends Game_CharacterBase
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

    export class Game_Player extends Game_Character
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

    export class Game_Follower extends Game_Character
    {
        initialize(): void;
        refresh(): void;
        actor(): any; // TODO
        isVisible(): boolean;
        update(): void;
        chaseCharacter(character: any): void; // TODO
    }

    export class Game_Followers extends Game_Character
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

    export class Game_Vehicle extends Game_Character
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

    export class Game_Event extends Game_Character
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

    export class Game_Interpreter
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
        pluginCommand(command: string, args: any): void;
    }
}