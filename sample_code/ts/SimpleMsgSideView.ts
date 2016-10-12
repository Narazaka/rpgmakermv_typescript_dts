//=============================================================================
// SimpleMsgSideView.js
//=============================================================================
/*:
 * @plugindesc at sideview battle, only display item/skill names.
 * @author Sasuke KANNAZUKI
 *
 * @param displayAttack
 * @desc Whether to display normal attack. 1:yes 0:no
 * @default 0
 *
 * @param position
 * @desc Skill name display position. 0:left, 1:center
 * @default 1
 *
 * @help This plugin does not provide plugin commands.
 *
 * By not displaying the log and only displaying the skill name,
 * the speed of battle will increase slightly. 
 */
/*:ja
 * @plugindesc サイドビューバトルで技/アイテムの名前のみ表示します。
 * @author 神無月サスケ
 *
 * @param displayAttack
 * @desc 通常攻撃も表示するか (1:する 0:しない)
 * @default 0
 *
 * @param position
 * @desc 技名を表示する位置 (0:左寄せ, 1:中央)
 * @default 1
 *
 * @help このプラグインには、プラグインコマンドはありません。
 *
 * ログを表示せず、技名のみを表示することで、戦闘のテンポが若干高速になります。
 */

interface Window_BattleLog
{
    addItemNameText?(itemName: string): void;
}

(function() {

    let parameters: PluginParameters = PluginManager.parameters("SimpleMsgSideView");
    let displayAttack: boolean = Number(parameters["displayAttack"]) !== 0;
    let position: number = Number(parameters["position"] || 1);

    let _Window_BattleLog_addText: Function = Window_BattleLog.prototype.addText;
    Window_BattleLog.prototype.addText = function(this: Window_BattleLog, text: string): void
    {
        if ($gameSystem.isSideView())
        {
            this.refresh();
            this.wait();
            return;  // not display battle log
        }
        _Window_BattleLog_addText.call(this, text);
    };

    Window_BattleLog.prototype.addItemNameText = function(this: Window_BattleLog, itemName: string): void
    {
        this._lines.push(itemName);
        this.refresh();
        this.wait();
    };

    let _Window_BattleLog_displayAction: Function = Window_BattleLog.prototype.displayAction;
    Window_BattleLog.prototype.displayAction = function(this: Window_BattleLog, subject: Game_Battler, item: IDataItem): void
    {
        if ($gameSystem.isSideView())
        {
            if (displayAttack || !(DataManager.isSkill(item) && item.id === subject.attackSkillId()))
            {
                this.push("addItemNameText", item.name);  // display item/skill name
            }
            else
            {
                this.push("wait");
            }
            return;
        }
        _Window_BattleLog_displayAction.call(this, subject, item);
    };

    // to put skill/item name at center
    let _Window_BattleLog_drawLineText: Function = Window_BattleLog.prototype.drawLineText;
    Window_BattleLog.prototype.drawLineText = function(this: Window_BattleLog, index: number): void
    {
        if ($gameSystem.isSideView() && position === 1)
        {
            let rect: Rectangle = this.itemRectForText(index);
            this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
            this.drawText(this._lines[index], rect.x, rect.y, rect.width, "center");
            return;
        }
        _Window_BattleLog_drawLineText.call(this, index);
    };
})();
