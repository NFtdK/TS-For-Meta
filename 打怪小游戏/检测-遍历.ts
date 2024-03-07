public atk() {  
    // 范围检测  
    let result = QueryUtil.sphereOverlap(this.localPlayer.character.worldTransform.position, 76, false) 
    /*检测到的所有结果储存在变量“result”中（result就是扫描的所有结果）
    球形范围检测(球的中心位置this.localPlayer.character，角色位置worldTransform.position，半径，是否可见)
    */
    // 筛选出怪物  
    for (let obj of result) {  //遍历结果中的物体
        if (obj instanceof Character) {  //如果物体是角色类型
            continue  //跳过，但不结束for循环
        }  

        if (obj.tag == "Monster") {  
            // 让怪物受伤  
            let scripts = obj.getScripts()  //obj.getScripts()是获取物体挂载的所有脚本
            for (let script of scripts) {  //遍历获取到的所有脚本，名为script
                if (script instanceof MonsterScirpt) {  //如果脚本是MonsterScirpt脚本
                    let damage = script.hurt(this._nowAtk)  //调用脚本中的“hurt”函数，获取this._nowAtk的值，并赋给damage变量
                }  
            }  
        }  
    }
}