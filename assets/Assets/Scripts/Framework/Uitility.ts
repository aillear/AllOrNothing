
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
}