import engine from "engine";
import { Action, Action1, SAction, SAction1 } from "../Delegate/Delegate";
@engine.decorators.serialize("ComponentController")
export default class ComponentController extends engine.Script {
    @engine.decorators.property({
        type: engine.TypeNames.String,
    })
    public name: string = "ComponentController";
    private updateListener: Action1<any>;
    private fixedUpdateListener: Action;

    public Initialize(): void {
        this.updateListener = new Action1<any>();
        this.fixedUpdateListener = new Action();
    }

    public onAwake(): void { 
    }

    public onStart(): void {
        
    }

    public onUpdate(dt: any): void {
        this.updateListener.invoke(dt);
    }

    public onFixedUpdate(): void {
        this.fixedUpdateListener.invoke();
    }

    public AddUpdateListener(action: SAction1<any>): void {
        this.updateListener.add(action);
    }

    public RemoveUpdateListener(action: SAction1<any>): void {
        this.updateListener.remove(action);
    }

    public AddFixedUpdateListener(action: SAction): void {
        this.fixedUpdateListener.add(action);
    }

    public RemoveFixedUpdateListener(action: SAction): void {
        this.fixedUpdateListener.remove(action);
    }

    public RemoveAllUpdateListener(): void {
        this.updateListener.clear();
    }

    public RemoveAllFixedUpdateListener(): void {
       this.fixedUpdateListener.clear();
    }
}
