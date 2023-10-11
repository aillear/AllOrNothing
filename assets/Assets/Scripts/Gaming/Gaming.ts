import engine from "engine";
import GetEventCenter, {
    E_EventName, EventCenter,
} from "../Framework/EventCenter/EventCenter";
import GetPanelMgr, { PanelLayer } from "../Framework/UI/PanelMgr";
import BasicGamingUI from "../UI/BasicGamingUI";
import Dice from "./Dice";
import Utils from "../../../ui/common/Utils";
import CheckDiceUI from "../UI/CheckDiceUI";
import GetAIController from "../Controller/AIController";
import ChooseRateUI from "../UI/ChooseRateUI";
import { ScoreCalculator } from "../Controller/ScoreCalculator";
import JettonChangeUI from "../UI/JettonChangeUI";
import GetDataKeeper from "../Framework/DataKeeper/DataKeeper";
import AccountUI from "../UI/AccountUI";


export enum State {
    None, // 无状态
    NewGame, //  准备开始游戏阶段
    FirstState, // 表示第一个场景
    ChooseOver, // 选择完骰子
    Rate, // 选择倍率
    Score, // 显示分数
    Account, // 结算本局
    Over, // 结束游戏
    Stop, // 停止游戏
}

@engine.decorators.serialize("Gaming")
export default class Gaming extends engine.Script {
    private state: State = State.None;
    public get State(): State {
        return this.state;
    }
    public maxInning: number = 3
    
    private currentRound: number = 0;   // 当前回合
    private currentInning: number = 1;  // 当前局
    private currentRate = 0;            // 当前倍率
    

    private selfJetton: number = 1000;
    private otherJetton: number = 1000;

    private sDone: boolean = false;     // 玩家是否完成回合
    private oDone: boolean = false;     // 控制器是否完成回合

    private SAgree: string = "unknow";    // 玩家是否同意继续游戏, unknow 为未选定, agree 为同意, disagree为不同意
    private OAgree: string = "unknow";    // 控制器是否同意继续游戏

    private Sdice: Dice[] = [];         // 玩家骰子
    private Odice: Dice[] = [];         // 控制器骰子

    private ScheckPos: engine.Vector2[] = [];       // 玩家选定位置列表
    private OcheckPos: engine.Vector2[] = [];       // 控制器选定位置列表


    private SunCheckPos: engine.Vector2[] = [];     // 玩家未选定位置列表
    private OunCheckPos: engine.Vector2[] = [];     // 控制器未选定位置列表

    private SCheckPosIndex: number = 0;     // 当前玩家保存栏空位
    private OCheckPosIndex: number = 0;     // 当前控制器保存栏空位

