import engine from "engine";
import GetEventCenter, { E_EventName } from "../Framework/EventCenter/EventCenter";
import GetPanelMgr, { PanelLayer } from "../Framework/UI/PanelMgr";
import StartPanel from "../Start/StartPanel";
@engine.decorators.serialize("loading")
export default class loading extends engine.Script {
    @engine.decorators.property({
        type: engine.TypeNames.String,
    })
    public name: string = "myname";

    public onAwake() {
        console.log("loading asdasdasd");
        GetEventCenter().AddEventListener(E_EventName.LoadOver, () => {
            console.log("load over");
            GetPanelMgr().ShowPanel<StartPanel>("StartPanel", PanelLayer.top, StartPanel);
        });


        engine.loader.load<engine.Prefab>("Assets/Prefabs/UI/Canvas.prefab", {
            cacheable: true
        }).promise.then((prefab) => {
            GetEventCenter().EventTrigger(E_EventName.LoadOver);
        });
    }
    public onUpdate(dt) {}
    public onDestroy() {}
}
