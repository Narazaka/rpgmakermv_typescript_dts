//=============================================================================
// TitleCommandPosition.js
//=============================================================================
/*:
 * @plugindesc Changes the position of the title command window.
 * @author Yoji Ojima
 *
 * @param Offset X
 * @desc The offset value for the x coordinate.
 * @default 0
 *
 * @param Offset Y
 * @desc The offset value for the y coordinate.
 * @default 0
 *
 * @param Width
 * @desc The width of the command window.
 * @default 240
 *
 * @param Background
 * @desc The background type. 0: Normal, 1: Dim, 2: Transoriginal
 * @default 0
 *
 * @help This plugin does not provide plugin commands.
 */
/*:ja
 * @plugindesc タイトルコマンドウィンドウの位置を変更します。
 * @author Yoji Ojima
 *
 * @param Offset X
 * @desc X座標のオフセット値です。
 * @default 0
 *
 * @param Offset Y
 * @desc Y座標のオフセット値です。
 * @default 0
 *
 * @param Width
 * @desc コマンドウィンドウの幅です。
 * @default 240
 *
 * @param Background
 * @desc 背景タイプです。0: 通常、1: 暗くする、2: 透明
 * @default 0
 *
 * @help このプラグインには、プラグインコマンドはありません。
 */
(function () {
    let parameters: PluginParameters = PluginManager.parameters("TitleCommandPosition");
    let offsetX: number = Number(parameters["Offset X"] || 0);
    let offsetY: number = Number(parameters["Offset Y"] || 0);
    let width: number = Number(parameters["Width"] || 240);
    let background: number = Number(parameters["Background"] || 0);

    let _Window_TitleCommand_updatePlacement: Function = Window_TitleCommand.prototype.updatePlacement;
    Window_TitleCommand.prototype.updatePlacement = function(this: Window_TitleCommand): void
    {
        _Window_TitleCommand_updatePlacement.call(this);
        this.x += offsetX;
        this.y += offsetY;
        this.setBackgroundType(background);
    };

    Window_TitleCommand.prototype.windowWidth = function(): number
    {
        return width;
    };
})();
