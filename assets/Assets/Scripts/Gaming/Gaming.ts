import engine from "engine";
import GetEventCenter, {
    E_EventName,
} from "../Framework/EventCenter/EventCenter";
import GetPanelMgr, { PanelLayer } from "../Framework/UI/PanelMgr";
import BasicGamingUI from "../UI/BasicGamingUI";
import Dice from "./Dice";
import Utils from "../../../ui/common/Utils";

enum State {
    None, // 无状态
    FirstState, // 表示刚刚进入游戏场景
    Choose, // 选择骰子
    Rate, // 选择倍率
    Score, // 显示分数,结算轮次
    Over, // 结束游戏
    Stop, // 停止游戏
}

@engine.decorators.serialize("Gaming")
export default class Gaming extends engine.Script {
    private state: State = State.None;
    public get State(): State {
        return this.state;
    }

    private currentRound: number = 1;
    private currentInning: number = 1;
    private currentRate = 0;

    private Sdice: Dice[] = [];
    private Odice: Dice[] = [];

    private ScheckPos: engine.Vector2[] = [];
    private OcheckPos: engine.Vector2[] = [];

    private SunCheckPos: engine.Vector2[] = [];
    private OunCheckPos: engine.Vector2[] = [];

    private SelfcheckedDice: boolean[] = [];
    private OthercheckedDice: boolean[] = [];

    public onAwake() {
        this.state = State.None;
        GetEventCenter().AddEventListener1<State>(
            E_EventName.ChangeState,
            (state)=>{this.ChangeState(state);}
        );
        GetPanelMgr().ShowPanel<BasicGamingUI>(
            "Gaming/BasicGamingUI",
            PanelLayer.bot,
            BasicGamingUI
        );
        for (let i = 0; i < 5; i++) {
            this.Sdice[i] = Utils.getChildByName(this.entity, "Sdice"+i.toString()).getComponent(Dice);
            this.Odice[i] = Utils.getChildByName(this.entity, "Odice"+i.toString()).getComponent(Dice);
            
            this.ScheckPos[i] = Utils.getChildByName(this.entity, "SelfPos"+i.toString()).transform2D.position;
            this.OcheckPos[i] = Utils.getChildByName(this.entity, "OtherPos"+i.toString()).transform2D.position;

            this.SunCheckPos[i] = Utils.getChildByName(this.entity, "USelfPos"+i.toString()).transform2D.position;
            this.OunCheckPos[i] = Utils.getChildByName(this.entity, "UOtherPos"+i.toString()).transform2D.position;
        }

        GetEventCenter().EventTrigger1<State>(E_EventName.ChangeState, State.FirstState); // 修改自己的状态到 FirstState
    }

    public onUpdate(dt) {}
    public onDestroy() {}

    // 变更游戏状态,在此处理相关逻辑
    private ChangeState(state1: State) {
        if (this.state == state1) return;
        this.state = state1;

        if (state1 == State.FirstState) {
            console.log(this.Sdice[0]);
            for(let i = 0; i < 5; i++){
                this.Sdice[i].Cast();
                this.Odice[i].Cast();
                this.Sdice[i].SetDest(this.SunCheckPos[i], 5);
                this.Odice[i].SetDest(this.OunCheckPos[i], 5);
                // this.Sdice[i].SetDest(this.ScheckPos[i], 5);
                // this.Odice[i].SetDest(this.OcheckPos[i], 5);
                
            }
        } 
        else if (state1 == State.Choose) {
        } else if (state1 == State.Rate) {
        } else if (state1 == State.Score) {
        } else if (state1 == State.Over) {
        } else if (state1 == State.Stop) {
        } else return;
    }
}
