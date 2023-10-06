import { AI } from "./AI"
import { list } from "./p_list"


let l = new list
let ai = new AI
//console.log(l.get_priority_list)

ai.set_now_dice([1])
ai.set_result_dice([2,6,6,6])
ai.get_best_choose()