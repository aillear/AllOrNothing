import { AI } from "./AI"
import { get_score } from "./get_score"
import { list } from "./p_list"

let l = new list
let ai = new AI
//console.log(l.get_priority_list)



let arr = [1,2,1]
let result = [6,6]
ai.set_now_dice(arr)
ai.set_result_dice(result)
ai.get_best_choose()


ai.get_count(arr,arr.length)
console.log(ai.get_ave())
// let gs = new get_score
// gs.set_arr([2,1,2,2,1])
// console.log(gs.get_sum())