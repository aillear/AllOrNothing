import engine from "engine";
import BasePanel from "../Framework/UI/BasePanel";
import GetEventCenter, { E_EventName } from "../Framework/EventCenter/EventCenter";
import { State } from "../Gaming/Gaming";
import GetPanelMgr from "../Framework/UI/PanelMgr";
import GetAudioMgr, { E_SoundType, SoundInfo } from "../Framework/AudioMgr/AudioMgr";
@engine.decorators.serialize("CheckDiceUI")
export default class CheckDiceUI extends BasePanel {
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
        if (name == "Selected") {
            
            GetEventCenter().EventTrigger(E_EventName.SelfSelectDiceOver);
            //GetEventCenter().EventTrigger1<State>(E_EventName.ChangeState, State.ChooseOver);
        }
        GetPanelMgr().HidePanel("Gaming/CheckDiceUI");  // 隐藏自己
    }
    public MyTouchOver(name: string): void {
    }
}
