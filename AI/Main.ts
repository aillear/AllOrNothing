import { AI } from "./AI"
import { GetScore } from "./get_score"
import { P_list } from "./p_list"

let l = new P_list
let ai = new AI
let gs = new GetScore


//console.log(l.get_priority_list)


// console.log(ai.check_is_arr1_in_arr2([1,2],[1,2,3]))

// console.log(ai.get_arr1_sub_arr2([1,2,3,3,3],[1,2,3]));

// console.log(ai.get_Serial_Number([1,1],[1,2,1,3,5],[1,2,3,4,5]));
// ai.set_now_dice([1,1,1])
// console.log(ai.get_max_score([1,1,1]))
// console.log(ai.get_min_score([1,1,1]))

let arr = []
let result = [4,6,2,1,3]
let result_serial_number = [1,2,3,4,5]
ai.Set_now_dice(arr)
console.log(ai.Get_best_choose(result,result_serial_number))
console.log(ai.Get_ave(ai.now_dice,ai.now_dice.length))
console.log(ai.now_dice)
console.log(ai.Get_prise([4,2,5],[3,2,5],1000,1,10))