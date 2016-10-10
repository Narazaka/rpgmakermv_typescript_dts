//=============================================================================
// AltSaveScreen.js
//=============================================================================

/*:
 * @plugindesc Alternative save/load screen layout.
 * @author Yoji Ojima
 *
 * @help This plugin does not provide plugin commands.
 */

/*:ja
 * @plugindesc セーブ／ロード画面のレイアウトを変更します。
 * @author Yoji Ojima
 *
 * @help このプラグインには、プラグインコマンドはありません。
 */

(function() {

    interface IWindow_SavefileList extends Window_SavefileList
    {
        statusWindow: IWindow_SavefileStatus;
    }

    interface IScene_File extends Scene_File
    {
        _listWindow: IWindow_SavefileList;
    }

    interface IWindow_SavefileStatus extends Window_Base
    {
        _id: number;
        _mode: string;

        initialize(): void;
        initialize(x: number, y: number, width: number, height: number): void;
        setMode(mode: string): void;
        setId(id: number);
        refresh(): void;
        drawFileId(id: number, x: number, y: number): void;
        drawContents(info: ISavefileInfo, rect: Rectangle, valid: boolean): void;
        drawPartyfaces(info: ISavefileInfo, x: number, y: number): void;
    }

    let _Scene_File_create: Function = Scene_File.prototype.create;
    Scene_File.prototype.create = function(this: IScene_File): void
    {
        _Scene_File_create.call(this);
        this._listWindow.height = this._listWindow.fittingHeight(8);

        let x: number = 0;
        let y: number = this._listWindow.y + this._listWindow.height;
        let width: number = Graphics.boxWidth;
        let height: number = Graphics.boxHeight - y;

        let statusWindow: IWindow_SavefileStatus = new Window_SavefileStatus(x, y, width, height);
        statusWindow.setMode(this.mode());
        this._listWindow.statusWindow = statusWindow;
        this._listWindow.callUpdateHelp();
        this.addWindow(statusWindow);
    };

    let _Scene_File_start: Function = Scene_File.prototype.start;
    Scene_File.prototype.start = function(this: Scene_File): void
    {
        _Scene_File_start.call(this);
        this._listWindow.ensureCursorVisible();
        this._listWindow.callUpdateHelp();
    };

    Window_SavefileList.prototype.spacing = function(): number
    {
        return 8;
    };

    Window_SavefileList.prototype.maxCols = function(): number
    {
        return 4;
    };

    Window_SavefileList.prototype.itemHeight = function(): number
    {
        return this.lineHeight() * 2;
    };

    let _Window_SavefileList_callUpdateHelp: Function = Window_SavefileList.prototype.callUpdateHelp;
    Window_SavefileList.prototype.callUpdateHelp = function(this: IWindow_SavefileList): void
    {
        _Window_SavefileList_callUpdateHelp.call(this);

        if (this.active && this.statusWindow)
        {
            this.statusWindow.setId(this.index() + 1);
        }
    };

    function Window_SavefileStatus(this: IWindow_SavefileStatus, x: number, y: number, width: number, height: number): void
    {
        this.initialize.apply(this, arguments);
    }
    Window_SavefileStatus.prototype = Object.create(Window_Base.prototype);
    Window_SavefileStatus.prototype.constructor = Window_SavefileStatus;

    Window_SavefileStatus.prototype.initialize = function(this: IWindow_SavefileStatus, x: number, y: number, width: number, height: number): void
    {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._id = 1;
    };

    Window_SavefileStatus.prototype.setMode = function(this: IWindow_SavefileStatus, mode: string): void
    {
        this._mode = mode;
    };

    Window_SavefileStatus.prototype.setId = function(this: IWindow_SavefileStatus, id: number): void
    {
        this._id = id;
        this.refresh();
    };

    Window_SavefileStatus.prototype.refresh = function(this: IWindow_SavefileStatus): void
    {
        this.contents.clear();
        let id: number = this._id;
        let valid: boolean = DataManager.isThisGameFile(id);
        let info: ISavefileInfo = DataManager.loadSavefileInfo(id);
        let rect: Rectangle = this.contents.rect;
        this.resetTextColor();
        if (this._mode === "load")
        {
            this.changePaintOpacity(valid);
        }
        this.drawFileId(id, rect.x, rect.y);
        if (info)
        {
            this.changePaintOpacity(valid);
            this.drawContents(info, rect, valid);
            this.changePaintOpacity(true);
        }
    };

    Window_SavefileStatus.prototype.drawFileId = function(this: IWindow_SavefileStatus, id: number, x: number, y: number): void
    {
        this.drawText(TextManager.file + " " + id, x, y, 180);
    };

    Window_SavefileStatus.prototype.drawContents = function(this: IWindow_SavefileStatus, info: ISavefileInfo, rect: Rectangle, valid: boolean): void
    {
        let bottom: number = rect.y + rect.height;
        let playtimeY: number = bottom - this.lineHeight();
        this.drawText(info.title, rect.x + 192, rect.y, rect.width - 192);
        if (valid)
        {
            this.drawPartyfaces(info, rect.x, bottom - 144);
        }
        this.drawText(info.playtime, rect.x, playtimeY, rect.width, "right");
    };

    Window_SavefileStatus.prototype.drawPartyfaces = function(this: IWindow_SavefileStatus, info: ISavefileInfo, x: number, y: number): void
    {
        if (info && info.faces)
        {
            for (let i: number = 0; i < info.faces.length; i++)
            {
                let data: any[] = info.faces[i];
                this.drawFace(data[0], data[1], x + i * 150, y);
            }
        }
    };

})();
