import engine from "engine";
import BasePanel from "../Framework/UI/BasePanel";
import GetAudioMgr, { E_SoundType, SoundInfo } from "../Framework/AudioMgr/AudioMgr";
import GetPanelMgr, { PanelLayer } from "../Framework/UI/PanelMgr";
import ChooseRoundUI from "./ChooseRoundUI";
import TipsUI from "./TipsUI";
import RuleUI from "./RuleUI";
@engine.decorators.serialize("StartChooseUI") 
export default class StartChooseUI extends BasePanel {
    @engine.decorators.property({
        type: engine.TypeNames.String,
    })
    public name: string = "myname";

    public onUpdate(dt) {}
    public onDestroy() {}

    public onShow(): void {
           
    }
    public onHide(): void {
           
    }
    public MyOnClick(name: string): void {
        GetAudioMgr().PlaySound(new SoundInfo("Click", E_SoundType.Effects, "wav", 0));
        if (name == "Begin") {
            GetPanelMgr().ShowPanel<ChooseRoundUI>("Start/ChooseRoundUI", PanelLayer.top, ChooseRoundUI);
        }
        else if (name == "Rule") { 
            GetPanelMgr().ShowPanel<RuleUI>("Start/RuleUI", PanelLayer.sys, RuleUI);
        }
        else if (name == "Tips") {
            GetPanelMgr().ShowPanel<TipsUI>("Gaming/TipsUI", PanelLayer.sys, TipsUI);
        }
    }
    public MyTouchOver(name: string): void {
           
    }
}
