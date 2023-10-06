
import engine from "engine";

export default class Utility {
    // 找到所有子节点(包括子节点的子节点)的某个component
    public static GetComponentsInChildren<T extends engine.Component>(entity: engine.Entity, ctor: typeof engine.Component): T[] {
        const childList = entity.transform2D.children;
        const childrenCount = entity.transform2D.childrenCount;
        let result:T[] = [];
        for (let i = 0; i < childrenCount; i++) {
            let child = childList[i].entity;
            result = result.concat(child.getComponents<T>(ctor));
        }
        for (let i = 0; i < childrenCount; i++) {
            let child = childList[i].entity;
            result = result.concat(this.GetComponentsInChildren(child, ctor));
        }
        return result;
    }

    // 返回位于 [from, to) 之间的随机整数,如果输入有误返回null
    public static RandomInt(from:number, to:number):number | null {
        if (from > to) { return null; }
        else if (from == to) { return from; }

        const length = to - from;
        let r:number = Math.random() * length;
        for (let i = 0; i < length; i++) {
            r -= 1;
            if (r <= 0) { return from + i; }
        }
        return null;   // 说明有问题了
    }

    // 把一个数字限制在0~1
    public static Clamp01(num:number):number{
        return Math.min(Math.max(num, 0), 1);
    }
}