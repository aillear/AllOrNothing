import engine from "engine";
import BasePanel from "../Framework/UI/BasePanel";
import GetAudioMgr, { E_SoundType, SoundInfo } from "../Framework/AudioMgr/AudioMgr";
import GetPanelMgr from "../Framework/UI/PanelMgr";
import GetDataKeeper from "../Framework/DataKeeper/DataKeeper";
@engine.decorators.serialize("OtherRateUI")
export default class OtherRateUI extends BasePanel {
    @engine.decorators.property({
        type: engine.TypeNames.String,
    })
    public name: string = "myname";

    public onUpdate(dt) {}
    public onDestroy() {}
    public onShow(): void {
        this.GetControl<engine.UILabel>("Info", engine.UILabel).text = "对方添加倍率: " + GetDataKeeper().GetData("OtherRate").toString();
        setTimeout(() => {
            GetPanelMgr().HidePanel("Gaming/OtherRateUI");
        }, 1000);
    }
    public onHide(): void {}
    public MyOnClick(name: string): void {}
    public MyTouchOver(name: string): void {}
}
