import engine from "engine";
import BasePanel from "../Framework/UI/BasePanel";
import GetDataKeeper from "../Framework/DataKeeper/DataKeeper";
import Utils from "../../../ui/common/Utils";
import GetEventCenter, { E_EventName } from "../Framework/EventCenter/EventCenter";
import GetPanelMgr from "../Framework/UI/PanelMgr";
@engine.decorators.serialize("AccountUI")
export default class AccountUI extends BasePanel {
    @engine.decorators.property({
        type: engine.TypeNames.String,
    })
    public name: string = "myname";

    public onUpdate(dt) {}
    public onDestroy() {}

    public onShow(): void {
        if (GetDataKeeper().GetData("NextOrOver") == "Next") {
            Utils.getChildByName(this.entity, "GameOver").active = false;
        }
        else if (GetDataKeeper().GetData("NextOrOver") == "Over") {
            Utils.getChildByName(this.entity, "NextInning").active = false;
            let info = GetDataKeeper().GetData("GameResult")?"你获胜了!":"你失败了";
            this.GetControl<engine.UILabel>("OverInfo", engine.UILabel).text = info
        }
    }
    public onHide(): void {}
    public MyOnClick(name: string): void {
        if (name == "ConfirmNext") {
            GetEventCenter().EventTrigger1<boolean>(E_EventName.SelfAccountConfirmOver, false);
        }
        else if (name == "ConfirmOver"){
            GetEventCenter().EventTrigger1<boolean>(E_EventName.SelfAccountConfirmOver, true);
        }
        GetPanelMgr().HidePanel("Gaming/AccountUI");
    }
    public MyTouchOver(name: string): void {}
}
