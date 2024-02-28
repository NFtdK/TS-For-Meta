import MHP from "./UIScript/HMPScript"

@Component
export default class MonsterScirpt extends Script {

    @Property({ displayName: "怪物名" })
    monsterName: string = ""

    @Property({ displayName: "最大血量" })//装饰器
    maxHP: number = 100//                   默认值

    @Property({ displayName: "复活时间（秒）" }) 
    time: number = 2 

    @Property({ replicated: true, onChanged: "onHPChanged" }) 
    nowHP: number = 100

    private monsterUI: MHP = null

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

        if (SystemUtil.isClient()) {
            // 获取世界UI
            let worldUI = this.gameObject.getChildByName("世界UI") as UIWidget
            // 创建怪物UI
            this.monsterUI = UIService.create(MHP)
            // 将怪物UI显示在世界UI上
            worldUI.setTargetUIWidget(this.monsterUI.uiWidgetBase)

            this.monsterUI.init(this.monsterName, this.maxHP)


        }

        if (SystemUtil.isServer()) {
            this.nowHP = this.maxHP


        }
    }
    /**使用第15行自定义的的"onHPChanged"函数
     * 每当服务端改变血量的时候，客户端接收并自动调用这个函数
    */
    private onHPChanged() { 
        // 调用血条刷新的逻辑 
        if (this.monsterUI) { //这里是判断怪物ui是否存在
            this.monsterUI.freshHP(this.nowHP) //刷新并传入nowHP
        } 
    } 
    /**怪物受伤的逻辑，且让他只在服务端运行
     * 1、继承了脚本（script）第四行
     * 2、脚本状态为双端 
     * v0.29后脚本直接挂载在物体上，不再是子节点*/
    @mw.RemoteFunction(mw.Server)//使用远程功能装饰器，传入的参数是服务端，那么就可以调用客户端的"mhurt"函数，并在服务端运行
    private mhurtOnServer(damage:number){
        this.nowHP -= damage < 0 ? 0: this.nowHP - damage//this.nowHP = this.nowHP - damage < 0 ? 0: this.nowHP - damage
        //是否小于零？小于则值为0，不小于0则为nowHP - damage的结果
        //死亡逻辑
        if (this.nowHP<=0){
            this.gameObject.setVisibility(false)
            //设定时间复活
            setTimeout(() =>{
                this.gameObject.setVisibility(true)//延迟过后执行
                this.nowHP = this.maxHP
            },this.time*1000);//延迟函数数字代表毫秒，所以要乘1000
        }
    }
}
