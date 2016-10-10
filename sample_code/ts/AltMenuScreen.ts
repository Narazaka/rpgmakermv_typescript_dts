//=============================================================================
// AltMenuScreen.js
//=============================================================================

/*:
 * @plugindesc Alternative menu screen layout.
 * @author Yoji Ojima
 *
 * @help This plugin does not provide plugin commands.
 */

/*:ja
 * @plugindesc メニュー画面のレイアウトを変更します。
 * @author Yoji Ojima
 *
 * @help このプラグインには、プラグインコマンドはありません。
 */

(function() {
    let _Scene_Menu_create: Function = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function(this: Scene_Menu): void
    {
        _Scene_Menu_create.call(this);

        this._statusWindow.x = 0;
        this._statusWindow.y = this._commandWindow.height;
        this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
    };

    Window_MenuCommand.prototype.windowWidth = function(): number
    {
        return Graphics.boxWidth;
    };

    Window_MenuCommand.prototype.maxCols = function(): number
    {
        return 4;
    };

    Window_MenuCommand.prototype.numVisibleRows = function(): number
    {
        return 2;
    };

    Window_MenuStatus.prototype.windowWidth = function(): number
    {
        return Graphics.boxWidth;
    };

    Window_MenuStatus.prototype.windowHeight = function(): number
    {
        let h1: number = this.fittingHeight(1);
        let h2: number = this.fittingHeight(2);
        return Graphics.boxHeight - h1 - h2;
    };

    Window_MenuStatus.prototype.maxCols = function(): number
    {
        return 4;
    };

    Window_MenuStatus.prototype.numVisibleRows = function(): number
    {
        return 1;
    };

    Window_MenuStatus.prototype.drawItemImage = function(this: Window_MenuStatus, index: number): void
    {
        let actor: Game_Actor = $gameParty.members()[index];
        let rect: Rectangle = this.itemRectForText(index);
        let w: number = Math.min(rect.width, 144);
        let h: number = Math.min(rect.height, 144);
        let lineHeight: number = this.lineHeight();
        this.changePaintOpacity(actor.isBattleMember());
        this.drawActorFace(actor, rect.x, rect.y + lineHeight * 2.5, w, h);
        this.changePaintOpacity(true);
    };

    Window_MenuStatus.prototype.drawItemStatus = function(this: Window_MenuStatus, index: number): void
    {
        let actor: Game_Actor = $gameParty.members()[index];
        let rect: Rectangle = this.itemRectForText(index);
        let x: number = rect.x;
        let y: number = rect.y;
        let width: number = rect.width;
        let bottom: number = y + rect.height;
        let lineHeight: number = this.lineHeight();

        this.drawActorName(actor, x, y + lineHeight * 0, width);
        this.drawActorLevel(actor, x, y + lineHeight * 1);
        this.drawActorClass(actor, x, bottom - lineHeight * 4, width);
        this.drawActorHp(actor, x, bottom - lineHeight * 3, width);
        this.drawActorMp(actor, x, bottom - lineHeight * 2, width);
        this.drawActorIcons(actor, x, bottom - lineHeight * 1, width);
    };

    let _Window_MenuActor_initialize: Function = Window_MenuActor.prototype.initialize;
    Window_MenuActor.prototype.initialize = function(this: Window_MenuActor): void
    {
        _Window_MenuActor_initialize.call(this);
        this.y = this.fittingHeight(2);
    };
})();
