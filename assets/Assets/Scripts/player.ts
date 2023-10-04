
import engine from "engine";
import EventCenter, { E_EventName } from "./Framework/EventCenter/EventCenter";
import GetEventCenter from "./Framework/EventCenter/EventCenter";
@engine.decorators.serialize("player")
export default class player extends engine.Script {
	@engine.decorators.property({
		type: engine.TypeNames.String
	})
	public name: string = "myname"
	public transform = this.getComponent<engine.Transform2D>(engine.Transform2D);
	public onAwake() {
		let rootThis = this;
		GetEventCenter().AddEventListener1<number>(E_EventName.TestEvent, (num) => { rootThis.transform.positionX += num; })
		GetEventCenter().AddEventListener1<number>(E_EventName.TestEvent, (num) => { console.log("player", num); })
	}


	public onUpdate(dt) {

	}
	public onDestroy() {

	}
}
