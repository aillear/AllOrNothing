import engine from "engine";
import GetPanelMgr, { PanelLayer } from "./Framework/UI/PanelMgr";
import TestPanel from "./test/TestPanel";
@engine.decorators.serialize("main")
export default class main extends engine.Script {
    @engine.decorators.property({
        type: engine.TypeNames.String,
    })
    public name: string = "myname";

    public onAwake() {
        GetPanelMgr().ShowPanel<TestPanel>("TestPanel", PanelLayer.bot, TestPanel);
    }
    public onUpdate(dt) {}
    public onDestroy() {}
}
