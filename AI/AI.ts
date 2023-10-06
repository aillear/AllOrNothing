import { get_score } from "./get_score"
import {list} from "./p_list"


class AI{
    public p_list:number[][]
    now_dice:number[] = []
    result_dice:number[] = []
    sum:number = 0
    ave:number = 0
    gs:get_score = new get_score
    p:number = 0


    constructor(){
        let l = new list
        this.p_list = l.get_priority_list()
    }

    
    set_now_dice(arr:number[]){
        this.now_dice = arr.concat()
    }


    set_result_dice(arr:number[]){
        this.result_dice = arr.concat()
    }
    /**
     * 选择最优解
     * @returns 
     */
    get_best_choose(){
        for(let i = 0;i < this.p_list.length ;i++){
            //若当前骰子不是目标结果子集则跳过
            if(!this.check_is_arr1_in_arr2(this.now_dice,this.p_list[i])){
                continue
            }
            else{
                if(this.check_is_arr1_in_arr2(this.p_list[i],this.now_dice.concat(this.result_dice).sort())){
                    console.log("最优选择为"+this.p_list[i])
                    return this.p_list[i]
                }
            }

        }



    }



    

    get_ave = () =>{
        console.log(this.sum);
        this.ave = this.sum;
        for(let i = 0; i < 5-this.now_dice.length ;i++){
          //console.log("除6");
          this.ave = this.ave/6;
        }
    
        this.sum = 0;
        return this.ave;
      }
    
    /**
     * 按照传入的数组计算期望
     * @param {*} arr_1 传入的数组
     */
      calculate_sum = (arr_1:number[]) =>{
        this.gs.set_arr(arr_1);
        let score = this.gs.get_sum();
        this.sum += score;
        //console.log(score);
      }
    
    /**
     * 用于获取下一轮所有骰子点数情况并获取得分期望
     * @param {*} arr 保留的骰子
     * @param {*} p 当前保留的骰子个数
     */
      get_count = (arr:number[],p:number) =>{
        var new_arr = arr.concat();
        var new_arr_copy;
        //从第p位开始生成所有可能并获得各种可能的得分
        for(let i = 1;i <= 6;i ++){
          new_arr[p] = i;
          if(p<4){
            this.get_count(new_arr,p+1);//递归
          }
          if(p === 4){//必须所有骰子点数都生成
            //console.log(new_arr);
            new_arr_copy = new_arr.concat();
            this.calculate_sum(new_arr_copy);
          }
        }
      }
      /**
       * 用于获取p并执行get_count函数
       */
      
    





        




    /**
     * 判断arr1是否为arr2子集
     * @param arr1 
     * @param arr2 
     * @returns 
     */
    check_is_arr1_in_arr2(arr1:number[],arr2:number[]){
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


}


export {AI}



