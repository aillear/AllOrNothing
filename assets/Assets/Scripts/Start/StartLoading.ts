import engine from "engine";
import GetEventCenter, { E_EventName } from "../Framework/EventCenter/EventCenter";
import GetPanelMgr from "../Framework/UI/PanelMgr";
@engine.decorators.serialize("StartLoading")
export default class StartLoading extends engine.Script {
    @engine.decorators.property({
        type: engine.TypeNames.String,
    })
    public name: string = "myname";

	public onAwake() {
        console.log("loading Canvas");
        GetEventCenter().AddEventListener(E_EventName.LoadOver, () => {
            console.log("load over");
            engine.loader.load<engine.Scene>("Assets/Scenes/Gaming.scene").promise.then((scene)=>{
                engine.game.playScene(scene);
            });
        });


        engine.loader.load<engine.Prefab>("Assets/Prefabs/UI/Canvas.prefab", {
            cacheable: true
        }).promise.then((prefab) => {
            engine.loader.load<engine.Atlas>("Assets/Arts/basic.atlaspac", {
                cacheable: true
            }).promise.then((atlas) => {
                GetEventCenter().EventTrigger(E_EventName.LoadOver);
            });
        });
    }
    public onUpdate(dt) {}
    public onDestroy() {}
}
