import engine from "engine";
import GetEventCenter, { E_EventName } from "../Framework/EventCenter/EventCenter";
@engine.decorators.serialize("loading")
export default class loading extends engine.Script {
    @engine.decorators.property({
        type: engine.TypeNames.String,
    })
    public name: string = "myname";

    public onAwake() {
        console.log("loading");
        GetEventCenter().AddEventListener(E_EventName.LoadOver, () => {
            console.log("load over");
            engine.loader.load<engine.Scene>("Assets/Scenes/testPanel.scene").promise.then((scene) => {
                engine.game.playScene(scene);;
            });
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
