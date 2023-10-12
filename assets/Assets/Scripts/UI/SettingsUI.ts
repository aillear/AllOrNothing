import engine from "engine";
import BasePanel from "../Framework/UI/BasePanel";
import GetPanelMgr, { PanelLayer, PanelMgr } from "../Framework/UI/PanelMgr";
import GetAudioMgr, { E_SoundType, SoundInfo } from "../Framework/AudioMgr/AudioMgr";
import GetAtlasMgr, { AtlasMgr } from "../Framework/AtlasMgr/AtlasMgr";
import GetDataKeeper from "../Framework/DataKeeper/DataKeeper";
import GetEventCenter, { E_EventName } from "../Framework/EventCenter/EventCenter";
import { State } from "../Gaming/Gaming";
@engine.decorators.serialize("SettingsUI")
export default class SettingsUI extends BasePanel {
    @engine.decorators.property({
        type: engine.TypeNames.String,
    })
    public name: string = "myname";
    private selectedButtonsprite: engine.UISprite;

    public onUpdate(dt) {}
    public onDestroy() {}
    public onShow(): void {
        this.selectedButtonsprite = this.GetControl<engine.UISprite>("SetAudioButton", engine.UISprite);
        if (GetAudioMgr().GetSoundVolume(E_SoundType.Effects) == 0) {
            this.selectedButtonsprite.spriteFrame = GetAtlasMgr().atlas.getSpriteframeByKey("Assets/Arts/Basic/selectedButton.png");
        }
        else {
            this.selectedButtonsprite.spriteFrame = GetAtlasMgr().atlas.getSpriteframeByKey("Assets/Arts/Basic/selectedButton_p.png");
        }
    }
    public onHide(): void {}
    public MyOnClick(name: string): void {
        GetAudioMgr().PlaySound(new SoundInfo("Click", E_SoundType.Effects, "wav", 0));
        if (name == "Back") {
            GetPanelMgr().HidePanel("Gaming/SettingsUI");
        }
        else if (name == "MainMenu") {
            GetPanelMgr().HidePanel("Gaming/SettingsUI");
            GetEventCenter().EventTrigger1<State>(E_EventName.ChangeState, State.Over);
        }
        else if (name == "SetAudioButton") {
            let audioVolumn = GetAudioMgr().GetSoundVolume(E_SoundType.Effects);
            if (audioVolumn == 0) {
                GetAudioMgr().SetSoundVolume(E_SoundType.Effects, 1);
                this.selectedButtonsprite.spriteFrame = GetAtlasMgr().atlas.getSpriteframeByKey("Assets/Arts/Basic/selectedButton_p.png");
            } 
            else {
                GetAudioMgr().SetSoundVolume(E_SoundType.Effects, 0);
                this.selectedButtonsprite.spriteFrame = GetAtlasMgr().atlas.getSpriteframeByKey("Assets/Arts/Basic/selectedButton.png");
            }
        }
    }
    public MyTouchOver(name: string): void {}
}
