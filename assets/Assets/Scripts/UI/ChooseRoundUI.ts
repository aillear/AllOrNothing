import engine from "engine";
import BasePanel from "../Framework/UI/BasePanel";
import GetAudioMgr, { E_SoundType, SoundInfo } from "../Framework/AudioMgr/AudioMgr";
import GetDataKeeper from "../Framework/DataKeeper/DataKeeper";
import GetPanelMgr from "../Framework/UI/PanelMgr";
@engine.decorators.serialize("ChooseRoundUI")
export default class ChooseRoundUI extends BasePanel {
    @engine.decorators.property({
        type: engine.TypeNames.String,
    })
    public name: string = "myname";
	
    public onUpdate(dt) {}
    public onDestroy() {}
    public onShow(): void {}
    public onHide(): void {}
    public MyOnClick(name: string): void {
		GetAudioMgr().PlaySound(new SoundInfo("Click", E_SoundType.Effects, "wav", 0));
		if (name == "Inning1") {
			this.DoSomething(1);
		}
		else if (name == "Inning3") {
			this.DoSomething(3);
		}
		else if (name == "Inning5") {
			this.DoSomething(5);
		}
		else if (name == "InningInfinite") {
			this.DoSomething(114514);
		}
		else if (name == "Close") {
			GetPanelMgr().HidePanel("Start/ChooseRoundUI");
		}
	}
    public MyTouchOver(name: string): void {}

	private DoSomething(maxInnings) {
		engine.loader.load<engine.Scene>("Assets/Scenes/Gaming.scene").promise.then((scene) => {
			GetDataKeeper().SetData("MaxInnings", maxInnings);
			GetPanelMgr().HidePanel("Start/StartChooseUI");
			GetPanelMgr().HidePanel("Start/ChooseRoundUI");
			engine.game.playScene(scene);
		})
		
		
	}
}
