/*:
 * NOTE: Images are stored in the img/system folder.
 *
 * @plugindesc Show a Splash Screen "Made with MV" and/or a Custom Splash Screen before going to main screen.
 * @author Dan "Liquidize" Deptula
 *
 * @help This plugin does not provide plugin commands.
 *
 * @param Show Made With MV
 * @desc Enabled/Disables showing the "Made with MV" splash screen.
 * OFF - false     ON - true
 * Default: ON
 * @default true
 *
 * @param Made with MV Image
 * @desc The image to use when showing "Made with MV"
 * Default: MadeWithMv
 * @default MadeWithMv
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param Show Custom Splash
 * @desc Enabled/Disables showing the "Made with MV" splash screen.
 * OFF - false     ON - true
 * Default: OFF
 * @default false
 *
 * @param Custom Image
 * @desc The image to use when showing "Made with MV"
 * Default: 
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param Fade Out Time
 * @desc The time it takes to fade out, in frames.
 * Default: 120
 * @default 120
 *
 * @param Fade In Time
 * @desc The time it takes to fade in, in frames.
 * Default: 120
 * @default 120
 *
 * @param Wait Time
 * @desc The time between fading in and out, in frames.
 * Default: 160
 * @default 160
 *
 */
 /*:ja
* メモ: イメージはimg／systemフォルダ内に保存されます。
 *
 * @plugindesc メイン画面へ進む前に、"Made with MV"のスプラッシュ画面もしくはカスタマイズされたスプラッシュ画面を表示します。
 * @author Dan "Liquidize" Deptula
 *
 * @help  このプラグインにはプラグインコマンドはありません。
 *
 * @param Show Made With MV
 * @desc "Made with MV"のスプラッシュ画面を表示できる/できないようにします。 
 * OFF - false     ON - true
 * デフォルト: ON
 * @default true
 *
 * @param Made with MV Image
 * @desc "Made with MV"を表示する際に使用する画像
 * デフォルト: MadeWithMv
 * @default MadeWithMv
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param Show Custom Splash
 * @desc "Made with MV"のスプラッシュ画面を表示できる/できないようにします。 
 * OFF - false     ON - true
 * デフォルト: OFF
 * @default false
 *
 * @param Custom Image
 * @desc "Made with MV"を表示する際に使用する画像
 * デフォルト: 
 * @default 
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param Fade Out Time
 * @desc フェードアウトに要する時間（フレーム数）
 * デフォルト: 120
 * @default 120
 *
 * @param Fade In Time
 * @desc フェードインに要する時間（フレーム数）
 * デフォルト: 120
 * @default 120
 *
 * @param Wait Time
 * @desc フェードインからフェードアウトまでに要する時間（フレーム数）
 * デフォルト: 160
 * @default 160
 *
 */

namespace Liquidize
{
    export class MadeWithMV
    {
        public static Parameters: PluginParameters;
        public static ShowMV: any;
        public static MVImage: string;
        public static ShowCustom: any;
        public static CustomImage: string;
        public static FadeOutTime: number;
        public static FadeInTime: number;
        public static WaitTime: number;
    }
}

Liquidize.MadeWithMV.Parameters = PluginManager.parameters("MadeWithMv");
Liquidize.MadeWithMV.ShowMV = JSON.parse(Liquidize.MadeWithMV.Parameters["Show Made With MV"]);
Liquidize.MadeWithMV.MVImage = String(Liquidize.MadeWithMV.Parameters["Made with MV Image"]);
Liquidize.MadeWithMV.ShowCustom = JSON.parse(Liquidize.MadeWithMV.Parameters["Show Custom Splash"]);
Liquidize.MadeWithMV.CustomImage = String(Liquidize.MadeWithMV.Parameters["Custom Image"]);
Liquidize.MadeWithMV.FadeOutTime = Number(Liquidize.MadeWithMV.Parameters["Fade Out Time"]) || 120;
Liquidize.MadeWithMV.FadeInTime = Number(Liquidize.MadeWithMV.Parameters["Fade In Time"]) || 120;
Liquidize.MadeWithMV.WaitTime = Number(Liquidize.MadeWithMV.Parameters["Wait Time"]) || 160;

