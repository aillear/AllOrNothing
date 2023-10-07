import engine from "engine";
import ComponentController from "./ComponentController";
import { SAction, SAction1 } from "../Delegate/Delegate";


export default function GetPublicComponentMgr(): PublicComponentMgr{
    return PublicComponentMgr.GetInstance();
}

// 公共component类,用于让非继承自engine.script的脚本可以使用component的生命周期函数.
export class PublicComponentMgr{
    private static instance: PublicComponentMgr;
    public controller: ComponentController;

    private constructor(){
        const obj = engine.game.createEntity2D("Controller");
        engine.game.markAsPersist(obj); 
        this.controller = obj.addComponent<ComponentController>(ComponentController);
        this.controller.Initialize();
    }

    public static GetInstance(): PublicComponentMgr{
        if (!this.instance) {
            this.instance = new PublicComponentMgr();
        }
        return this.instance;
    }

    public AddUpdateListener(action: SAction1<any>): void {
        this.controller.AddUpdateListener(action);
    }

    public RemoveUpdateListener(action: SAction1<any>): void {
        this.controller.RemoveUpdateListener(action);
    }

    public AddFixedUpdateListener(action: SAction): void {
        this.controller.AddFixedUpdateListener(action);
    }

    public RemoveFixedUpdateListener(action: SAction): void {
        this.controller.RemoveFixedUpdateListener(action);
    }

    public RemoveAllUpdateListener(): void {
        this.controller.RemoveAllUpdateListener();
    }

    public RemoveAllFixedUpdateListener(): void {
        this.controller.RemoveAllFixedUpdateListener();
    }
}