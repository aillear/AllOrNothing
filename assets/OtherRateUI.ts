
import engine from "engine";
@engine.decorators.serialize("OtherRateUI")
export default class OtherRateUI extends engine.Script {
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
