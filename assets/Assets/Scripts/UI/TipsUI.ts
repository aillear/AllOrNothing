import engine from "engine";
import BasePanel from "../Framework/UI/BasePanel";
import GetAudioMgr, { E_SoundType, SoundInfo } from "../Framework/AudioMgr/AudioMgr";
import GetPanelMgr from "../Framework/UI/PanelMgr";
@engine.decorators.serialize("TipsUI")
export default class TipsUI extends BasePanel {
    
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
        if (name == "Close") {
            GetPanelMgr().HidePanel("Gaming/TipsUI");
        }
    }
    public MyTouchOver(name: string): void {
         
    }
}
