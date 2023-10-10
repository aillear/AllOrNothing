import engine from "engine";
import BasePanel from "../Framework/UI/BasePanel";
import Dice from "../Gaming/Dice";
@engine.decorators.serialize("StartPanel")
export default class StartPanel extends BasePanel {
    @engine.decorators.property({
        type: engine.TypeNames.String,
    })
    public name: string = "myname";
    private toDestination: boolean = false;
    private startRotate: boolean = false;
    private dice:Dice = null;
    private atlas: engine.Atlas = null;
    private spriteInfo = [
        "Assets/Arts/Basic/1.png",
        "Assets/Arts/Basic/2.png",
        "Assets/Arts/Basic/3.png",
        "Assets/Arts/Basic/4.png",
        "Assets/Arts/Basic/5.png",
        "Assets/Arts/Basic/6.png",
    ];
    private index:number = 0;

    public onUpdate(dt) {}
    public onDestroy() {}

    public onStart(): void {
        super.onStart();
        engine.loader.load<engine.Atlas>("Assets/Arts/basic.atlaspac").promise.then((atlas)=>{
            this.atlas = atlas;
        })
        console.log("123123");
    }
    public onShow(): void {
    }   
    public onHide(): void {}
    public MyOnClick(name: string): void {
        if (this.dice == null) {
            this.dice = this.GetControl<engine.UISprite>("dice", engine.UISprite).entity.getComponent<Dice>(Dice);
        }
        if (name == "btn1") {
            console.log("click 1 show sprite");
            // 取反切换目的地
            this.toDestination =!this.toDestination;
            this.dice.SetDest(!this.toDestination? new engine.Vector2().setValue(-400, 800) : new engine.Vector2().setValue(400, -400), 5);

        }
        else if (name == "btn2") {
            setTimeout(() => {
                this.toDestination =!this.toDestination;
                this.dice.rotate = this.toDestination;
            }, 3000)
        }
        else if (name == "btn3") {
            this.index ++;
            if (this.index >= 6) this.index = 0;
            this.dice.sprite.spriteFrame = this.atlas.getSpriteframeByKey(this.spriteInfo[this.index]);
        }
    }

    public MyTouchOver(name: string): void {
        
    }
}
