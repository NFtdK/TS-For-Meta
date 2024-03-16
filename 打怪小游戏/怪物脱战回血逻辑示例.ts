let maxHP = 100  //假设最大血量是100
//等效表达   let maxHP: number = 100

let nowHP = maxHP
/**可以在怪物受伤后开始计时，如果到一定时间后还没受伤，就开始回血 */

let healHP = maxHP*0.2//设定回血量

//如果nowHP五秒内没有减少，就增加nowHP的数值 outTime for last damage time
//这下面应该写在扣血逻辑后面
let outTime:number = 0  //let outTime = 0
let T = setInterval(()=>{
    outTime += 1
    if(outTime >= 5&&this.nowHP > 0){
/*  if(condition1 && condition2)
    &，和，同时满足两个条件
    if(condition1 || condition2)
    |，或，满足两个条件之一
*/
    //满足两个情况的时候执行，不然死了过后还回血
        this.nowHP = this.nowHP + healHP > this.maxHP ? this.maxHP : this.nowHP + healHP
        //三元表达式。是否大于最大血量？是，令其等于最大血量。不是：等于相加结果
        /**也可以用setTimeout来控制回血速率，也可以用其他办法，可优化
         * setTimeout(()=>{
         * "回血代码"
         * },间隔的毫秒数)
         */
        if(this.nowHP == this.maxHP){
            clearInterval(T)
        }
    }
},1000)