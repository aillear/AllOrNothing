import engine from "engine";
import { SAction, SAction1 } from "../Framework/Delegate/Delegate";

export default function GetAIController(){
    return AIController.GetInstance();
}


export class AIController {
    private static instance: AIController;

    private selected: number[] = [];        // 当前选择的点数
    private currentJetton: number = 1000;   // 当前的筹码数  


    private constructor() {
        this.selected = [];
        this.currentJetton = 1000;
    }

    public Reset(): void {
        this.selected = [];
        this.currentJetton = 1000;
    }

    public static GetInstance(): AIController {
        if (!this.instance) {
            this.instance = new AIController();
        }
        return this.instance;
    }

    // points: 点数, indexs:对应的索引
    public SelectDice(points: number[], indexs: number[], callback:SAction1<any> = null): void {
        // 用这个存储选择的骰子的索引
        let selectedIndexs: number[] = [];

        /* 
        handle your logic here
        记得保存选定的点数
        */


        // 执行回调通知
        if (callback != null) {
            callback(selectedIndexs);
        }
    }

    // points: 对手的点数
    public SelectRate(points: number[], callback:SAction1<any> = null) : void {
        // 用这个选择倍率,确保结果为0~3
        let Rate: number = 0;

        /* 
        handle your logic here
        */

        if (callback!= null){
            callback(Rate);
        }
    }

    // changed: 本次改变的筹码数 current: 当前的筹码数
    public JettonChange(changed: number, current: number, callback: SAction = null): void {
        this.currentJetton = current;

        if (callback != null){
            callback();
        }
    }

    // 确认结果
    public ShowResult(isWinner: boolean, callback: SAction = null): void {


        if (callback != null){
            callback();
        }
    }

}
