//=============================================================================
// EnemyBook.js
//=============================================================================

/*:
 * @plugindesc Displays detailed statuses of enemies.
 * @author Yoji Ojima
 *
 * @param Unknown Data
 * @desc The index name for an unknown enemy.
 * @default ??????
 *
 * @help
 *
 * Plugin Command:
 *   EnemyBook open         # Open the enemy book screen
 *   EnemyBook add 3        # Add enemy #3 to the enemy book
 *   EnemyBook remove 4     # Remove enemy #4 from the enemy book
 *   EnemyBook complete     # Complete the enemy book
 *   EnemyBook clear        # Clear the enemy book
 *
 * Enemy Note:
 *   <desc1:foobar>         # Description text in the enemy book, line 1
 *   <desc2:blahblah>       # Description text in the enemy book, line 2
 *   <book:no>              # This enemy does not appear in the enemy book
 */

/*:ja
 * @plugindesc モンスター図鑑です。敵キャラの詳細なステータスを表示します。
 * @author Yoji Ojima
 *
 * @param Unknown Data
 * @desc 未確認の敵キャラの索引名です。
 * @default ？？？？？？
 *
 * @help
 *
 * プラグインコマンド:
 *   EnemyBook open         # 図鑑画面を開く
 *   EnemyBook add 3        # 敵キャラ３番を図鑑に追加
 *   EnemyBook remove 4     # 敵キャラ４番を図鑑から削除
 *   EnemyBook complete     # 図鑑を完成させる
 *   EnemyBook clear        # 図鑑をクリアする
 *
 * 敵キャラのメモ:
 *   <desc1:なんとか>       # 説明１行目
 *   <desc2:かんとか>       # 説明２行目
 *   <book:no>              # 図鑑に載せない場合
 */

