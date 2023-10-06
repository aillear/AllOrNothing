import engine from "engine";
import GetPanelMgr, { PanelLayer } from "./Framework/UI/PanelMgr";
import TestPanel from "./test/TestPanel";
import GetPublicComponentMgr from "./Framework/PublicConponent/PublicComponent";
@engine.decorators.serialize("main")
export default class main extends engine.Script {
    @engine.decorators.property({
        type: engine.TypeNames.String,
    })
    public name: string = "myname";

    public onAwake() {
        GetPanelMgr().ShowPanel<TestPanel>("TestPanel", PanelLayer.bot, TestPanel);
        console.log("done");
    }
    public onUpdate(dt) {}
    public onDestroy() {}
}
