import engine from "engine";
import BasePanel from "../Framework/UI/BasePanel";
import GetEventCenter, { E_EventName } from "../Framework/EventCenter/EventCenter";
import Utility from "../Framework/Uitility";
import Utils from "../../../ui/common/Utils";
import GetAudioMgr, { E_SoundType, SoundInfo } from "../Framework/AudioMgr/AudioMgr";
import GetPanelMgr, { PanelLayer } from "../Framework/UI/PanelMgr";
import TipsUI from "./TipsUI";
import SettingsUI from "./SettingsUI";
import GetDataKeeper, { DataKeeper } from "../Framework/DataKeeper/DataKeeper";
@engine.decorators.serialize("BasicGamingUI")
export default class BasicGamingUI extends BasePanel {
    @engine.decorators.property({
        type: engine.TypeNames.String,
    })
    public name: string = "myname";
    private selfJettonNumber: engine.UIRichText;
    private otherJettonNumber: engine.UIRichText;
    private rateNumber: engine.UIRichText;
    private roundNumber: engine.UIRichText;
    private inningNumber: engine.UIRichText;
    public onAwake(): void {
        super.onAwake(); 
        this.selfJettonNumber = this.GetControl<engine.UIRichText>("SelfJettonNumber", engine.UIRichText);
        this.otherJettonNumber = this.GetControl<engine.UIRichText>("OtherJettonNumber", engine.UIRichText);
        this.rateNumber = this.GetControl<engine.UIRichText>("RateNumber", engine.UIRichText);
        this.roundNumber = this.GetControl<engine.UIRichText>("RoundInfo", engine.UIRichText);
        this.inningNumber = this.GetControl<engine.UIRichText>("InningInfo", engine.UIRichText);
    }
    public onStart(): void {
    }
    public onUpdate(dt) {}
    public onDestroy() {}
    public onShow(): void {

        // 监听筹码改变事件.
        GetEventCenter().AddEventListener1<number>(E_EventName.SelfJettonChange, (number) => {
            this.selfJettonNumber.text = "己方: " + number.toString();
        });
        GetEventCenter().AddEventListener1<number>(E_EventName.OtherJettonChange, (number) => {
            this.otherJettonNumber.text = "对方: " + number.toString();
        });
        GetEventCenter().AddEventListener1<number>(E_EventName.RateChange, (number) => {
            this.rateNumber.text = number.toString();
        });
        GetEventCenter().AddEventListener1<number>(E_EventName.RoundChange, (number) => {
            this.roundNumber.text = "当前轮数: " + number.toString() + "/3";
        });
        GetEventCenter().AddEventListener1<number>(E_EventName.InningChange, (number) => {
            this.inningNumber.text = "当前局数: " + number.toString() + "/" + GetDataKeeper().GetData("MaxInnings").toString();
        });
        //this.returnText = Utils.getChildByName(this.entity, "ReturnText").transform2D;
        //this.tipsText = Utils.getChildByName(this.entity, "TipsText").transform2D;
    }
    public onHide(): void {
        // 清除事件
        let events: E_EventName[] = [E_EventName.SelfJettonChange, E_EventName.OtherJettonChange, E_EventName.RateChange, E_EventName.RoundChange, E_EventName.InningChange];
        for (let event of events) {
            GetEventCenter().ClearEvent1(event);
        }
    }

    public MyOnClick(name: string): void {
        GetAudioMgr().PlaySound(new SoundInfo("Click", E_SoundType.Effects, "wav", 0));
        if (name == "Setting") {
            GetPanelMgr().ShowPanel<SettingsUI>("Gaming/SettingsUI", PanelLayer.sys, SettingsUI);
        }
        else if (name == "Tips"){
            GetPanelMgr().ShowPanel<TipsUI>("Gaming/TipsUI", PanelLayer.sys, TipsUI);
        }

    }

    public MyTouchOver(name: string): void { 
    }
}
