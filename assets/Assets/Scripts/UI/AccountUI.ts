import engine from "engine";
import BasePanel from "../Framework/UI/BasePanel";
import GetDataKeeper from "../Framework/DataKeeper/DataKeeper";
import Utils from "../../../ui/common/Utils";
import GetEventCenter, { E_EventName } from "../Framework/EventCenter/EventCenter";
import GetPanelMgr from "../Framework/UI/PanelMgr";
import GetAudioMgr, { E_SoundType, SoundInfo } from "../Framework/AudioMgr/AudioMgr";
@engine.decorators.serialize("AccountUI")
export default class AccountUI extends BasePanel {
    @engine.decorators.property({
        type: engine.TypeNames.String,
    })
    public name: string = "myname";

    public onUpdate(dt) {}
    public onDestroy() {}

    public onShow(): void {
        let info = GetDataKeeper().GetData("GameResult")?"你获胜了!":"你失败了";
        this.GetControl<engine.UILabel>("OverInfo", engine.UILabel).text = info
    }
    public onHide(): void {}
    public MyOnClick(name: string): void {
        GetAudioMgr().PlaySound(new SoundInfo("Click", E_SoundType.Effects, "wav", 0));
        if (name == "Again") {
            GetEventCenter().EventTrigger1<string>(E_EventName.SelfAccountConfirmOver, "agree");
        }
        else if (name == "MainMenu") {
            GetEventCenter().EventTrigger1<string>(E_EventName.SelfAccountConfirmOver, "disagree");
        }
        GetPanelMgr().HidePanel("Gaming/AccountUI");
    }
    public MyTouchOver(name: string): void {}
}
