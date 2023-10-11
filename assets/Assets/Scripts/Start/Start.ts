import engine from "engine";
import GetPanelMgr, { PanelLayer } from "../Framework/UI/PanelMgr";
import StartChooseUI from "../UI/StartChooseUI";
@engine.decorators.serialize("Start")
export default class Start extends engine.Script {
    @engine.decorators.property({
        type: engine.TypeNames.String,
    })
    public name: string = "myname";

    public onAwake() {
        GetPanelMgr().HideAllPanel();
        GetPanelMgr().ShowPanel<StartChooseUI>("Start/StartChooseUI", PanelLayer.bot, StartChooseUI);
    }
    public onUpdate(dt) {}
    public onDestroy() {}
}
