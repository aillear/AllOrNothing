
import engine from "engine";
@engine.decorators.serialize("ChooseDiceUI")
export default class ChooseDiceUI extends engine.Script {
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
