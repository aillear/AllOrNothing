import {list} from "./p_list"


class AI{
    public p_list:number[][]
    now_dice:number[] = []
    result_dice:number[] = []

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

    get_best_choose(){
        for(let i = 0;i < this.p_list.length ;i++){
            //若当前骰子不是目标结果子集则跳过
            if(!this.check_is_arr1_in_arr2(this.now_dice,this.p_list[i])){
                continue
            }
            else{
                if(this.check_is_arr1_in_arr2(this.p_list[i],this.now_dice.concat(this.result_dice).sort())){
                    console.log(this.p_list[i])
                    return this.p_list[i]
                }
            }

        }



    }




        





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



