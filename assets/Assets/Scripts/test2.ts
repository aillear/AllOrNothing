
import engine from "engine";
import EventCenter, { E_EventName } from "./Framework/EventCenter/EventCenter";
import GetEventCenter from "./Framework/EventCenter/EventCenter";
@engine.decorators.serialize("test2")
export default class test2 extends engine.Script {
	@engine.decorators.property({
		type: engine.TypeNames.String
	})
	public name: string = "myname"

	public onTouchStart() {
		console.log("btn", -200);
		GetEventCenter().EventTrigger1<number>(E_EventName.TestEvent, -100);
	}
	public onAwake() {

	}
	public onUpdate(dt) {

	}

	public onDestroy() {

	}
}
