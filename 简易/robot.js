import { get_score } from "./get_score";
//就能算个期望
export class robot{

  constructor(){
    this.sum = 0;//下轮得分总和
    this.ave = 0;//下轮得分期望
    this.score = new get_score;//算分用的
    this.p = 0//p是保留骰子的个数
    this.arr = [];
  }
  /**
   * 
   * @param {*} arr 
   */
  set_arr(arr){
    //末尾补0
    for(let i = 0; i < arr.length;i ++){
      this.arr[i] = arr[i];
    }
    
    for(let i = arr.length ;i <=4 ;i ++){
      this.arr[i]=0;
    }
    console.log(this.arr);
    
  }

  get_ave = () =>{
    console.log(this.sum);
    this.ave = this.sum;
    for(let i = 0; i < 5-this.p ;i++){
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
  calculate_sum = (arr_1) =>{
    this.score.set_arr(arr_1);
    let score = this.score.get_sum();
    this.sum += score;
    console.log(score);
  }

/**
 * 用于获取下一轮所有骰子点数情况并获取得分期望
 * @param {*} arr 保留的骰子
 * @param {*} p 当前保留的骰子个数
 */
  get_count = (arr,p) =>{
    var new_arr = arr.concat();
    var new_arr_copy;
    //从第p位开始生成所有可能并获得各种可能的得分
    for(let i = 1;i <= 6;i ++){
      new_arr[p] = i;
      if(p<4){
        this.get_count(new_arr,p+1);//递归
      }
      if(p === 4){//必须所有骰子点数都生成
        console.log(new_arr);
        new_arr_copy = new_arr.concat();
        this.calculate_sum(new_arr_copy);
      }
    }
  }
  /**
   * 用于获取p并执行get_count函数
   */
  get_p = () =>{
    this.p = 0;
    for(let i = 0;i <= 4;i++){
      if(this.arr[i]!=0){
        this.p++;
      }
    }
    //console.log("p="+this.p);
    return this.p;
  }






}