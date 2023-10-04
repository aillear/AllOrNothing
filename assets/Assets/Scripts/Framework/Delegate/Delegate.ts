
// 给单委托重命名
export type SAction = () => void;
export type SAction1<T> = (arg: T) => void;
export type SFunc<T> = () => T;
export type SFunc1<T, U> = (arg: U) => T;

// 所有单委托类型
export type SAllDelegate = SAction | SAction1<any> | SFunc<any> | SFunc1<any, any>;


// 多播委托基类
class DelegateBase<T extends SAllDelegate>{
    protected delegateList: Array<T> = new Array<T>();
    public add(action: T) {
        this.delegateList.push(action);
    }

    public remove(action: T) {
        let index: number = this.delegateList.indexOf(action);
        if (index == -1) return;
        this.delegateList.splice(index, 1);
    }

    public invoke(arg: any = null) {
        let result: Array<any> = new Array<any>();
        for (let action of this.delegateList) {
            if (action(arg)) {
                result.push(arg);
            }
        }
        return result;
    }

    public clear() {
        this.delegateList = new Array<T>();
    }
}

// 多播委托
export class Action extends DelegateBase<SAction>{ }
export class Action1<T> extends DelegateBase<SAction1<T>> { }
export class Func<T> extends DelegateBase<SFunc<T>> { }
export class Func1<T, U> extends DelegateBase<SFunc1<T, U>> { }

export type AllDelegate = Action | Action1<any> | Func<any> | Func1<any, any>;
