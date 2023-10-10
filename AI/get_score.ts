/**
 * 用于计算得分，（乱序，长度不超过5，只包括1到6的数组）
 * 
 */
export class Get_score{
  arr:number[] = []
  new_arr:number[] = []
  length:number = 0

  constructor(){

  }
  /**
   * 输入骰子组合，返回得分
   * @param arr 
   * @returns 
   */
  public Get_sum = (arr) =>{

    this.Set_arr(arr)

    let sum = 0;
    for(let i = 0;i < this.length;i++)
    {sum+=this.arr[i];}
    //console.log(this.arr)
    if(this.Is_five_shunzi())
    {sum+=this.Is_five_shunzi();
    return sum;}

    if(this.Is_four_shunzi())
    {sum+=this.Is_four_shunzi();
      return sum;}

    if(this.Is_hulu())
    {sum+=this.Is_hulu();
      return sum;}

    if(this.Is_fivefold())
    {sum+=this.Is_fivefold();
      return sum;}

    if(this.Is_quadruple())
    {sum+=this.Is_quadruple();
      return sum;}
    if(this.Is_double_double())
    {sum+=this.Is_double_double();
      return sum;}
    if(this.Is_trible())
    {sum+=this.Is_trible();
      return sum;}
    
    return sum;
    
  }





  private Set_arr(arr:number[]){
    this.arr = arr.sort();
    this.new_arr = [];
    this.length = this.arr.length
    //Array.prototype.sort(this.arr)
    //console.log(this.arr)
  }
  /**
   * 小顺子
   */
  private Is_four_shunzi = () =>{
    if(this.length<4){
      //console.log("不满足小顺子");
      return 0;
    }
    for(var i = 0;i < this.length;i++)
    {
      if(!this.new_arr.includes(this.arr[i]))
        {this.new_arr.push(this.arr[i]);}
    }
    //console.log(this.new_arr);
    if(this.new_arr.length<4){
      //console.log("不满足小顺子");
      return 0;
    }
    for(var i = 1;i<4;i++){
      if(this.new_arr[i]-this.new_arr[i-1]!=1){
        //console.log("不满足小顺子");
        return 0;
      }
    }
    //console.log("满足小顺子");
    return 30;

  }
  /**
   * 大顺子
   */
  private Is_five_shunzi = () =>{
    if(this.length < 5){
      //console.log("不满足大顺子");
      return 0;
    }
    for(var i = 1;i<5;i++){
      if(this.arr[i]-this.arr[i-1]!=1){
        //console.log("不满足大顺子");
        return 0;
      }
    }
    //console.log("满足大顺子");
    return 60;
  }

  /**
   * 连对
   */
  private Is_double_double = () =>{
    if(this.length < 4){
      //console.log("不满足连对");
      return 0;
    }
    let count_1 = 1;//用于计数多少个相同的
    let count_2 = 0;//用于计数多少对相同的
    //console.log(this.arr);
    for(var i = 1; i < this.length ; i ++){
      
      if(this.arr[i]==this.arr[i-1]){
        count_1++;
      }
      else{
        count_1 = 1;
      }
      if(count_1==2){
        count_2++;
      }
    }
    if(count_2>=2){
      //console.log("满足连对");
      return 10;
    }
    //console.log("不满足连对");
    return 0;
  }

  private Is_trible = () =>{
    if(this.length < 3){
    //console.log("不满足三连");
    return 0;
    }
      let count = 1;
      for (var i = 1; i < this.length; i++) {
        if (this.arr[i] == this.arr[i - 1]) {
          count++;
        } else {
          count = 1;
        }
        if (count == 3) {
          //console.log("满足三连");
          return 10;
        }
      }
    //console.log("不满足三连");
    return 0;
  }

  private Is_quadruple = () =>{
    if(this.length < 4){
    //console.log("不满足四连");
    return 0;
    }
      let count = 1;
      for (var i = 1; i <= this.length; i++) {
        if (this.arr[i] == this.arr[i - 1]) {
          count++;
        } else {
          count = 1;
        }
        if (count == 4) {
          //console.log("满足四连");
          return 40;
        }
      }
    //console.log("不满足四连");
    return 0;
  }

  private Is_fivefold = () =>{
    if(this.length < 5){
      //console.log("不满足五连");
      return 0;
    }
    let count = 1;
    for (var i = 1; i <= this.length; i++) {
      if (this.arr[i] == this.arr[i - 1]) {
        count++;
      } else {
        count = 1;
      }
      if (count == 5) {
        //console.log("满足五连");
        return 100;
      }
    }
  //console.log("不满足五连");
  return 0;
}

  private Is_hulu(){
    if(this.Is_double_double() && this.Is_trible()){
      //console.log("满足葫芦");
      return 20;
    }
    //console.log("不满足葫芦");
    return 0;
  }

  
  



}