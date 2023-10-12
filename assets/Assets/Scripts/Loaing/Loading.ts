import engine from "engine";
import GetEventCenter, { E_EventName } from "../Framework/EventCenter/EventCenter";
import GetPanelMgr, { PanelLayer } from "../Framework/UI/PanelMgr";
import StartChooseUI from "../UI/StartChooseUI";
import ChooseRoundUI from "../UI/ChooseRoundUI";
import RuleUI from "../UI/RuleUI";
import TipsUI from "../UI/TipsUI";
import BasicGamingUI from "../UI/BasicGamingUI";
import CheckDiceUI from "../UI/CheckDiceUI";
import ChooseRateUI from "../UI/ChooseRateUI";
import JettonChangeUI from "../UI/JettonChangeUI";
import AccountUI from "../UI/AccountUI";
import SettingsUI from "../UI/SettingsUI";
import LoadingUI from "../UI/LoadingUI";
@engine.decorators.serialize("Loading")
export default class Loading extends engine.Script {
    @engine.decorators.property({
        type: engine.TypeNames.String,
    })
    public name: string = "myname";

    public onAwake() {
        console.log("loading gaming...");
        GetEventCenter().AddEventListener(E_EventName.LoadOver, () => {
            console.log("load game over! switch to Start scene");
            engine.loader.load<engine.Scene>("Assets/Scenes/Start.scene").promise.then((scene)=>{
                engine.game.playScene(scene);
            });
        });


        engine.loader.load<engine.Prefab>("Assets/Prefabs/UI/Canvas.prefab", {
            cacheable: true
        }).promise.then((prefab) => {
            engine.loader.load<engine.Atlas>("Assets/Arts/basic.atlaspac", {
                cacheable: true
            }).promise.then((atlas) => {
                engine.loader.load<engine.Atlas>("Assets/Arts/big.atlaspac", {
                    cacheable: true
                }).promise.then((atlas) => {
                    GetPanelMgr().ShowPanel<LoadingUI>("Gaming/LoadingUI", PanelLayer.sys, LoadingUI);
                    GetPanelMgr().ShowPanel<StartChooseUI>("Start/StartChooseUI", PanelLayer.bot, StartChooseUI);
                    GetPanelMgr().ShowPanel<ChooseRoundUI>("Start/ChooseRoundUI", PanelLayer.bot, ChooseRoundUI);
                    GetPanelMgr().ShowPanel<RuleUI>("Start/RuleUI", PanelLayer.bot, RuleUI);
                    GetPanelMgr().ShowPanel<TipsUI>("Gaming/TipsUI", PanelLayer.bot, TipsUI);
                    GetPanelMgr().ShowPanel<BasicGamingUI>("Gaming/BasicGamingUI", PanelLayer.bot, BasicGamingUI);  
                    GetPanelMgr().ShowPanel<CheckDiceUI>("Gaming/CheckDiceUI", PanelLayer.bot, CheckDiceUI);
                    GetPanelMgr().ShowPanel<ChooseRateUI>("Gaming/ChooseRateUI", PanelLayer.bot, ChooseRateUI);
                    GetPanelMgr().ShowPanel<JettonChangeUI>("Gaming/JettonChangeUI", PanelLayer.bot, JettonChangeUI);
                    GetPanelMgr().ShowPanel<AccountUI>("Gaming/AccountUI",PanelLayer.bot, AccountUI);
                    GetPanelMgr().ShowPanel<SettingsUI>("Gaming/SettingsUI", PanelLayer.bot, SettingsUI);

                    setTimeout(()=>{
                        GetPanelMgr().HideAllPanel();
                        GetEventCenter().EventTrigger(E_EventName.LoadOver);
                    }, 100);
                });
            });
        });
    }
}
