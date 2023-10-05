import engine from "engine";
import BasePanel from "../Framework/UI/BasePanel";
import GetPanelMgr from "../Framework/UI/PanelMgr";
@engine.decorators.serialize("TestPanel")
export default class TestPanel extends BasePanel {
    @engine.decorators.property({
        type: engine.TypeNames.String,
    })

    public onAwake() {}
    public onUpdate(dt) {}
    public onDestroy() {}

    public MyOnClick(name: string): void {
        if (name == "btn1"){
            console.log("click 1");
        } 
        else if (name == "btn2"){
            console.log("click 2");
        }
        else if (name == "btn3"){
            GetPanelMgr().HidePanel("TestPanel");
        }
    }
    public onShow(): void {
        
    }
    public onHide(): void {
        
    }
}
