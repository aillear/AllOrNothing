/**
 * 用于计算得分，（乱序，长度不超过5，只包括1到6的数组）
 *
 */
export class ScoreCalculator {
    arr: number[] = [];
    newArr: number[] = [];
    length: number = 0;

    constructor() {}
    /**
     * 输入骰子组合，返回得分
     * @param arr
     * @returns
     */
    public GetScore = (arr: number[]) => {
        this.SetArr(arr);

        let sum = 0;
        for (let i = 0; i < this.length; i++) {
            sum += this.arr[i];
        }
        //console.log(this.arr)
        if (this.IsFiveShunzi()) {
            sum += this.IsFiveShunzi();
            return sum;
        }

        if (this.IsFourShunzi()) {
            sum += this.IsFourShunzi();
            return sum;
        }

        if (this.IsHulu()) {
            sum += this.IsHulu();
            return sum;
        }

        if (this.IsFivefold()) {
            sum += this.IsFivefold();
            return sum;
        }

        if (this.IsQuadruple()) {
            sum += this.IsQuadruple();
            return sum;
        }
        if (this.IsDoubleDouble()) {
            sum += this.IsDoubleDouble();
            return sum;
        }
        if (this.IsTrible()) {
            sum += this.IsTrible();
            return sum;
        }

        return sum;
    };

    private SetArr(arr: number[]) {
        this.arr = arr.sort();
        this.newArr = [];
        this.length = this.arr.length;
        //Array.prototype.sort(this.arr)
        //console.log(this.arr)
    }
    /**
     * 小顺子
     */
    private IsFourShunzi = () => {
        if (this.length < 4) {
            //console.log("不满足小顺子");
            return 0;
        }
        for (var i = 0; i < this.length; i++) {
            if (this.newArr.indexOf(this.arr[i]) == -1) {
                this.newArr.push(this.arr[i]);
            }
        }
        //console.log(this.new_arr);
        if (this.newArr.length < 4) {
            //console.log("不满足小顺子");
            return 0;
        }
        let count:number = 1
        if(this.newArr.length == 4){
                for (var i = 1; i < this.newArr.length; i++) {
                if (this.newArr[i] - this.newArr[i - 1] == 1) {
                    //console.log("不满足小顺子");
                    count ++;
                    if (count == 4) {
                        return 30;
                    }
                }
                else{
                    count = 1;
                }
            }}
        
        
        //console.log("满足小顺子");
        return 0;
    };






    /**
     * 大顺子
     */
    private IsFiveShunzi = () => {
        if (this.length < 5) {
            //console.log("不满足大顺子");
            return 0;
        }
        for (var i = 1; i < 5; i++) {
            if (this.arr[i] - this.arr[i - 1] != 1) {
                //console.log("不满足大顺子");
                return 0;
            }
        }
        //console.log("满足大顺子");
        return 60;
    };

    /**
     * 连对
     */
    private IsDoubleDouble = () => {
        if (this.length < 4) {
            //console.log("不满足连对");
            return 0;
        }
        let count_1 = 1; //用于计数多少个相同的
        let count_2 = 0; //用于计数多少对相同的
        //console.log(this.arr);
        for (var i = 1; i < this.length; i++) {
            if (this.arr[i] == this.arr[i - 1]) {
                count_1++;
            } else {
                count_1 = 1;
            }
            if (count_1 == 2) {
                count_2++;
            }
        }
        if (count_2 >= 2) {
            //console.log("满足连对");
            return 10;
        }
        //console.log("不满足连对");
        return 0;
    };

    private IsTrible = () => {
        if (this.length < 3) {
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
    };

    private IsQuadruple = () => {
        if (this.length < 4) {
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
    };
    /**
     * 五连
     * @returns
     */
    private IsFivefold = () => {
        if (this.length < 5) {
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
    };

    private IsHulu() {
        if (this.IsDoubleDouble() && this.IsTrible()) {
            //console.log("满足葫芦");
            return 20;
        }
        //console.log("不满足葫芦");
        return 0;
    }
}
