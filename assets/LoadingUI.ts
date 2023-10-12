
import engine from "engine";
@engine.decorators.serialize("LoadingUI")
export default class LoadingUI extends engine.Script {
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
