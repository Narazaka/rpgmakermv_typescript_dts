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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function () {
    var parameters = PluginManager.parameters("ItemBook");
    var unknownData = String(parameters["Unknown Data"] || "??????");
    var priceText = String(parameters["Price Text"] || "Price");
    var equipText = String(parameters["Equip Text"] || "Equip");
    var typeText = String(parameters["Type Text"] || "Type");
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === "ItemBook") {
            switch (args[0]) {
                case "open":
                    SceneManager.push(Scene_ItemBook);
                    break;
                case "add":
                    $gameSystem.addToItemBook(args[1], Number(args[2]));
                    break;
                case "remove":
                    $gameSystem.removeFromItemBook(args[1], Number(args[2]));
                    break;
                case "complete":
                    $gameSystem.completeItemBook();
                    break;
                case "clear":
                    $gameSystem.clearItemBook();
                    break;
                default:
                    break;
            }
        }
    };
    Game_System.prototype.addToItemBook = function (type, dataId) {
        if (!this._ItemBookFlags) {
            this.clearItemBook();
        }
        var typeIndex = this.itemBookTypeToIndex(type);
        if (typeIndex >= 0) {
            this._ItemBookFlags[typeIndex][dataId] = true;
        }
    };
    Game_System.prototype.removeFromItemBook = function (type, dataId) {
        if (this._ItemBookFlags) {
            var typeIndex = this.itemBookTypeToIndex(type);
            if (typeIndex >= 0) {
                this._ItemBookFlags[typeIndex][dataId] = false;
            }
        }
    };
    Game_System.prototype.itemBookTypeToIndex = function (type) {
        switch (type) {
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
    Game_System.prototype.completeItemBook = function () {
        this.clearItemBook();
        for (var i = 1; i < $dataItems.length; i++) {
            this._ItemBookFlags[0][i] = true;
        }
        for (var i = 1; i < $dataWeapons.length; i++) {
            this._ItemBookFlags[1][i] = true;
        }
        for (var i = 1; i < $dataArmors.length; i++) {
            this._ItemBookFlags[2][i] = true;
        }
    };
    Game_System.prototype.clearItemBook = function () {
        this._ItemBookFlags = [[], [], []];
    };
    Game_System.prototype.isInItemBook = function (item) {
        if (this._ItemBookFlags && item) {
            var typeIndex = -1;
            if (DataManager.isItem(item)) {
                typeIndex = 0;
            }
            else if (DataManager.isWeapon(item)) {
                typeIndex = 1;
            }
            else if (DataManager.isArmor(item)) {
                typeIndex = 2;
            }
            if (typeIndex >= 0) {
                return !!this._ItemBookFlags[typeIndex][item.id];
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    var _Game_Party_gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
        _Game_Party_gainItem.call(this, item, amount, includeEquip);
        if (item && amount > 0) {
            var type = void 0;
            if (DataManager.isItem(item)) {
                type = "item";
            }
            else if (DataManager.isWeapon(item)) {
                type = "weapon";
            }
            else if (DataManager.isArmor(item)) {
                type = "armor";
            }
            console.log($gameSystem);
            $gameSystem.addToItemBook(type, item.id);
        }
    };
    var Scene_ItemBook = (function (_super) {
        __extends(Scene_ItemBook, _super);
        function Scene_ItemBook() {
            _super.apply(this, arguments);
        }
        Scene_ItemBook.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        ;
        Scene_ItemBook.prototype.create = function () {
            _super.prototype.create.call(this);
            this._indexWindow = new Window_ItemBookIndex(0, 0);
            this._indexWindow.setHandler("cancel", this.popScene.bind(this));
            var wy = this._indexWindow.height;
            var ww = Graphics.boxWidth;
            var wh = Graphics.boxHeight - wy;
            this._statusWindow = new Window_ItemBookStatus(0, wy, ww, wh);
            this.addWindow(this._indexWindow);
            this.addWindow(this._statusWindow);
            this._indexWindow.setStatusWindow(this._statusWindow);
        };
        return Scene_ItemBook;
    }(Scene_MenuBase));
    var Window_ItemBookIndex = (function (_super) {
        __extends(Window_ItemBookIndex, _super);
        function Window_ItemBookIndex(x, y) {
            _super.call(this);
            this.initialize(x, y);
        }
        Window_ItemBookIndex.prototype.initialize = function (x, y) {
            var width = Graphics.boxWidth;
            var height = this.fittingHeight(6);
            _super.prototype.initialize.call(this, x, y, width, height);
            this.refresh();
            this.setTopRow(Window_ItemBookIndex.lastTopRow);
            this.select(Window_ItemBookIndex.lastIndex);
            this.activate();
        };
        Window_ItemBookIndex.prototype.maxCols = function () {
            return 3;
        };
        Window_ItemBookIndex.prototype.maxItems = function () {
            return this._list ? this._list.length : 0;
        };
        Window_ItemBookIndex.prototype.setStatusWindow = function (statusWindow) {
            this._statusWindow = statusWindow;
            this.updateStatus();
        };
        Window_ItemBookIndex.prototype.update = function () {
            _super.prototype.update.call(this);
            this.updateStatus();
        };
        Window_ItemBookIndex.prototype.updateStatus = function () {
            if (this._statusWindow) {
                var item = this._list[this.index()];
                this._statusWindow.setItem(item);
            }
        };
        Window_ItemBookIndex.prototype.refresh = function () {
            this._list = [];
            for (var i = 1; i < $dataItems.length; i++) {
                var item = $dataItems[i];
                if (item.name && item.itypeId === 1 && item.meta.book !== "no") {
                    this._list.push(item);
                }
            }
            for (var i = 1; i < $dataWeapons.length; i++) {
                var item = $dataWeapons[i];
                if (item.name && item.meta.book !== "no") {
                    this._list.push(item);
                }
            }
            for (var i = 1; i < $dataArmors.length; i++) {
                var item = $dataArmors[i];
                if (item.name && item.meta.book !== "no") {
                    this._list.push(item);
                }
            }
            this.createContents();
            this.drawAllItems();
        };
        Window_ItemBookIndex.prototype.drawItem = function (index) {
            var item = this._list[index];
            var rect = this.itemRect(index);
            var width = rect.width - this.textPadding();
            if ($gameSystem.isInItemBook(item)) {
                this.drawItemName(item, rect.x, rect.y, width);
            }
            else {
                var iw = Window_Base._iconWidth + 4;
                this.drawText(unknownData, rect.x + iw, rect.y, width - iw);
            }
        };
        ;
        Window_ItemBookIndex.prototype.processCancel = function () {
            Window_Selectable.prototype.processCancel.call(this);
            Window_ItemBookIndex.lastTopRow = this.topRow();
            Window_ItemBookIndex.lastIndex = this.index();
        };
        ;
        Window_ItemBookIndex.lastTopRow = 0;
        Window_ItemBookIndex.lastIndex = 0;
        return Window_ItemBookIndex;
    }(Window_Selectable));
    var Window_ItemBookStatus = (function (_super) {
        __extends(Window_ItemBookStatus, _super);
        function Window_ItemBookStatus(x, y, width, height) {
            _super.call(this);
            this.initialize(x, y, width, height);
        }
        Window_ItemBookStatus.prototype.initialize = function (x, y, width, height) {
            _super.prototype.initialize.call(this, x, y, width, height);
        };
        Window_ItemBookStatus.prototype.setItem = function (item) {
            if (this._item !== item) {
                this._item = item;
                this.refresh();
            }
        };
        ;
        Window_ItemBookStatus.prototype.refresh = function () {
            var item = this._item;
            var x = 0;
            var y = 0;
            var lineHeight = this.lineHeight();
            this.contents.clear();
            if (!item || !$gameSystem.isInItemBook(item)) {
                return;
            }
            this.drawItemName(item, x, y);
            x = this.textPadding();
            y = lineHeight + this.textPadding();
            var price = item.price > 0 ? item.price.toString() : "-";
            this.changeTextColor(this.systemColor());
            this.drawText(priceText, x, y, 120);
            this.resetTextColor();
            this.drawText(price, x + 120, y, 120, "right");
            y += lineHeight;
            if (DataManager.isWeapon(item) || DataManager.isArmor(item)) {
                var etype = $dataSystem.equipTypes[item.etypeId];
                this.changeTextColor(this.systemColor());
                this.drawText(equipText, x, y, 120);
                this.resetTextColor();
                this.drawText(etype, x + 120, y, 120, "right");
                y += lineHeight;
                var type = void 0;
                if (DataManager.isWeapon(item)) {
                    type = $dataSystem.weaponTypes[item.wtypeId];
                }
                else {
                    type = $dataSystem.armorTypes[item.atypeId];
                }
                this.changeTextColor(this.systemColor());
                this.drawText(typeText, x, y, 120);
                this.resetTextColor();
                this.drawText(type, x + 120, y, 120, "right");
                x = this.textPadding() + 300;
                y = lineHeight + this.textPadding();
                for (var i = 2; i < 8; i++) {
                    this.changeTextColor(this.systemColor());
                    this.drawText(TextManager.param(i), x, y, 160);
                    this.resetTextColor();
                    this.drawText(item.params[i].toString(), x + 160, y, 60, "right");
                    y += lineHeight;
                }
            }
            x = 0;
            y = this.textPadding() * 2 + lineHeight * 7;
            this.drawTextEx(item.description, x, y);
        };
        ;
        return Window_ItemBookStatus;
    }(Window_Base));
})();