(function() {

    let parameters: PluginParameters = PluginManager.parameters("EnemyBook");
    let unknownData: string = String(parameters["Unknown Data"] || "??????");

    let $gameSystem_ex: IGame_System_Ex;

    let _Game_Interpreter_pluginCommand: Function = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command: string, args: string[])
    {
        $gameSystem_ex = $gameSystem;

        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === "EnemyBook")
        {
            switch (args[0])
            {
                case "open":
                    SceneManager.push(Scene_EnemyBook);
                    break;
                case "add":
                    $gameSystem_ex.addToEnemyBook(Number(args[1]));
                    break;
                case "remove":
                    $gameSystem_ex.removeFromEnemyBook(Number(args[1]));
                    break;
                case "complete":
                    $gameSystem_ex.completeEnemyBook();
                    break;
                case "clear":
                    $gameSystem_ex.clearEnemyBook();
                    break;
                default:
                    break;
            }
        }
    };

    interface IGame_System_Ex extends Game_System
    {
        _enemyBookFlags?: boolean[];

        addToEnemyBook?(enemyId: number): void;
        removeFromEnemyBook?(enemyId: number): void;
        completeEnemyBook?(): void;
        clearEnemyBook?(): void;
        isInEnemyBook?(enemy: IDataEnemy): boolean;
    }
    let _Game_System_Ex_prototype: IGame_System_Ex = Game_System.prototype;

    _Game_System_Ex_prototype.addToEnemyBook = function(this: IGame_System_Ex, enemyId: number): void
    {
        if (!this._enemyBookFlags)
        {
            this.clearEnemyBook();
        }
        this._enemyBookFlags[enemyId] = true;
    };

    _Game_System_Ex_prototype.removeFromEnemyBook = function(this: IGame_System_Ex, enemyId: number): void
    {
        if (this._enemyBookFlags)
        {
            this._enemyBookFlags[enemyId] = false;
        }
    };

    _Game_System_Ex_prototype.completeEnemyBook = function(this: IGame_System_Ex): void
    {
        this.clearEnemyBook();
        for (let i: number = 1; i < $dataEnemies.length; i++)
        {
            this._enemyBookFlags[i] = true;
        }
    };

    _Game_System_Ex_prototype.clearEnemyBook = function(this: IGame_System_Ex): void
    {
        this._enemyBookFlags = [];
    };

    _Game_System_Ex_prototype.isInEnemyBook = function(this: IGame_System_Ex, enemy: IDataEnemy): boolean
    {
        if (this._enemyBookFlags && enemy)
        {
            return !!this._enemyBookFlags[enemy.id];
        }
        else
        {
            return false;
        }
    };

    let _Game_Troop_setup: Function = Game_Troop.prototype.setup;
    Game_Troop.prototype.setup = function(this: Game_Troop, troopId: number): void
    {
        _Game_Troop_setup.call(this, troopId);
        this.members().forEach
        (
            function(enemy: Game_Enemy): void
            {
                if (enemy.isAppeared())
                {
                    $gameSystem_ex.addToEnemyBook(enemy.enemyId());
                }
            },
            this
        );
    };

    let _Game_Enemy_appear: Function = Game_Enemy.prototype.appear;
    Game_Enemy.prototype.appear = function(): void
    {
        _Game_Enemy_appear.call(this);
        $gameSystem_ex.addToEnemyBook(this._enemyId);
    };

    let _Game_Enemy_transform: Function = Game_Enemy.prototype.transform;
    Game_Enemy.prototype.transform = function(enemyId: number): void
    {
        _Game_Enemy_transform.call(this, enemyId);
        $gameSystem_ex.addToEnemyBook(enemyId);
    };

    class Scene_EnemyBook extends Scene_MenuBase
    {
        protected _indexWindow: Window_EnemyBookIndex;
        protected _statusWindow: Window_EnemyBookStatus;

        public initialize(): void
        {
            super.initialize();
        }

        public create(this: Scene_EnemyBook): void
        {
            super.create();
            this._indexWindow = new Window_EnemyBookIndex(0, 0);
            this._indexWindow.setHandler("cancel", this.popScene.bind(this));
            let wy: number = this._indexWindow.height;
            let ww: number = Graphics.boxWidth;
            let wh: number = Graphics.boxHeight - wy;
            this._statusWindow = new Window_EnemyBookStatus(0, wy, ww, wh);
            this.addWindow(this._indexWindow);
            this.addWindow(this._statusWindow);
            this._indexWindow.setStatusWindow(this._statusWindow);
        }
    }

    class Window_EnemyBookIndex extends Window_Selectable
    {
        public static lastTopRow: number = 0;
        public static lastIndex: number = 0;

        protected _list: IDataEnemy[];
        protected _statusWindow: Window_EnemyBookStatus;

        constructor(x: number, y: number)
        {
            super(x, y);
            this.initialize(x, y);
        }

        public initialize(this: Window_EnemyBookIndex, x?: number, y?: number): void
        {
            let width: number = Graphics.boxWidth;
            let height: number = this.fittingHeight(6);
            super.initialize(x, y, width, height);
            this.refresh();
            this.setTopRow(Window_EnemyBookIndex.lastTopRow);
            this.select(Window_EnemyBookIndex.lastIndex);
            this.activate();
        }

        public maxCols(): number
        {
            return 3;
        }

        public maxItems(this: Window_EnemyBookIndex): number
        {
            return this._list ? this._list.length : 0;
        }

        public setStatusWindow(this: Window_EnemyBookIndex, statusWindow: Window_EnemyBookStatus): void
        {
            this._statusWindow = statusWindow;
            this.updateStatus();
        }

        public update(this: Window_EnemyBookIndex): void
        {
            super.update();
            this.updateStatus();
        }

        public updateStatus(this: Window_EnemyBookIndex): void
        {
            if (this._statusWindow)
            {
                let enemy: IDataEnemy = this._list[this.index()];
                this._statusWindow.setEnemy(enemy);
            }
        }

        public refresh(this: Window_EnemyBookIndex): void
        {
            this._list = [];
            for (let i: number = 1; i < $dataEnemies.length; i++)
            {
                let enemy: IDataEnemy = $dataEnemies[i];
                if (enemy.name && enemy.meta.book !== "no")
                {
                    this._list.push(enemy);
                }
            }
            this.createContents();
            this.drawAllItems();
        }

        public drawItem(this: Window_EnemyBookIndex, index: number): void
        {
            let enemy: IDataEnemy = this._list[index];
            let rect: Rectangle = this.itemRectForText(index);
            let name: string;
            if ($gameSystem_ex.isInEnemyBook(enemy))
            {
                name = enemy.name;
            }
            else
            {
                name = unknownData;
            }
            this.drawText(name, rect.x, rect.y, rect.width);
        }

        public processCancel(): void
        {
            super.processCancel();
            Window_EnemyBookIndex.lastTopRow = this.topRow();
            Window_EnemyBookIndex.lastIndex = this.index();
        };
    }

    class Window_EnemyBookStatus extends Window_Base
    {
        protected _enemy: IDataEnemy;
        protected _enemySprite: Sprite;

        constructor(x: number, y: number, width: number, height: number)
        {
            super();
            this.initialize(x, y, width, height);
        }

        public initialize(this: Window_EnemyBookStatus, x?: number, y?: number, width?: number, height?: number): void
        {
            super.initialize(x, y, width, height);
            this._enemy = null;
            this._enemySprite = new Sprite();
            this._enemySprite.anchor.x = 0.5;
            this._enemySprite.anchor.y = 0.5;
            this._enemySprite.x = width / 2 - 20;
            this._enemySprite.y = height / 2;
            this.addChildToBack(this._enemySprite);
            this.refresh();
        }

        public setEnemy(this: Window_EnemyBookStatus, enemy: IDataEnemy): void
        {
            if (this._enemy !== enemy)
            {
                this._enemy = enemy;
                this.refresh();
            }
        }

        public update(this: Window_EnemyBookStatus): void
        {
            super.update();
            if (this._enemySprite.bitmap)
            {
                let bitmapHeight: number = this._enemySprite.bitmap.height;
                let contentsHeight: number = this.contents.height;
                let scale: number = 1;
                if (bitmapHeight > contentsHeight)
                {
                    scale = contentsHeight / bitmapHeight;
                }
                this._enemySprite.scale.x = scale;
                this._enemySprite.scale.y = scale;
            }
        }

        public refresh(this: Window_EnemyBookStatus): void
        {
            let enemy: IDataEnemy = this._enemy;
            let x: number = 0;
            let y: number = 0;
            let lineHeight: number = this.lineHeight();

            this.contents.clear();

            if (!enemy || !$gameSystem_ex.isInEnemyBook(enemy))
            {
                this._enemySprite.bitmap = null;
                return;
            }

            let name: string = enemy.battlerName;
            let hue: number = enemy.battlerHue;
            let bitmap: Bitmap;
            if ($gameSystem.isSideView())
            {
                bitmap = ImageManager.loadSvEnemy(name, hue);
            }
            else
            {
                bitmap = ImageManager.loadEnemy(name, hue);
            }
            this._enemySprite.bitmap = bitmap;

            this.resetTextColor();
            this.drawText(enemy.name, x, y);

            x = this.textPadding();
            y = lineHeight + this.textPadding();

            for (let i: number = 0; i < 8; i++)
            {
                this.changeTextColor(this.systemColor());
                this.drawText(TextManager.param(i), x, y, 160);
                this.resetTextColor();
                this.drawText(enemy.params[i].toString(), x + 160, y, 60, "right");
                y += lineHeight;
            }

            let rewardsWidth: number = 280;
            x = this.contents.width - rewardsWidth;
            y = lineHeight + this.textPadding();

            this.resetTextColor();
            this.drawText(enemy.exp.toString(), x, y);
            x += this.textWidth(enemy.exp.toString()) + 6;
            this.changeTextColor(this.systemColor());
            this.drawText(TextManager.expA, x, y);
            x += this.textWidth(TextManager.expA + "  ");

            this.resetTextColor();
            this.drawText(enemy.gold.toString(), x, y);
            x += this.textWidth(enemy.gold.toString()) + 6;
            this.changeTextColor(this.systemColor());
            this.drawText(TextManager.currencyUnit, x, y);

            x = this.contents.width - rewardsWidth;
            y += lineHeight;

            for (let j: number = 0; j < enemy.dropItems.length; j++)
            {
                let di: IDataDropItem = enemy.dropItems[j];
                if (di.kind > 0)
                {
                    let item: IDataAllItem = Game_Enemy.prototype.itemObject(di.kind, di.dataId);
                    this.drawItemName(item, x, y, rewardsWidth);
                    y += lineHeight;
                }
            }

            let descWidth: number = 480;
            x = this.contents.width - descWidth;
            y = this.textPadding() + lineHeight * 7;
            this.drawTextEx(enemy.meta.desc1, x, y + lineHeight * 0);
            this.drawTextEx(enemy.meta.desc2, x, y + lineHeight * 1);
        };
    }
})();
