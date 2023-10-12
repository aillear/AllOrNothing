import engine from "engine";
import BasePanel from "../Framework/UI/BasePanel";
@engine.decorators.serialize("LoadingUI")
export default class LoadingUI extends BasePanel {
    @engine.decorators.property({
        type: engine.TypeNames.String,
    })
    public name: string = "myname";
	
    public onUpdate(dt) {}
    public onDestroy() {}
    public onShow(): void {}
    public onHide(): void {}
    public MyOnClick(name: string): void {
	}
    public MyTouchOver(name: string): void {}
}
