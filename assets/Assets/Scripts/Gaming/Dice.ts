import engine from "engine";
import Utility from "../Framework/Uitility";
import GetAtlasMgr from "../Framework/AtlasMgr/AtlasMgr";
import { TouchEventNames } from "!!Only Export Engine Module, Cant Use Internal Module：engine/game/2D/input/TouchInputComponent";
import { TouchPoint } from "!!Only Export Engine Module, Cant Use Internal Module：engine/input/touch";
import { DeepImmutableArray } from "!!Only Export Engine Module, Cant Use Internal Module：engine/type";
import Utils from "../../../ui/common/Utils";
@engine.decorators.serialize("Dice")
export default class Dice extends engine.Script {

    public rotate: boolean = false;         // 是否旋转
    private dest:engine.Vector2;            // 目标位置
    private isArrived: boolean = true;      // 是抵达目标
    
    private speed:number = 1;               // 位移速度
    private _point:number = 5;              // 当前点数-1              
    public sprite:engine.UISprite = null;   // 图片显示器
    public isSelected: boolean = false;
    public selectedSprite:engine.UISprite = null;
    public get point():number { return this._point+1; }

    // 随机产生点数,更换相应图片
    public Cast():void {
        if (this.sprite == null) {
            this.sprite = this.entity.getComponent<engine.UISprite>(engine.UISprite);
        }
        let temp = Utility.RandomInt(0,6);
        console.log(GetAtlasMgr().atlas.getSpriteframeByKey(GetAtlasMgr().diceInfo[temp]));
        this.sprite.spriteFrame = GetAtlasMgr().atlas.getSpriteframeByKey(GetAtlasMgr().diceInfo[temp]);
        this._point = temp;
    }

    public onAwake(): void {
        // 获取当前的图像
        
    }

    public onStart(): void {
        
    }

    public onUpdate(dt) {
        // 移动到对应目标
        if (!this.isArrived){
            this.entity.transform2D.position = this.entity.transform2D.position.lerp(this.dest, dt * this.speed);
            if (this.entity.transform2D.position.equal(this.dest)){
                this.isArrived = true;
            }
        }
        // 控制是否旋转,旋转速度固定
        if (this.rotate) {
            this.entity.transform2D.rotation+=0.2;
        }
    }

    // 设置目标位置
    public SetDest(newDest:engine.Vector2, newspeed:number = 1){
        this.dest = newDest;
        this.speed = newspeed;
        this.isArrived = false;
    }
    public onClick(){
        console.log("onClick");
        this.isSelected = !this.isSelected;
        if (this.selectedSprite == null){ 
            this.selectedSprite = Utils.getChildByName(this.entity, "Selected").getComponent<engine.UISprite>(engine.UISprite);
        }
        this.selectedSprite.visible = this.isSelected;
        
    }
}
