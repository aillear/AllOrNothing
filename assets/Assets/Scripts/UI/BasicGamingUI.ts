import engine from "engine";
import BasePanel from "../Framework/UI/BasePanel";
import GetEventCenter, { E_EventName } from "../Framework/EventCenter/EventCenter";
import Utility from "../Framework/Uitility";
import Utils from "../../../ui/common/Utils";
@engine.decorators.serialize("BasicGamingUI")
export default class BasicGamingUI extends BasePanel {
    @engine.decorators.property({
        type: engine.TypeNames.String,
    })
    public name: string = "myname";
    private selfJettonNumber: engine.UIRichText;
    private otherJettonNumber: engine.UIRichText;
    private rateNumber: engine.UIRichText;
    private roundNumber: engine.UIRichText;
    private inningNumber: engine.UIRichText;

    public onUpdate(dt) {}
    public onDestroy() {}
    public onShow(): void {
        this.selfJettonNumber = this.GetControl<engine.UIRichText>("SelfJettonNumber", engine.UIRichText);
        this.otherJettonNumber = this.GetControl<engine.UIRichText>("OtherJettonNumber", engine.UIRichText);
        this.rateNumber = this.GetControl<engine.UIRichText>("RateNumber", engine.UIRichText);
        this.roundNumber = this.GetControl<engine.UIRichText>("RoundInfo", engine.UIRichText);
        this.inningNumber = this.GetControl<engine.UIRichText>("InningInfo", engine.UIRichText);
        // 监听筹码改变事件.
        GetEventCenter().AddEventListener1<number>(E_EventName.SelfJettonChange, (number) => {
            this.selfJettonNumber.text = "己方: " + number.toString();
        });
        GetEventCenter().AddEventListener1<number>(E_EventName.OtherJettonChange, (number) => {
            this.otherJettonNumber.text = "对方: " + number.toString();
        });
        GetEventCenter().AddEventListener1<number>(E_EventName.RateChange, (number) => {
            this.rateNumber.text = number.toString();
        });
        GetEventCenter().AddEventListener1<number>(E_EventName.RoundChange, (number) => {
            this.roundNumber.text = "当前轮数: " + number.toString();
        });
        GetEventCenter().AddEventListener1<number>(E_EventName.InningChange, (number) => {
            this.inningNumber.text = "当前局数: " + number.toString();
        });
        //this.returnText = Utils.getChildByName(this.entity, "ReturnText").transform2D;
        //this.tipsText = Utils.getChildByName(this.entity, "TipsText").transform2D;
    }
    public onHide(): void {
        
    }
    public MyOnClick(name: string): void {
        if (name == "Setting") {
            // GetEventCenter().EventTrigger1<number>(E_EventName.OtherJettonChange, 666);
            // GetEventCenter().EventTrigger1<number>(E_EventName.SelfJettonChange, 1433);
            // GetEventCenter().EventTrigger1<number>(E_EventName.RateChange, 13);
            //this.returnText.topRelative = -0.3;
        }
        else if (name == "Tips"){
            //this.tipsText.topRelative = -0.3;
        }

    }

    public MyTouchOver(name: string): void {
        if (name == "Return"){
            //this.returnText.topRelative = 0;
        }
        else if (name == "Tips"){
            //this.tipsText.topRelative = 0;
        }   
    }
}
