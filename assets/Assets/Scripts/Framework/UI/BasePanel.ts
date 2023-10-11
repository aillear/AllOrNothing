
import engine from "engine";
import Utility from "../Uitility";

@engine.decorators.serialize("BasePanel")
export default abstract class BasePanel extends engine.Script {
	@engine.decorators.property({
		type: engine.TypeNames.String
	})


	private dic: Map<string, Array<engine.Component>> = new Map<string, Array<engine.Component>>([]);;	


	public onAwake() {
		this.dic = new Map<string, Array<engine.Component>>([]);
		this.FindAllElements<engine.UIButton>(engine.UIButton);
		this.FindAllElements<engine.UILabel>(engine.UILabel);
		this.FindAllElements<engine.UIRichText>(engine.UIRichText);
		this.FindAllElements<engine.UITextInput>(engine.UITextInput);
		this.FindAllElements<engine.UIToggle>(engine.UIToggle);
		this.FindAllElements<engine.UIToggleGroup>(engine.UIToggleGroup);
		this.FindAllElements<engine.UISprite>(engine.UISprite);
		this.FindAllElements<engine.TouchInputComponent>(engine.TouchInputComponent);
		// 初始化并且获取面板上的组件, 不知道为啥不能用.换到下面onStart里
	}

	public onStart(): void {
	}

	protected FindAllElements<T extends engine.Component>(ctor: typeof engine.Component): void{
		let temp: T[] = Utility.GetComponentsInChildren<T>(this.entity, ctor);

		for (let control of temp) {
			let name = control.entity.name;
			if (this.dic.has(name))
				this.dic.get(name).push(control);
			else
				this.dic.set(name, new Array<engine.Component>(control));

			// 如果是按钮,直接把他监听了.
			if (control instanceof engine.UIButton) {
				(control as engine.UIButton).onClick.add(() => {
                    this.MyOnClick(name);
                });
				(control as engine.UIButton).onTouchOver.add(() => {
					this.MyTouchOver(name);
				});
			}
		}
	}

	// 得到名字为
	public GetControl<T extends engine.Component>(name: string, ctor: typeof engine.Component): T | null {
		if (this.dic.has(name)) {
			for (let control of this.dic.get(name)) {
				if (control instanceof ctor) {
					return control as T;
				}
			}
		}	
		return null;
	}

	// 子类重写,显示面板时调用.
	public abstract onShow(): void;

	// 子类重写,隐藏面板时调用
	public abstract onHide(): void;

	// 按钮处理函数. 子类重写
	public abstract MyOnClick(name: string): void;

	public abstract MyTouchOver(name: string): void;
}
