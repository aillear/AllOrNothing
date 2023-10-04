import engine from "engine";

// 使用这个接口作为泛型类型 T 的约束
export default class SingletonBase {
    protected static instance: any;

    public static GetInstance<T extends SingletonBase>(this:new()=>T):T  {
        if (!this.prototype.instance) {
            this.prototype.instance = Object.create(this.prototype);
        }
        return this.prototype.instance as T;
    }
}
