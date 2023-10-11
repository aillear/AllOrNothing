import engine from "engine";
import BasePanel from "../Framework/UI/BasePanel";
import GetEventCenter, { E_EventName } from "../Framework/EventCenter/EventCenter";
import GetPanelMgr from "../Framework/UI/PanelMgr";
@engine.decorators.serialize("ChooseRateUI")
export default class ChooseRateUI extends BasePanel {
    @engine.decorators.property({
        type: engine.TypeNames.String,
    })
    public name: string = "myname";

    public onUpdate(dt) {}
    public onDestroy() {}
    public onShow(): void {}
    public onHide(): void {}
    public MyOnClick(name: string): void {
        let rate:number = 0;
        if (name == "Rate0"){
            rate = 0;
        }
        else if (name == "Rate1"){
            rate = 1;
        }
        else if (name == "Rate2"){
            rate = 2;
        }
        else if (name == "Rate3"){
            rate = 3;
        }
        GetEventCenter().EventTrigger1<number>(E_EventName.SelfSelectRateOver, rate);
        GetPanelMgr().HidePanel("Gaming/ChooseRateUI");
    }
    public MyTouchOver(name: string): void {}
}
