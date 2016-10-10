//=============================================================================
// ItemBook.js
//=============================================================================

/*:
 * @plugindesc Displays detailed statuses of items.
 * @author Yoji Ojima
 *
 * @param Unknown Data
 * @desc The index name for an unknown item.
 * @default ??????
 *
 * @param Price Text
 * @desc The text for "Price".
 * @default Price
 *
 * @param Equip Text
 * @desc The text for "Equip".
 * @default Equip
 *
 * @param Type Text
 * @desc The text for "Type".
 * @default Type
 *
 * @help
 *
 * Plugin Command:
 *   ItemBook open            # Open the item book screen
 *   ItemBook add weapon 3    # Add weapon #3 to the item book
 *   ItemBook add armor 4     # Add armor #4 to the item book
 *   ItemBook remove armor 5  # Remove armor #5 from the item book
 *   ItemBook remove item 6   # Remove item #6 from the item book
 *   ItemBook complete        # Complete the item book
 *   ItemBook clear           # Clear the item book
 *
 * Item (Weapon, Armor) Note:
 *   <book:no>                # This item does not appear in the item book
 */

/*:ja
 * @plugindesc アイテム図鑑です。アイテムの詳細なステータスを表示します。
 * @author Yoji Ojima
 *
 * @param Unknown Data
 * @desc 未確認のアイテムの索引名です。
 * @default ？？？？？？
 *
 * @param Price Text
 * @desc 「価格」の文字列です。
 * @default 価格
 *
 * @param Equip Text
 * @desc 「装備」の文字列です。
 * @default 装備
 *
 * @param Type Text
 * @desc 「タイプ」の文字列です。
 * @default タイプ
 *
 * @help
 *
 * プラグインコマンド:
 *   ItemBook open            # 図鑑画面を開く
 *   ItemBook add weapon 3    # 武器３番を図鑑に追加
 *   ItemBook add armor 4     # 防具４番を図鑑に追加
 *   ItemBook remove armor 5  # 防具５番を図鑑から削除
 *   ItemBook remove item 6   # アイテム６番を図鑑から削除
 *   ItemBook complete        # 図鑑を完成させる
 *   ItemBook clear           # 図鑑をクリアする
 *
 * アイテム（武器、防具）のメモ:
 *   <book:no>                # 図鑑に載せない場合
 */

