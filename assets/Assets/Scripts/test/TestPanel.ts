import engine from "engine";
import BasePanel from "../Framework/UI/BasePanel";
import GetPanelMgr from "../Framework/UI/PanelMgr";
import GetAudioMgr, { E_SoundType, SoundInfo } from "../Framework/AudioMgr/AudioMgr";
@engine.decorators.serialize("TestPanel")
export default class TestPanel extends BasePanel {
    @engine.decorators.property({
        type: engine.TypeNames.String,
    })
    private temp: engine.Atlas;
    private icon: engine.UISprite;
    private index: number;
    spriteInfo: string[];
    public onAwake() {}
    public onUpdate(dt) {}
    public onDestroy() {}

    public MyOnClick(name: string): void {
        if (name == "btn1"){
            console.log("click 1 show sprite");
            this.spriteInfo = [
                "Assets/Arts/Basic/1.png",
                "Assets/Arts/Basic/2.png",
                "Assets/Arts/Basic/3.png",
                "Assets/Arts/Basic/4.png",
                "Assets/Arts/Basic/5.png",
                "Assets/Arts/Basic/6.png"
            ]
            this.AltasTest();
        } 
        else if (name == "btn2"){
            console.log("click 2 add sprite index");
            this.index++;
            if (this.index >= 6) this.index = 0;
            this.icon.spriteFrame = this.temp.getSpriteframeByKey(this.spriteInfo[this.index]);   
        }
        else if (name == "btn3"){
            console.log("click 3 sub sprite index");
            this.index--;
            if (this.index < 0) this.index = 5;
            this.icon.spriteFrame = this.temp.getSpriteframeByKey(this.spriteInfo[this.index]);   
        }
    }
    public onShow(): void {
        
    }
    public onHide(): void {
        
    }

    private AltasTest(){
        engine.loader.load<engine.Atlas>("Assets/Arts/basic.atlaspac").promise.then((atals)=>{
            this.temp = atals;
            console.log(this.temp.spriteframes);
            this.icon = this.GetControl<engine.UISprite>("icon", engine.UISprite); 
            this.index = 0;
            this.icon.spriteFrame = this.temp.getSpriteframeByKey(this.spriteInfo[this.index]);   
        })
    }
}






