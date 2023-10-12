import engine from "engine";
import { SAction, SAction1 } from "../Framework/Delegate/Delegate";
import { ScoreCalculator } from "./ScoreCalculator"


export default function GetAIController(){
    return AIController.GetInstance();
}

// 如果做联机,需要在函数套一层异步.
export class AIController {
    private static instance: AIController;
    public priorityList:number[][];
    private selected: number[] = [];        // 当前选择的点数
    private currentJetton: number = 1000;   // 当前的筹码数  
    private sum:number = 0;
    public ave:number = 0;
    private gs:ScoreCalculator = new ScoreCalculator;

    private constructor() {
        this.priorityList = this.GetPriorityList();
        this.selected = [];
        this.currentJetton = 1000;
    }

    public Reset(): void {
        this.currentJetton = 1000;
        this.selected = [];
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
        // 测试,注释下方内容
        selectedIndexs = this.GetBestChoose(points,indexs).sort();
        /* 
        handle your logic here
        记得保存选定的点数
        */


        // 执行回调通知
        if (callback != null) {
            callback(selectedIndexs);
        }
    }

    // points: 对手的点数, currentRate: 当前赔率, restRound: 剩余轮次
    public SelectRate(points: number[], currentRate:number, restRound:number, callback:SAction1<any> = null) : void {
        // 用这个选择倍率,确保结果为0~3
        let Rate: number = 0;
        Rate = (this.GetPrise(points, currentRate, restRound));
        Rate = Math.floor(Rate);
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

    public ShowCurrentResult(isWinner: boolean, callback: SAction = null): void {
        this.selected = [];

        if (callback != null){
            callback();
        }
    }

    public NextInning(callback: SAction = null): void {
        this.selected = [];

        if (callback != null){
            callback();
        }
    }

    public AgreeNewGame(callback: SAction1<string> = null): void {
        let agree:string = "agree";

        if (callback != null) {
            callback(agree);
        }
    }

    public StartNewGame(callback: SAction = null): void {
        this.Reset();

        if (callback != null) {
            callback();
        }
    }





    /**
     * 得出最优选择
     * @param result_dice 投掷结果
     * @param serial_number 骰子序号列表
     * @returns 选择骰子的序号列表（无序）
     */
    private GetBestChoose(result_dice:number[],serial_number:number[]){
        for(let i = 0;i < this.priorityList.length ;i++){
            //若当前骰子不是目标结果子集则跳过
            if(!this.CheckIsArr1InArr2(this.selected,this.priorityList[i])){
                continue
            }
            else{
                if(this.CheckIsArr1InArr2(this.priorityList[i],this.selected.concat(result_dice).sort())){
                    console.log("最优选择为"+this.priorityList[i])
                    let keep_arr = this.GetArr1SubArr2(this.priorityList[i],this.selected);
                    this.selected = this.priorityList[i];
                    return this.GetSerialNumber(keep_arr,result_dice,serial_number);
                }
            }

        }

        return [];

    }
    /**
     * 
     * @param other_arr 
     * @param now_rate 
     * @param rest_rounds 
     * @returns 
     */
    private GetPrise(other_arr:number[],now_rate:number,rest_rounds:number){
        let my_ave:number = this.GetAve(this.selected,this.selected.length);
        let other_ave:number = this.GetAve(other_arr,other_arr.length);
        let my_max = this.GetMaxScore(this.selected);
        let my_min = this.GetMinScore(this.selected);
        let other_max = this.GetMaxScore(other_arr);
        let other_min = this.GetMinScore(other_arr);
        let max_prise = this.currentJetton/(other_max-my_min);//最大倍率防止一轮暴毙
        console.log("my_ave:"+my_ave)
        console.log(other_ave)

        console.log(my_min)
        console.log(other_max)

        if(max_prise < now_rate){
            max_prise = now_rate;
        }




        if(my_min >= other_max){
            
            return 3;
        }

        if(my_max <= other_min){
            return 0;
        }

         if(rest_rounds <= 2 && this.currentJetton >= 1500  ){

         }

        if(my_ave - other_ave <= 5){
            return 0;
        }
        if(my_ave - other_ave >5 && my_ave - other_ave <= 10){
            return 1<max_prise-now_rate ? 1:max_prise-now_rate;
        }
        if(my_ave - other_ave >10 && my_ave - other_ave < 15){
            return 2<max_prise-now_rate ? 2:max_prise-now_rate;
        }
        if(my_ave - other_ave >= 15 && my_ave - other_ave <20){
            return 3<max_prise-now_rate ? 3:max_prise-now_rate;
        }
        if(my_ave - other_ave >= 20){
            return 3;
        }
        return 0;

      }




      /**
       * 记录当前骰子组合
       * @param arr 
       */
    private SetNowDice(arr:number[]){
        this.selected = arr.concat()
        this.sum = 0
    }



    


    /**
     * 获取该骰子组合的最可能得分
     * @param arr 
     * @returns 
     */
    private GetMaxScore(arr:number[]){
        for(let i = 0;i < this.priorityList.length ;i++){
            //若当前骰子不是目标结果子集则跳过
            if(this.CheckIsArr1InArr2(arr,this.priorityList[i])){
                return this.gs.GetScore(this.priorityList[i]);
            }

        }

        return 0

    }

    /**
     * 获得当前骰子组合的最低可能得分
     * @param arr 
     * @returns 
     */
    private GetMinScore(arr:number[]){
        for(let i = this.priorityList.length - 1 ; i >= 0 ;i--){
            //若当前骰子不是目标结果子集则跳过
            if(this.CheckIsArr1InArr2(arr,this.priorityList[i])){
                return this.gs.GetScore(this.priorityList[i]);
            }

        }

        return 0

    }

    
    /**
     * 根据当前骰子点数获取得分期望
     * @returns 
     */
    private GetAve = (arr:number[],p:number) =>{
        this.GetCount(arr,p);
        //console.log(this.sum);
        this.ave = this.sum;
        for(let i = 0; i < 5-p ;i++){
          //console.log("除6");
          this.ave = this.ave/6;
        }
    
        this.sum = 0;
        return this.ave;
      }
    
    /**
     * 按照传入的数组计算期望,
     * @param {*} arr_1 传入的数组
     */
     private CalculateSum = (arr_1:number[]) =>{
        let score = this.gs.GetScore(arr_1);
        this.sum += score;
        //console.log(score);
      }
    
    /**
     * 用于获取下一轮所有骰子点数情况并获取得分期望
     * @param {*} arr 保留的骰子
     * @param {*} p 当前保留的骰子个数
     */
      private GetCount = (arr:number[],p:number) =>{
        var new_arr = arr.concat();
        var new_arr_copy;
        if(new_arr.length == 5){
            new_arr_copy = new_arr.concat();
            this.CalculateSum(new_arr_copy);
            return
        }
        //从第p位开始生成所有可能并获得各种可能的得分
        for(let i = 1;i <= 6;i ++){
          new_arr[p] = i;
          if(p<4){
            this.GetCount(new_arr,p+1);//递归
          }
          if(p === 4){//必须所有骰子点数都生成
            //console.log(new_arr);
            new_arr_copy = new_arr.concat();
            this.CalculateSum(new_arr_copy);
          }
        }
      }
    



      



      private GetSerialNumber(keep_arr:number[],all_arr:number[],number_list:number[]){
        let result:number[] = all_arr.concat();

        let keep_Serial_Number:number[] = [];

        for(let i = 0; i < keep_arr.length ; i++){
            for(let j = 0 ; j < result.length ; j++){
                if( keep_arr[i] == result[j] ){
                    keep_Serial_Number.push(number_list[j]);
                    result[j] = 0;
                    break;
                }

            }


        }
        return keep_Serial_Number;


    }



    /**
     * 判断arr1是否为arr2子集
     * @param arr1 
     * @param arr2 
     * @returns 
     */
    private CheckIsArr1InArr2(arr1:number[],arr2:number[]){
        if(arr1.length>arr2.length){
            return 0
        }
        let count1_1 = 0
        let count2_1 = 0
        let count3_1 = 0
        let count4_1 = 0
        let count5_1 = 0
        let count6_1 = 0
        
        let count1_2 = 0
        let count2_2 = 0
        let count3_2 = 0
        let count4_2 = 0
        let count5_2 = 0
        let count6_2 = 0

        

        for(let i = 0;i<arr1.length;i++){
            if(arr1[i] == 1){
                count1_1 ++
            }
            if(arr1[i] == 2){
                count2_1 ++
            }
            if(arr1[i] == 3){
                count3_1 ++
            }
            if(arr1[i] == 4){
                count4_1 ++
            }
            if(arr1[i] == 5){
                count5_1 ++
            }
            if(arr1[i] == 6){
                count6_1 ++
            }

        }
        for(let i = 0;i<arr2.length;i++){
            if(arr2[i] == 1){
                count1_2 ++
            }
            if(arr2[i] == 2){
                count2_2 ++
            }
            if(arr2[i] == 3){
                count3_2 ++
            }
            if(arr2[i] == 4){
                count4_2 ++
            }
            if(arr2[i] == 5){
                count5_2 ++
            }
            if(arr2[i] == 6){
                count6_2 ++
            }

        }

        if(count1_1<=count1_2 && count2_1<=count2_2 && count3_1<=count3_2 && count4_1<=count4_2 && count5_1<=count5_2 && count6_1<=count6_2){
            return 1
        }

        return 0;

    }



    private GetArr1SubArr2(arr1:number[],arr2:number[]){
        let count:number[] = [0,0,0,0,0,0]

        for(let i = 0;i<arr1.length;i++){
            if(arr1[i] == 1){
                count[0] ++
            }
            if(arr1[i] == 2){
                count[1] ++
            }
            if(arr1[i] == 3){
                count[2] ++
            }
            if(arr1[i] == 4){
                count[3] ++
            }
            if(arr1[i] == 5){
                count[4] ++
            }
            if(arr1[i] == 6){
                count[5] ++
            }
    }

    for(let i = 0;i<arr2.length;i++){
        if(arr2[i] == 1){
            count[0] --
        }
        if(arr2[i] == 2){
            count[1] --
        }
        if(arr2[i] == 3){
            count[2] --
        }
        if(arr2[i] == 4){
            count[3] --
        }
        if(arr2[i] == 5){
            count[4] --
        }
        if(arr2[i] == 6){
            count[5] --
        }
}


    let new_arr:number[] = [];

    for(let i = 0; i < 6 ; i ++){
        for(let j = 0;j < count [i] ; j ++){
            new_arr.push(i+1);
        }

    }
    return new_arr;

}


private GetPriorityList(){
    return  [[6, 6, 6, 6, 6], [5, 5, 5, 5, 5], [4, 4, 4, 4, 4], [3, 3, 3, 3, 3], [2, 2, 2, 2, 2], [1, 1, 1, 1, 1], [2, 3, 4, 5, 6], [6, 6, 6, 6], [1, 2, 3, 4, 5], [5, 5, 5, 5], [4, 4, 4, 4], [5, 6, 6, 6, 6], [4, 6, 6, 6, 6], [3, 6, 6, 6, 6], [2, 6, 6, 6, 6], [5, 5, 5, 5, 6], [3, 3, 3, 3], [1, 6, 6, 6, 6], [4, 5, 5, 5, 5], [3, 5, 5, 5, 5], [2, 5, 5, 5, 5], [4, 4, 4, 4, 6], [2, 2, 2, 2], [1, 5, 5, 5, 5], [4, 4, 4, 4, 5], [3, 4, 4, 4, 4], [2, 4, 4, 4, 4], [3, 3, 3, 3, 6], [1, 1, 1, 1], [2, 3, 4, 5], [1, 4, 4, 4, 4], [3, 3, 3, 3, 5], [3, 4, 5, 6], [3, 3, 3, 3, 4], [2, 2, 2, 2, 6], [2, 3, 3, 3, 3], [3, 4, 5, 6, 6], [1, 3, 3, 3, 3], [2, 2, 2, 2, 5], [3, 4, 5, 5, 6], [2, 2, 2, 2, 4], [3, 4, 4, 5, 6], [2, 2, 2, 2, 3], [3, 3, 4, 5, 6], [1, 1, 1, 1, 6], [1, 1, 1, 1, 5], [1, 2, 2, 2, 2], [1, 3, 4, 5, 6], [2, 3, 4, 5, 5], [1, 2, 3, 4], [1, 1, 1, 1, 4], [2, 3, 4, 4, 5], [5, 5, 6, 6, 6], [6, 6, 6], [1, 1, 1, 1, 3], [2, 3, 3, 4, 5], [5, 5, 5, 6, 6], [1, 1, 1, 1, 2], [1, 2, 3, 4, 6], [2, 2, 3, 4, 5], [4, 4, 6, 6, 6], [5, 5, 5], [1, 2, 3, 4, 4], [3, 3, 6, 6, 6], [4, 4, 4, 6, 6], [5, 6, 6, 6], [1, 2, 3, 3, 4], [4, 4, 5, 5, 5], [4, 6, 6, 6], [1, 2, 2, 3, 4], [2, 2, 6, 6, 6], [4, 4, 4, 5, 5], [3, 4, 5], [4, 4, 4], [3, 6, 6, 6], [5, 5, 5, 6], [1, 1, 2, 3, 4], [3, 3, 3, 6, 6], [3, 3, 5, 5, 5], [2, 6, 6, 6], [1, 1, 6, 6, 6], [1, 6, 6, 6], [4, 5, 5, 5], [2, 2, 5, 5, 5], [3, 3, 3, 5, 5], [5, 5, 6, 6], [2, 3, 4], [3, 3, 3], [3, 5, 5, 5], [4, 4, 4, 6], [2, 2, 2, 6, 6], [3, 3, 4, 4, 4], [2, 5, 5, 5], [4, 4, 4, 5], [1, 1, 5, 5, 5], [3, 3, 3, 4, 4], [4, 5, 6, 6, 6], [4, 4, 6, 6], [1, 5, 5, 5], [2, 2, 2, 5, 5], [2, 2, 4, 4, 4], [3, 5, 6, 6, 6], [4, 5, 5, 6, 6], [3, 4, 5, 5], [4, 5, 6], [2, 2, 2], [3, 3, 3, 6], [3, 4, 4, 4], [1, 1, 1, 6, 6], [2, 5, 6, 6, 6], [3, 4, 6, 6, 6], [3, 4, 6], [3, 5, 5, 6, 6], [4, 4, 5, 6, 6], [4, 5, 5, 5, 6], [3, 3, 6, 6], [4, 4, 5, 5], [3, 4, 4, 5], [4, 5, 6, 6], [3, 4], [3, 5, 6], [2, 4, 4, 4], [3, 3, 3, 5], [1, 1, 4, 4, 4], [1, 5, 6, 6, 6], [2, 2, 2, 4, 4], [2, 4, 6, 6, 6], [2, 5, 5, 6, 6], [3, 5, 5, 5, 6], [4, 4, 5, 5, 6], [5, 6, 6], [6, 6], [2, 3, 4, 6], [3, 3, 4, 5], [3, 5, 6, 6], [4, 5, 5, 6], [1, 4, 4, 4], [3, 3, 3, 4], [4, 5], [1, 1, 1, 5, 5], [1, 4, 6, 6, 6], [1, 5, 5, 6, 6], [2, 2, 3, 3, 3], [2, 3, 6, 6, 6], [2, 4, 5], [2, 5, 5, 5, 6], [3, 3, 5, 6, 6], [3, 4, 4, 6, 6], [4, 4, 4, 5, 6], [4, 6, 6], [5, 5, 6], [2, 2, 6, 6], [3, 3, 5, 5], [5, 5], [4, 5, 5], [3, 4, 6, 6], [3, 5, 5, 6], [4, 4, 5, 6], [1, 1, 1], [2, 2, 2, 6], [3, 5], [1, 3, 6, 6, 6], [1, 5, 5, 5, 6], [2, 2, 2, 3, 3], [2, 3, 5], [2, 4, 4, 6, 6], [3, 3, 4, 6, 6], [3, 3, 5, 5, 6], [3, 4, 5, 5, 5], [3, 6, 6], [3, 5, 5], [4, 4, 5], [4, 4], [1, 3, 4, 5], [2, 3, 4, 4], [3, 4, 4], [2, 2, 2, 5], [2, 3, 3, 3], [1, 1, 1, 4, 4], [1, 1, 3, 3, 3], [1, 2, 6, 6, 6], [1, 4, 4, 6, 6], [2, 2, 5, 6, 6], [2, 4, 5, 5, 5], [3, 4, 4, 4, 6], [3, 4, 4, 5, 5], [4, 4, 6], [4], [5, 6], [1, 1, 6, 6], [2, 2, 5, 5], [3, 3, 4, 4], [4, 6], [2, 3, 3, 4], [2, 4, 5, 6], [3, 3, 5, 6], [3, 4, 4, 6], [3, 3, 4], [1, 3, 3, 3], [2, 2, 2, 4], [2, 4], [5], [1, 3, 4], [1, 4, 5, 5, 5], [2, 2, 4, 6, 6], [2, 2, 5, 5, 6], [2, 3, 3, 6, 6], [2, 3, 5, 5, 5], [2, 4, 4, 4, 6], [2, 4, 4, 5, 5], [3, 3, 3, 5, 6], [3, 3, 4, 4, 6], [3, 3, 4, 5, 5], [3, 4, 4, 4, 5], [3], [3, 6], [3, 3, 5], [3, 3], [2, 2, 3, 4], [2, 3, 5, 6], [2, 4, 5, 5], [3, 3, 4, 6], [2, 6, 6], [1, 1, 1, 6], [2, 2, 2, 3], [2, 3], [6], [1, 1, 1, 3, 3], [1, 1, 5, 6, 6], [1, 3, 3, 6, 6], [1, 3, 5, 5, 5], [1, 4, 4, 4, 6], [1, 4, 4, 5, 5], [2, 2, 3, 6, 6], [2, 4, 4, 4, 5], [2, 5, 5], [3, 3, 3, 4, 6], [3, 3, 4, 4, 5], [3, 3, 6], [1, 1, 5, 5], [2, 2, 4, 4], [2, 4, 4], [2, 3, 5, 5], [2, 4, 4, 5], [1, 6, 6], [1, 1, 1, 5], [1, 1, 2, 2, 2], [1, 1, 4, 6, 6], [1, 1, 5, 5, 6], [1, 2, 5, 5, 5], [1, 4, 4, 4, 5], [2, 2, 4, 4, 6], [2, 2, 4, 5, 5], [2, 3, 3, 5, 5], [3, 3, 3, 4, 5], [2, 5], [1, 3, 4, 6], [2, 5, 6, 6], [1, 2, 4], [1, 1, 1, 4], [1, 2, 2, 2], [2], [1, 1, 1, 2, 2], [1, 1, 3, 6, 6], [1, 2, 2, 6, 6], [1, 3, 3, 5, 5], [2, 2, 2, 5, 6], [2, 2, 3, 5, 5], [2, 2, 4, 4, 5], [2, 3, 3, 3, 6], [2, 3, 4, 4, 4], [1, 1, 4, 4], [2, 2, 3, 3], [2, 2], [2, 2, 4], [2, 3, 3], [1, 5, 6, 6], [2, 2, 4, 5], [2, 3, 3, 5], [2, 4, 6, 6], [2, 4, 6], [2, 5, 5, 6], [1, 2, 3], [1, 5, 5], [1, 1, 1, 3], [1, 1, 2, 6, 6], [1, 1, 4, 4, 6], [1, 1, 4, 5, 5], [1, 3, 3, 3, 6], [1, 3, 4, 4, 4], [1, 4, 4], [2, 2, 2, 4, 6], [2, 2, 3, 3, 6], [2, 2, 5], [2, 3, 3, 3, 5], [2, 3, 3, 4, 4], [2, 5, 6], [1, 4], [2, 2, 3], [1, 2, 4, 5], [1, 3, 4, 4], [1, 4, 6, 6], [1, 5, 5, 6], [2, 2, 3, 5], [2, 3, 6, 6], [2, 3, 6], [2, 6], [2, 2, 6], [1, 1, 1, 2], [1, 1, 3, 5, 5], [1, 1, 4, 4, 5], [1, 2, 2, 5, 5], [1, 2, 4, 4, 4], [1, 3, 3, 3, 5], [1, 3, 3, 4, 4], [2, 2, 2, 3, 6], [2, 2, 2, 4, 5], [2, 2, 3, 3, 5], [2, 2, 3, 4, 4], [2, 3, 3, 3, 4], [1, 1, 3, 3], [1, 3], [1, 2, 3, 5], [1, 2, 4, 4], [1, 3, 3, 4], [1, 3, 6, 6], [1, 4, 5, 6], [1, 4, 5], [2, 4, 4, 6], [1], [1, 1, 1, 5, 6], [1, 1, 2, 5, 5], [1, 1, 3, 3, 6], [1, 3, 3, 3, 4], [1, 3, 3], [2, 2, 2, 3, 5], [2, 2, 3, 3, 4], [1, 1], [1, 4, 6], [1, 6], [1, 2, 6, 6], [1, 3, 5, 6], [1, 3, 5], [1, 4, 4, 6], [1, 4, 5, 5], [2, 2, 5, 6], [1, 5], [1, 1, 6], [1, 5, 6], [1, 1, 1, 4, 6], [1, 1, 3, 3, 5], [1, 1, 3, 4, 4], [1, 1, 4], [1, 2, 2, 2, 6], [1, 2, 2, 4, 4], [2, 2, 2, 3, 4], [2, 4, 5, 6, 6], [1, 2], [1, 1, 2, 2], [1, 3, 6], [1, 1, 3, 4], [1, 2, 2, 4], [1, 2, 3, 3], [1, 3, 5, 5], [1, 4, 4, 5], [2, 2, 4, 6], [2, 3, 3, 6], [1, 1, 5], [1, 1, 1, 3, 6], [1, 1, 1, 4, 5], [1, 1, 2, 2, 6], [1, 1, 2, 4, 4], [1, 1, 3, 3, 4], [1, 1, 3], [1, 2, 2, 2, 5], [1, 2, 2], [1, 2, 3, 3, 3], [1, 4, 5, 6, 6], [2, 3, 5, 6, 6], [2, 4, 5, 5, 6], [1, 1, 2, 4], [1, 1, 5, 6], [1, 2, 2, 3], [1, 2, 4, 6], [1, 2, 5, 5], [1, 3, 3, 6], [2, 2, 3, 6], [1, 1, 1, 2, 6], [1, 1, 1, 3, 5], [1, 1, 2, 2, 5], [1, 1, 2], [1, 2, 2, 2, 4], [1, 2, 2, 3, 3], [1, 3, 5, 6, 6], [1, 4, 5, 5, 6], [2, 3, 4, 6, 6], [2, 3, 5, 5, 6], [2, 4, 4, 5, 6], [1, 2, 5], [1, 1, 2, 3], [1, 1, 4, 6], [1, 2, 3, 6], [1, 3, 3, 5], [1, 2, 6], [1, 1, 1, 2, 5], [1, 1, 1, 3, 4], [1, 1, 2, 2, 4], [1, 1, 2, 3, 3], [1, 2, 2, 2, 3], [1, 2, 5, 6, 6], [1, 3, 4, 6, 6], [1, 3, 5, 5, 6], [1, 4, 4, 5, 6], [1, 1, 3, 6], [1, 1, 4, 5], [1, 2, 2, 6], [1, 1, 1, 2, 4], [1, 1, 2, 2, 3], [1, 2, 4, 6, 6], [1, 2, 5, 5, 6], [2, 2, 4, 5, 6], [2, 3, 3, 5, 6], [2, 3, 4, 4, 6], [1, 1, 2, 6], [1, 1, 3, 5], [1, 2, 2, 5], [1, 1, 1, 2, 3], [1, 2, 3, 6, 6], [1, 2, 4, 5, 6], [1, 3, 3, 5, 6], [1, 3, 4, 4, 6], [1, 3, 4, 5, 5], [2, 2, 3, 5, 6], [2, 3, 3, 4, 6], [1, 1, 2, 5], [1, 2, 5, 6], [1, 1, 4, 5, 6], [1, 2, 3, 5, 6], [1, 2, 4, 4, 6], [1, 2, 4, 5, 5], [1, 3, 3, 4, 6], [1, 3, 4, 4, 5], [2, 2, 3, 4, 6], [1, 1, 3, 5, 6], [1, 2, 2, 5, 6], [1, 2, 3, 5, 5], [1, 2, 4, 4, 5], [1, 3, 3, 4, 5], [1, 1, 2, 5, 6], [1, 1, 3, 4, 6], [1, 2, 2, 4, 6], [1, 2, 3, 3, 6], [1, 1, 2, 4, 6], [1, 1, 3, 4, 5], [1, 2, 2, 3, 6], [1, 2, 2, 4, 5], [1, 2, 3, 3, 5], [1, 1, 2, 3, 6], [1, 1, 2, 4, 5], [1, 2, 2, 3, 5], [1, 1, 2, 3, 5]]


}

}