(function() {

    //-----------------------------------------------------------------------------
    // Scene_Boot
    //
    // The scene class for dealing with the game boot.
    let _Scene_Boot_loadSystemImages: Function = Scene_Boot.loadSystemImages;
    Scene_Boot.loadSystemImages = function(): void
    {
        _Scene_Boot_loadSystemImages.call(this);
        if (Liquidize.MadeWithMV.ShowMV)
        {
            ImageManager.loadSystem(Liquidize.MadeWithMV.MVImage);
        }
        if (Liquidize.MadeWithMV.ShowCustom)
        {
            ImageManager.loadSystem(Liquidize.MadeWithMV.CustomImage);
        }
    };

    let _Scene_Boot_start: Function = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function(): void
    {
        if ((Liquidize.MadeWithMV.ShowMV || Liquidize.MadeWithMV.ShowCustom) && !DataManager.isBattleTest() && !DataManager.isEventTest())
        {
            SceneManager.goto(Scene_Splash);
        }
        else
        {
            _Scene_Boot_start.call(this);
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_Splash
    //
    // The scene class for dealing with the splash screens.

    class Scene_Splash extends Scene_Base
    {
        public _mvSplash: Sprite;
        public _customSplash: Sprite;
        public _mvWaitTime: number;
        public _customWaitTime: number;
        public _mvFadeOut: boolean;
        public _mvFadeIn: boolean;
        public _customFadeOut: boolean;
        public _customFadeIn: boolean;

        public createSplashes(): void
        {
            if (Liquidize.MadeWithMV.ShowMV)
            {
                this._mvSplash = new Sprite(ImageManager.loadSystem(Liquidize.MadeWithMV.MVImage));
                this.addChild(this._mvSplash);
            }
            if (Liquidize.MadeWithMV.ShowCustom)
            {
                this._customSplash = new Sprite(ImageManager.loadSystem(Liquidize.MadeWithMV.CustomImage));
                this._customSplash.opacity = 0;
                this.addChild(this._customSplash);
            }
        };

        public centerSprite(sprite: Sprite): void
        {
            sprite.x = Graphics.width / 2;
            sprite.y = Graphics.height / 2;
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
        };

        public gotoTitleOrTest(): void
        {
            super.start();
            SoundManager.preloadImportantSounds();
            if (DataManager.isBattleTest())
            {
                DataManager.setupBattleTest();
                SceneManager.goto(Scene_Battle);
            }
            else if (DataManager.isEventTest())
            {
                DataManager.setupEventTest();
                SceneManager.goto(Scene_Map);
            }
            else
            {
                this.checkPlayerLocation();
                DataManager.setupNewGame();
                SceneManager.goto(Scene_Title);
                Window_TitleCommand.initCommandPosition();
            }
            this.updateDocumentTitle();
        };

        public updateDocumentTitle(): void
        {
            document.title = $dataSystem.gameTitle;
        };

        public checkPlayerLocation(): void
        {
            if ($dataSystem.startMapId === 0)
            {
                throw new Error("Player\"s starting position is not set");
            }
        };

        public initialize(): void
        {
            super.initialize();

            this._mvSplash = null;
            this._customSplash = null;
            this._mvWaitTime = Liquidize.MadeWithMV.WaitTime;
            this._customWaitTime = Liquidize.MadeWithMV.WaitTime;
            this._mvFadeOut = false;
            this._mvFadeIn = false;
            this._customFadeOut = false;
            this._customFadeIn = false;
        };

        public create(): void
        {
            super.create();
            this.createSplashes();
        };

        public start(): void
        {
            super.start();
            SceneManager.clearStack();
            if (this._mvSplash !== null)
            {
                this.centerSprite(this._mvSplash);
            }
            if (this._customSplash !== null)
            {
                this.centerSprite(this._customSplash);
            }
        };

        public update(): void
        {
            if (Liquidize.MadeWithMV.ShowMV)
            {
                if (!this._mvFadeIn)
                {
                    this.startFadeIn(Liquidize.MadeWithMV.FadeInTime, false);
                    this._mvFadeIn = true;
                }
                else
                {
                    if (this._mvWaitTime > 0 && this._mvFadeOut === false)
                    {
                        this._mvWaitTime--;
                    }
                    else
                    {
                        if (this._mvFadeOut === false)
                        {
                            this._mvFadeOut = true;
                            this.startFadeOut(Liquidize.MadeWithMV.FadeOutTime, false);
                        }
                    }
                }
            }

            if (Liquidize.MadeWithMV.ShowCustom)
            {
                if (Liquidize.MadeWithMV.ShowMV && this._mvFadeOut === true)
                {
                    if (!this._customFadeIn && this._fadeDuration === 0)
                    {
                        this._customSplash.opacity = 255;
                        this._customWaitTime = Liquidize.MadeWithMV.WaitTime;
                        this.startFadeIn(Liquidize.MadeWithMV.FadeInTime, false);
                        this._customFadeIn = true;
                    }
                    else
                    {
                        if (this._customWaitTime > 0 && this._customFadeOut === false)
                        {
                            this._customWaitTime--;
                        }
                        else
                        {
                            if (this._customFadeOut === false)
                            {
                                this._customFadeOut = true;
                                this.startFadeOut(Liquidize.MadeWithMV.FadeOutTime, false);
                            }
                        }
                    }
                }
                else if (!Liquidize.MadeWithMV.ShowMV)
                {
                    if (!this._customFadeIn)
                    {
                        this._customSplash.opacity = 255;
                        this.startFadeIn(Liquidize.MadeWithMV.FadeInTime, false);
                        this._customFadeIn = true;
                    }
                    else
                    {
                        if (this._customWaitTime > 0 && this._customFadeOut === false)
                        {
                            this._customWaitTime--;
                        }
                        else
                        {
                            if (this._customFadeOut === false)
                            {
                                this._customFadeOut = true;
                                this.startFadeOut(Liquidize.MadeWithMV.FadeOutTime, false);
                            }
                        }
                    }
                }
            }

            if (Liquidize.MadeWithMV.ShowCustom)
            {
                if (Liquidize.MadeWithMV.ShowMV && this._mvFadeOut === true && this._customFadeOut === true)
                {
                    this.gotoTitleOrTest();
                }
                else if (!Liquidize.MadeWithMV.ShowMV && this._customFadeOut === true)
                {
                    this.gotoTitleOrTest();
                }
            }
            else
            {
                if (this._mvFadeOut === true)
                {
                    this.gotoTitleOrTest();
                }
            }

            super.update();
        };
    }
})();