
import engine from "engine";
import EventCenter, { E_EventName } from "./Framework/EventCenter/EventCenter";
import GetEventCenter from "./Framework/EventCenter/EventCenter";
@engine.decorators.serialize("TEST")
export default class TEST extends engine.Script {
	@engine.decorators.property({
		type: engine.TypeNames.String
	})
	public name: string = "myname"
	public onAwake() {
	}
	public onUpdate(dt) {
	}

	public onTouchStart() {
		console.log("btn", 200);
		GetEventCenter().EventTrigger1<number>(E_EventName.TestEvent, 100);
	}
	public onDestroy() {

	}
}
