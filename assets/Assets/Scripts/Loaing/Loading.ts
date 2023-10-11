import engine from "engine";
import GetEventCenter, { E_EventName } from "../Framework/EventCenter/EventCenter";
@engine.decorators.serialize("Loading")
export default class Loading extends engine.Script {
    @engine.decorators.property({
        type: engine.TypeNames.String,
    })
    public name: string = "myname";

    public onAwake() {
        console.log("loading gaming...");
        GetEventCenter().AddEventListener(E_EventName.LoadOver, () => {
            console.log("load game over! switch to Start scene");
            engine.loader.load<engine.Scene>("Assets/Scenes/Start.scene").promise.then((scene)=>{
                engine.game.playScene(scene);
            });
        });


        engine.loader.load<engine.Prefab>("Assets/Prefabs/UI/Canvas.prefab", {
            cacheable: true
        }).promise.then((prefab) => {
            engine.loader.load<engine.Atlas>("Assets/Arts/basic.atlaspac", {
                cacheable: true
            }).promise.then((atlas) => {
                engine.loader.load<engine.Atlas>("Assets/Arts/big.atlaspac", {
                    cacheable: true
                }).promise.then((atlas) => {
                    GetEventCenter().EventTrigger(E_EventName.LoadOver);
                });
            });
        });
    }
}
