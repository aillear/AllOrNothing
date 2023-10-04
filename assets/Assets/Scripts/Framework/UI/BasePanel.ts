
import engine from "engine";
@engine.decorators.serialize("BasePanel")
export default class BasePanel extends engine.Script {
	@engine.decorators.property({
		type: engine.TypeNames.String
	})
	public name: string = "myname"
	private dic: { [key: string]: number }


	public onAwake() {

	}
	public onUpdate(dt) {

	}
	public onDestroy() {

	}

	private FindAllElements<T extends engine.Component>() {
		var temp: T[] = this.entity.getComponents<T>(engine.Component);
		var temp22 = engine.UIButton
		var aaa = engine.UIRichText
	}
	
}
