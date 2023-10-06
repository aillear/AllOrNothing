import engine from "engine";
import BasePanel from "../Framework/UI/BasePanel";
import GetPanelMgr from "../Framework/UI/PanelMgr";
import GetAudioMgr, { E_SoundType, SoundInfo } from "../Framework/AudioMgr/AudioMgr";
@engine.decorators.serialize("TestPanel")
export default class TestPanel extends BasePanel {
    @engine.decorators.property({
        type: engine.TypeNames.String,
    })

    private temp: engine.AudioSource;
    public onAwake() {}
    public onUpdate(dt) {}
    public onDestroy() {}

    public MyOnClick(name: string): void {
        if (name == "btn1"){
            console.log("click 1");
            let info = new SoundInfo("PlankDestroy", E_SoundType.Test, "wav");
            GetAudioMgr().PlaySound(info, (source)=>{
                this.temp = source;
            });
        } 
        else if (name == "btn2"){
            console.log("click 2");
            GetAudioMgr().StopSound(E_SoundType.Test, this.temp)
        }
        else if (name == "btn3"){
            GetPanelMgr().HidePanel("TestPanel");
        }
    }
    public onShow(): void {
        
    }
    public onHide(): void {
        
    }
}
