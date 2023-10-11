import engine from "engine";
import BasePanel from "../Framework/UI/BasePanel";
import GetEventCenter, { E_EventName } from "../Framework/EventCenter/EventCenter";
import GetPanelMgr from "../Framework/UI/PanelMgr";
import GetAudioMgr, { E_SoundType, SoundInfo } from "../Framework/AudioMgr/AudioMgr";
@engine.decorators.serialize("JettonChangeUI")
export default class JettonChangeUI extends BasePanel {

    @engine.decorators.property({
        type: engine.TypeNames.String,
    })
    public name: string = "myname";
    private jettonChangeLabel:engine.UILabel;
    private score:engine.UILabel;

    public onUpdate(dt) {}
    public onDestroy() {}
    public onShow(): void {
        this.jettonChangeLabel = this.GetControl<engine.UILabel>("JettonChange", engine.UILabel);
        this.score = this.GetControl<engine.UILabel>("ScoreBar", engine.UILabel);

        // 监听gaming的数据
        GetEventCenter().AddEventListener1<number[]>(E_EventName.JettonChangeUI, (change)=>{
            this.jettonChangeLabel.text = change[0].toString();
            this.score.text = `己方分数:${change[1]}\n对方分数:${change[2]}`
        });
        // 向gameing申请消息
        GetEventCenter().EventTrigger(E_EventName.JettonChangeUI);
    }

    public onHide(): void {
        // 清除事件监听
        GetEventCenter().ClearEvent(E_EventName.JettonChangeUI);
        GetEventCenter().ClearEvent1(E_EventName.JettonChangeUI);
    }
    public MyOnClick(name: string): void {
        GetAudioMgr().PlaySound(new SoundInfo("Click", E_SoundType.Effects, "wav", 0));
        if (name == "Confirm") {
            GetEventCenter().EventTrigger(E_EventName.SelfConfirmJettonOver);
            GetPanelMgr().HidePanel("Gaming/JettonChangeUI");
        }
    }
    public MyTouchOver(name: string): void {
    }
}
