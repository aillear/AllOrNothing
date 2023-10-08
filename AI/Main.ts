import { AI } from "./AI"
import { get_score } from "./get_score"
import { p_list } from "./p_list"

let l = new p_list
let ai = new AI
//console.log(l.get_priority_list)


// console.log(ai.check_is_arr1_in_arr2([1,2],[1,2,3]))

// console.log(ai.get_arr1_sub_arr2([1,2,3,3,3],[1,2,3]));

// console.log(ai.get_Serial_Number([1,1],[1,2,1,3,5],[1,2,3,4,5]));
let arr = [1,2]
let result = [3,2,3]
let result_serial_number = [3,4,5]
ai.set_now_dice(arr)
ai.set_result_dice(result)
console.log(ai.get_best_choose(result,result_serial_number))
ai.get_count(ai.now_dice,ai.now_dice.length)
console.log(ai.get_ave())