(function()
{
    let parameters: PluginParameters = PluginManager.parameters("ItemBook");
    let unknownData: string = String(parameters["Unknown Data"] || "??????");
    let priceText: string = String(parameters["Price Text"] || "Price");
    let equipText: string = String(parameters["Equip Text"] || "Equip");
    let typeText: string = String(parameters["Type Text"] || "Type");

    let $gameSystem_ex: IGame_System_Ex;

    let _Game_Interpreter_pluginCommand: Function = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command: string, args: string[]): void
    {
        $gameSystem_ex = $gameSystem;

        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === "ItemBook")
        {
            switch (args[0])
            {
                case "open":
                    SceneManager.push(Scene_ItemBook);
                    break;
                case "add":
                    $gameSystem_ex.addToItemBook(args[1], Number(args[2]));
                    break;
                case "remove":
                    $gameSystem_ex.removeFromItemBook(args[1], Number(args[2]));
                    break;
                case "complete":
                    $gameSystem_ex.completeItemBook();
                    break;
                case "clear":
                    $gameSystem_ex.clearItemBook();
                    break;
                default:
                    break;
            }
        }
    };

    interface IGame_System_Ex extends Game_System
    {
        _ItemBookFlags?: boolean[][];

        addToItemBook?(type: string, dataId: number): void;
        removeFromItemBook?(type: string, dataId: number): void;
        itemBookTypeToIndex?(type: string): number;
        completeItemBook?(): void;
        clearItemBook?(): void;
        isInItemBook?(item: IDataAllItem): boolean;
        test?(): void;
    }
    let _Game_System_Ex_prototype: IGame_System_Ex = Game_System.prototype;

    _Game_System_Ex_prototype.addToItemBook = function(this: IGame_System_Ex, type: string, dataId: number): void
    {
        if (!this._ItemBookFlags)
        {
            this.clearItemBook();
        }
        let typeIndex: number = this.itemBookTypeToIndex(type);
        if (typeIndex >= 0)
        {
            this._ItemBookFlags[typeIndex][dataId] = true;
        }
    };

    _Game_System_Ex_prototype.removeFromItemBook = function(this: IGame_System_Ex, type: string, dataId: number): void
    {
        if (this._ItemBookFlags)
        {
            let typeIndex: number = this.itemBookTypeToIndex(type);
            if (typeIndex >= 0)
            {
                this._ItemBookFlags[typeIndex][dataId] = false;
            }
        }
    };

    _Game_System_Ex_prototype.itemBookTypeToIndex = function(type: string): number
    {
        switch (type)
        {
            case "item":
                return 0;
            case "weapon":
                return 1;
            case "armor":
                return 2;
            default:
                return -1;
        }
    };

    _Game_System_Ex_prototype.completeItemBook = function(this: IGame_System_Ex): void
    {
        this.clearItemBook();
        for (let i: number = 1; i < $dataItems.length; i++)
        {
            this._ItemBookFlags[0][i] = true;
        }
        for (let i: number = 1; i < $dataWeapons.length; i++)
        {
            this._ItemBookFlags[1][i] = true;
        }
        for (let i: number = 1; i < $dataArmors.length; i++)
        {
            this._ItemBookFlags[2][i] = true;
        }
    };

    _Game_System_Ex_prototype.clearItemBook = function(this: IGame_System_Ex): void
    {
        this._ItemBookFlags = [[], [], []];
    };

    _Game_System_Ex_prototype.isInItemBook = function(this: IGame_System_Ex, item: IDataAllItem): boolean
    {
        if (this._ItemBookFlags && item)
        {
            let typeIndex: number = -1;
            if (DataManager.isItem(item))
            {
                typeIndex = 0;
            }
            else if (DataManager.isWeapon(item))
            {
                typeIndex = 1;
            }
            else if (DataManager.isArmor(item))
            {
                typeIndex = 2;
            }

            if (typeIndex >= 0)
            {
                return !!this._ItemBookFlags[typeIndex][item.id];
            }
            else
            {
                return false;
            }
        }
        else
        {
            return false;
        }
    };

    let _Game_Party_gainItem: Function = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function(item: IDataItem, amount: number, includeEquip: boolean): void
    {
        _Game_Party_gainItem.call(this, item, amount, includeEquip);
        if (item && amount > 0)
        {
            let type: string;
            if (DataManager.isItem(item))
            {
                type = "item";
            }
            else if (DataManager.isWeapon(item))
            {
                type = "weapon";
            }
            else if (DataManager.isArmor(item))
            {
                type = "armor";
            }
            console.log($gameSystem);
            $gameSystem_ex.addToItemBook(type, item.id);
        }
    };

    class Scene_ItemBook extends Scene_MenuBase
    {
        protected _indexWindow: Window_ItemBookIndex;
        protected _statusWindow: Window_ItemBookStatus;

        public initialize(): void
        {
            super.initialize();
        };

        public create(): void
        {
            super.create();
            this._indexWindow = new Window_ItemBookIndex(0, 0);
            this._indexWindow.setHandler("cancel", this.popScene.bind(this));
            let wy: number = this._indexWindow.height;
            let ww: number = Graphics.boxWidth;
            let wh: number = Graphics.boxHeight - wy;
            this._statusWindow = new Window_ItemBookStatus(0, wy, ww, wh);
            this.addWindow(this._indexWindow);
            this.addWindow(this._statusWindow);
            this._indexWindow.setStatusWindow(this._statusWindow);
        }
    }

    class Window_ItemBookIndex extends Window_Selectable
    {
        public static lastTopRow: number = 0;
        public static lastIndex: number = 0;

        protected _list: IDataAllItem[];
        protected _statusWindow: Window_ItemBookStatus;

        constructor(x: number, y: number)
        {
            super();
            this.initialize(x, y);
        }

        public initialize(x?: number, y?: number): void
        {
            let width: number = Graphics.boxWidth;
            let height: number = this.fittingHeight(6);
            super.initialize(x, y, width, height);
            this.refresh();
            this.setTopRow(Window_ItemBookIndex.lastTopRow);
            this.select(Window_ItemBookIndex.lastIndex);
            this.activate();
        }

        public maxCols(): number
        {
            return 3;
        }

        public maxItems(): number
        {
            return this._list ? this._list.length : 0;
        }

        public setStatusWindow(statusWindow: Window_ItemBookStatus): void
        {
            this._statusWindow = statusWindow;
            this.updateStatus();
        }

        public update(): void
        {
            super.update();
            this.updateStatus();
        }

        public updateStatus(): void
        {
            if (this._statusWindow)
            {
                let item: IDataAllItem = this._list[this.index()];
                this._statusWindow.setItem(item);
            }
        }

        public refresh(): void
        {
            this._list = [];
            for (let i: number = 1; i < $dataItems.length; i++)
            {
                let item: IDataItem = $dataItems[i];
                if (item.name && item.itypeId === 1 && item.meta.book !== "no")
                {
                    this._list.push(item);
                }
            }
            for (let i: number = 1; i < $dataWeapons.length; i++)
            {
                let item: IDataItem = $dataWeapons[i];
                if (item.name && item.meta.book !== "no")
                {
                    this._list.push(item);
                }
            }
            for (let i: number = 1; i < $dataArmors.length; i++)
            {
                let item: IDataItem = $dataArmors[i];
                if (item.name && item.meta.book !== "no")
                {
                    this._list.push(item);
                }
            }
            this.createContents();
            this.drawAllItems();
        }

        public drawItem(index: number): void
        {
            let item: IDataAllItem = this._list[index];
            let rect: Rectangle = this.itemRect(index);
            let width: number = rect.width - this.textPadding();
            if ($gameSystem_ex.isInItemBook(item))
            {
                this.drawItemName(item, rect.x, rect.y, width);
            }
            else
            {
                let iw: number = Window_Base._iconWidth + 4;
                this.drawText(unknownData, rect.x + iw, rect.y, width - iw);
            }
        };

        public processCancel(): void
        {
            Window_Selectable.prototype.processCancel.call(this);
            Window_ItemBookIndex.lastTopRow = this.topRow();
            Window_ItemBookIndex.lastIndex = this.index();
        };
    }

    class Window_ItemBookStatus extends Window_Base
    {
        protected _item: IDataAllItem;

        constructor(x: number, y: number, width: number, height: number)
        {
            super();
            this.initialize(x, y, width, height);
        }

        public initialize(x?: number, y?: number, width?: number, height?: number): void
        {
            super.initialize(x, y, width, height);
        }

        public setItem(item: IDataAllItem): void
        {
            if (this._item !== item)
            {
                this._item = item;
                this.refresh();
            }
        };

        public refresh(): void
        {
            let item: IDataAllItem = this._item;
            let x: number = 0;
            let y: number = 0;
            let lineHeight: number = this.lineHeight();

            this.contents.clear();

            if (!item || !$gameSystem_ex.isInItemBook(item))
            {
                return;
            }

            this.drawItemName(item, x, y);

            x = this.textPadding();
            y = lineHeight + this.textPadding();

            let price: string = item.price > 0 ? item.price.toString() : "-";
            this.changeTextColor(this.systemColor());
            this.drawText(priceText, x, y, 120);
            this.resetTextColor();
            this.drawText(price, x + 120, y, 120, "right");
            y += lineHeight;

            if (DataManager.isWeapon(item) || DataManager.isArmor(item))
            {
                let etype: string = $dataSystem.equipTypes[(<IDataEquipItem> item).etypeId];
                this.changeTextColor(this.systemColor());
                this.drawText(equipText, x, y, 120);
                this.resetTextColor();
                this.drawText(etype, x + 120, y, 120, "right");
                y += lineHeight;

                let type: string;
                if (DataManager.isWeapon(item))
                {
                    type = $dataSystem.weaponTypes[(<IDataWeapon> item).wtypeId];
                }
                else
                {
                    type = $dataSystem.armorTypes[(<IDataArmor> item).atypeId];
                }
                this.changeTextColor(this.systemColor());
                this.drawText(typeText, x, y, 120);
                this.resetTextColor();
                this.drawText(type, x + 120, y, 120, "right");

                x = this.textPadding() + 300;
                y = lineHeight + this.textPadding();
                for (let i: number = 2; i < 8; i++)
                {
                    this.changeTextColor(this.systemColor());
                    this.drawText(TextManager.param(i), x, y, 160);
                    this.resetTextColor();
                    this.drawText((<IDataEquipItem> item).params[i].toString(), x + 160, y, 60, "right");
                    y += lineHeight;
                }
            }

            x = 0;
            y = this.textPadding() * 2 + lineHeight * 7;
            this.drawTextEx(item.description, x, y);
        };
    }
})();
