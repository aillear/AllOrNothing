
import engine from "engine";
@engine.decorators.serialize("ObjPoor")
export default class ObjPoor extends engine.Script {
  @engine.decorators.property({
    type: engine.TypeNames.String
  })
  public name: string = "myname"
  
  public onAwake() {

  }
  public onUpdate(dt) {

  }
  public onDestroy() {

  }
}
