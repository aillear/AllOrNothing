import engine from "engine";
import Utility from "../Framework/Uitility";
@engine.decorators.serialize("Dice")
export default class Dice extends engine.Script {
    @engine.decorators.property({
        type: engine.TypeNames.String,
    })
    public name: string = "myname";

    private dest:engine.Vector2;
    private isArrived: boolean = true;
    private speed:number = 1;
    private _point:number = 5;
    private sprite:engine.UISprite = null;
    public get point():number { return this._point+1; }
    public Cast():void {
        this._point = Utility.RandomInt(0,6);
        
    }

    public onStart(): void {
        // 获取当前的图像
        this.sprite = this.entity.getComponent<engine.UISprite>(engine.UISprite);
    }

    public onAwake() {}
    public onUpdate(dt) {
        if (!this.isArrived){
            this.entity.transform2D.position = this.entity.transform2D.position.lerp(this.dest, dt * this.speed);
            if (this.entity.transform2D.position.equal(this.dest)){
                this.isArrived = true;
            }
        }
    }
    public onDestroy() {}

    public SetDest(newDest:engine.Vector2, newspeed:number = 1){
        this.dest = newDest;
        this.speed = newspeed;
        this.isArrived = false;
    }


}