    public onAwake() {
        this.state = State.None;
        GetEventCenter().AddEventListener1<State>(E_EventName.ChangeState, (state)=>{ this.ChangeState(state); });       // 监听改变游戏状态事件
        GetEventCenter().AddEventListener(E_EventName.SelfSelectDiceOver, ()=>{ this.SelfSelectDiceOver(); });        // 监听玩家选择骰子完毕事件
        GetEventCenter().AddEventListener1<number>(E_EventName.SelfSelectRateOver, (rate)=>{ this.SelfSelectRateOver(rate); });  // 监听玩家选择倍率完毕事件
        GetEventCenter().AddEventListener(E_EventName.SelfConfirmJettonOver, ()=>{ this.SelfConfirmJettonOver(); });  // 监听玩家检查筹码变动完成
        GetEventCenter().AddEventListener1<string>(E_EventName.SelfAccountConfirmOver, (isAgree)=>{ this.SelfAccountConfirmOver(isAgree); }); //监听玩家AccountUI确认

        GetPanelMgr().ShowPanel<BasicGamingUI>("Gaming/BasicGamingUI", PanelLayer.bot, BasicGamingUI);                  // 显示基础面板

        // 读取相关组件
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

    public Reset(): void {
        this.currentRound = 0;
        this.currentRate = 0;
        this.SCheckPosIndex = 0;
        this.OCheckPosIndex = 0;
        GetEventCenter().EventTrigger1<number>(E_EventName.SelfJettonChange, this.selfJetton);
        GetEventCenter().EventTrigger1<number>(E_EventName.OtherJettonChange, this.otherJetton);
        GetEventCenter().EventTrigger1<number>(E_EventName.RateChange, this.currentRate);
        for (let i = 0; i < 5; i++){
            this.Sdice[i].Reset();
            this.Odice[i].Reset();
        }
    }

    public onUpdate(dt) {}
    public onDestroy() {}

    // 变更游戏状态,在此处理相关逻辑
    private ChangeState(state1: State) {
        if (this.state == state1) return;
        this.state = state1;


        if (state1 == State.NewGame) {
            // 初始化
            this.Reset();
            this.SAgree = "unknown";
            this.OAgree = "unknown";
            this.selfJetton = 1000;
            this.otherJetton = 1000;
            this.currentInning = 1;
            // 通知控制器进行新的游戏
            GetAIController().StartNewGame();
            // 切换游戏阶段
            GetEventCenter().EventTrigger1<State>(E_EventName.ChangeState, State.FirstState);
        }

        else if (state1 == State.FirstState) {
            // 改变当前回合
            this.currentRound++;
            GetEventCenter().EventTrigger1<number>(E_EventName.RoundChange, this.currentRound);   // 改变显示的回合

            // 投当前的未选择的骰子
            for(let i = 0; i < 5; i++){
                if (!this.Sdice[i].isMoved) {
                    // 移动逻辑
                    this.Sdice[i].Cast();
                    this.Sdice[i].SetDest(this.SunCheckPos[i], 5);
                }
                if (!this.Odice[i].isMoved) {
                    this.Odice[i].Cast();
                    this.Odice[i].SetDest(this.OunCheckPos[i], 5);
                }  
            }

            // 生成供controller决策的新骰子列表
            let newPoints: number[] = [];
            let indexs: number[] = [];
            for (let i = 0; i < 5; i++){
                if (this.Odice[i].isMoved) continue;
                    
                newPoints.push(this.Odice[i].point);
                indexs.push(i);
            }

            GetAIController().SelectDice(newPoints, indexs, (selectIndex:number[])=>{
                for (let i = 0; i < selectIndex.length; i++) {
                    this.Odice[selectIndex[i]].isSelected = true;
                    this.Odice[selectIndex[i]].SetDest(this.OcheckPos[this.OCheckPosIndex++], 5);
                    this.Odice[selectIndex[i]].isMoved = true;  // 设定被选择移动到骰子栏里
                }
                this.oDone = true;     // 控制器完成选骰子操作
                this.CheckDone(State.Rate);
            });

            // 展示新面板
            GetPanelMgr().ShowPanel<CheckDiceUI>("Gaming/CheckDiceUI", PanelLayer.bot, CheckDiceUI);
        } 

        else if (state1 == State.Rate) {
            // 获取self的确定的骰子, 供controller决策
            let selfPoints: number[] = [];
            for (let i = 0; i < 5; i++) {
                if (!this.Sdice[i].isMoved) continue;
                selfPoints.push(this.Sdice[i].point);
            }

            // 控制器进行决策
            GetAIController().SelectRate(selfPoints, this.currentRate, 3-this.currentRound, (rate: number) =>{
                this.currentRate += rate;
                GetEventCenter().EventTrigger1<number>(E_EventName.RateChange, this.currentRate);   // 改变显示的倍率
                this.oDone = true;
                // 如果当前为第三回合则直接跳转计分阶段,如果不为第三回合则跳转选择阶段
                if (this.currentRound < 3) this.CheckDone(State.FirstState);
                else this.CheckDone(State.Score);
            });

            // 展示新面板, 供玩家决策
            GetPanelMgr().ShowPanel<ChooseRateUI>("Gaming/ChooseRateUI", PanelLayer.top, ChooseRateUI);
        } 

        else if (state1 == State.Score) {
            // 把骰子归位
            for (let i = 0; i < 5; i++){
                if (!this.Odice[i].isMoved) {
                    this.Odice[i].isMoved = true;
                    this.Odice[i].SetDest(this.OcheckPos[this.OCheckPosIndex++], 5);
                }
                if (!this.Sdice[i].isMoved) {
                    this.Sdice[i].isMoved = true;
                    this.Sdice[i].SetDest(this.ScheckPos[this.SCheckPosIndex++], 5);
                }
            }

            let Cal = new ScoreCalculator();
            let SPoints: number[] = [];
            let OPoints: number[] = [];
            for (let i = 0; i  < 5; i++) {
                SPoints.push(this.Sdice[i].point);
                OPoints.push(this.Odice[i].point);
            }
            let Sscore = Cal.GetScore(SPoints);
            let Oscore = Cal.GetScore(OPoints);
            let dScore = Math.abs(Sscore - Oscore) * this.currentRate;
            let sign = 1;
            if (Sscore > Oscore){
                this.selfJetton += dScore;
                this.otherJetton -= dScore;
            }
            else {
                this.selfJetton -= dScore;
                this.otherJetton += dScore
                sign = -1;
            }  
            // 更新筹码数量
            GetEventCenter().EventTrigger1<number>(E_EventName.SelfJettonChange, this.selfJetton);
            GetEventCenter().EventTrigger1<number>(E_EventName.OtherJettonChange, this.otherJetton);

            // 给JettonChangeUI它想要的消息
            GetEventCenter().AddEventListener(E_EventName.JettonChangeUI, ()=>{
                GetEventCenter().EventTrigger1<number[]>(E_EventName.JettonChangeUI, [dScore*sign, Sscore, Oscore]);
            })

            GetAIController().JettonChange(dScore, this.otherJetton, ()=>{
                this.oDone = true;
                this.CheckDone(State.Account);
            });

            // 添加新面板,展示变化
            GetPanelMgr().ShowPanel<JettonChangeUI>("Gaming/JettonChangeUI", PanelLayer.top, JettonChangeUI);
        } 

        else if (state1 == State.Account) {
            // 如果有人没筹码了 或者游戏轮完了,结束了
            if (this.selfJetton == 0 || this.otherJetton == 0 || this.currentInning == this.maxInning) {
                let winner:boolean = (this.selfJetton > this.otherJetton);
                if (this.selfJetton == this.otherJetton) {winner = null;}   // 平局?

                // 通知控制器本次游戏是否胜利
                GetAIController().ShowResult((winner==null)?null:!winner);

                // TODO: 玩家显示是否获胜. 传递信息给Account UI面板
                GetDataKeeper().SetData("NextOrOver", "Over");
                GetDataKeeper().SetData("GameResult", winner);

                GetAIController().AgreeNewGame((agree)=>{
                    this.OAgree = agree;
                    this.CheckAgreeNewGame();
                })

                // 展示面板
                GetPanelMgr().ShowPanel<AccountUI>("Gaming/AccountUI",PanelLayer.top, AccountUI);
            }
            // 游戏继续
            else {
                this.currentInning++;
                GetEventCenter().EventTrigger1<number>(E_EventName.InningChange, this.currentInning);
                this.Reset(); // 重置游戏
                GetAIController().NextInning(() => {
                    this.oDone = true;
                    this.CheckDone(State.FirstState);
                })
                this.sDone = true;
                this.CheckDone(State.FirstState);
            }
            
        }

        else if (state1 == State.Over) {
            // 直接返回主界面
        }

        else if (state1 == State.Stop) {
        } 
        else return;
    }
    
    // 检查两方是否结束操作,若结束则跳转到指定阶段
    public CheckDone(targetState: State): void {
        if (!this.sDone || !this.oDone) return;

        this.sDone = false;
        this.oDone = false;
        GetEventCenter().EventTrigger1<State>(E_EventName.ChangeState, targetState);
    }

    public CheckAgreeNewGame(): void {
        if (this.SAgree == "disagree" || this.OAgree == "disagree") {
            GetEventCenter().EventTrigger1<State>(E_EventName.ChangeState, State.Over);
            return;
        }
        if (this.SAgree == "unknown" || this.OAgree == "unknown") return;
        
        // 都同意进入下一把
        if (this.SAgree == "agree" && this.OAgree == "agree") {
            GetEventCenter().EventTrigger1<State>(E_EventName.ChangeState, State.NewGame);
        }
    }

    // 玩家选择骰子完成
    public SelfSelectDiceOver(): void {
        for (let i = 0; i < 5; i++)  {
            if (this.Sdice[i].isSelected && !this.Sdice[i].isMoved) {
                this.Sdice[i].SetDest(this.ScheckPos[this.SCheckPosIndex++], 5);
                this.Sdice[i].isMoved = true;
                this.Sdice[i].SetSelectedCircle(false);
            }
        }
        this.sDone = true;
        this.CheckDone(State.Rate);
    }

    // 玩家选择倍率完成
    public SelfSelectRateOver(rate: number): void {
        this.currentRate += rate;
        GetEventCenter().EventTrigger1<number>(E_EventName.RateChange, this.currentRate);   // 改变显示的倍率
        this.sDone = true;
        // 如果当前为第三回合则直接跳转计分阶段,如果不为第三回合则跳转选择阶段
        if (this.currentRound < 3) this.CheckDone(State.FirstState);
        else this.CheckDone(State.Score);
    }

    // 玩家确认筹码变动完成
    public SelfConfirmJettonOver(): void {
        this.sDone = true;
        this.CheckDone(State.Account);
    }

    // 玩家确认AccoutUI界面
    public SelfAccountConfirmOver(isAgree: string): void {
        this.SAgree = isAgree;
        // TODO: 展示等待界面==>ShowPanel(
        this.CheckAgreeNewGame();
    }
}
