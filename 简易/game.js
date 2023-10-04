//测试用的

import { get_score } from "./get_score";
import { robot } from "./robot";


export class game{
  constructor(){
    this.prise = 1;//赔率
    this.keep_arr = [];//存放要保留的骰子
    this.counts = [];//存放当前骰子
    this.result = [];//存放投掷结果
    this.now_dice_num = 0;//当前骰子数目
    this.get_score = new get_score;//算分用的
    this.score = 0;//得分
    this.round = 0;//轮次
  }
  /**
   * 生成随机数函数
   * @param {*} n 生成随机数个数
   */
  get_random_count(n){
    let counts = [];
    for(let i = 0;i < n;i ++){
      counts[i] = parseInt(Math.random()*6+1);
    }
    return counts;
  }

  add_prise(n){
    this.prise += n;
  }
  /**
   * 保留骰子函数
   * @param {*} counts 投掷结果
   * @param {*} keep_arr 保留数组
   */
  keep_dice(counts,keep_arr){
    let new_counts = [];
    console.log(keep_arr)
    let j = 0;
    for(let i = 0;i < keep_arr.length;i ++){
      if(keep_arr[i]>counts.length){//超出数组index的不要
        continue;
      }
      new_counts[j] = counts[keep_arr[i]-1];
      j ++;
    }
    console.log(new_counts);
    return new_counts;
  }

  set_keep_arr(arr){
    this.keep_arr = arr;
  }

  creat_new_game(){
    this.result = this.get_random_count(5);
    console.log(this.result);
  }
  /**
   * 重开
   */
  clear(){
    this.prise = 1;//赔率
    this.keep_arr = [];
    this.counts = [];
    this.result = [];
    this.robot_1 = new robot;
    this.now_dice_num = 0;
    this.get_score = new get_score;
    this.score = 0;
    this.round = 0;
    this.creat_new_game;

  }

  /**
   * 结算这轮
   */
  run_by_round(){
    this.round ++;
    console.log(this.now_dice_num);
    console.log(this.keep_arr);
    let new_counts;
    if(this.round!=3){new_counts = this.counts.concat(this.keep_dice(this.result,this.keep_arr));}
    if(this.round==3){
      new_counts = this.counts.concat(this.result);
    }
    console.log("new_counts"+new_counts);
    this.counts = new_counts.sort();
    let score = 0;
    this.get_score.set_arr(this.counts);
    score += this.get_score.get_sum();
    this.now_dice_num = this.counts.length
    this.score = score
    let result = this.get_random_count(5-this.now_dice_num);
    this.result = result
    this.keep_arr = []
  }



}