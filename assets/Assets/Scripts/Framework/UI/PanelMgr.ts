import engine from "engine";
import Utils from "../../../../ui/common/Utils";
import BasePanel from "./BasePanel";

export enum PanelLayer {
	top, 
	mid,
	bot,
	sys,
}

// 用这个调用好一些
export default function GetPanelMgr() {
	return PanelMgr.GetInstance();
}

export class PanelMgr {
	private static instance: PanelMgr;

	private top: engine.Transform2D;
	private mid: engine.Transform2D;
	private bot: engine.Transform2D;
	private sys: engine.Transform2D;
	public canvas: engine.Entity;

	private panelMap: Map<string, BasePanel>;

	// 初始化
	private constructor() {
		const prefab = engine.loader.getAsset<engine.Prefab>("Assets/Prefabs/UI/Canvas.prefab");
		const prefabInstance = prefab.instantiate()
		const rootScene = engine.game.activeScene2D.root;
		rootScene.transform2D.addChild(prefabInstance.transform2D);
		this.canvas = prefabInstance;
		this.top = Utils.getChildByName(prefabInstance, "top").transform2D;
		this.mid = Utils.getChildByName(prefabInstance, "mid").transform2D;
		this.bot = Utils.getChildByName(prefabInstance, "bot").transform2D;
		this.sys = Utils.getChildByName(prefabInstance, "sys").transform2D;

		this.panelMap = new Map<string, BasePanel>([]);

		// engine.loader.load<engine.Prefab>("Assets/Prefabs/UI/Canvas.prefab").promise.then((prefab) => {
		// 	const prefabInstance = prefab.instantiate()
		// 	const rootScene = engine.game.activeScene2D.root;
		// 	rootScene.transform2D.addChild(prefabInstance.transform2D);
		// 	this.canvas = prefabInstance;
		// 	this.top = Utils.getChildByName(prefabInstance, "top").transform2D;
		// 	this.mid = Utils.getChildByName(prefabInstance, "mid").transform2D;
		// 	this.bot = Utils.getChildByName(prefabInstance, "bot").transform2D;
		// 	this.sys = Utils.getChildByName(prefabInstance, "sys").transform2D;

		// 	this.panelMap = new Map<string, BasePanel>([]);
		// 	console.log(this.panelMap);
		// })
	}

	// 单例
	public static GetInstance(): PanelMgr {
		if (!this.instance) {
			this.instance = new PanelMgr();
		}
		return this.instance;
	}

	// 显示名称为name, 类型为T的Panel
	public ShowPanel<T extends BasePanel>(name: string, layer: PanelLayer, ctor: typeof engine.Component) {
		// 存在面板不再生成
		if (this.panelMap.has(name)) {
			this.panelMap.get(name).onShow();
			return;
		}

		engine.loader.load<engine.Prefab>("Assets/Prefabs/UI/" + name + ".prefab").promise.then((prefab) => {
			let father: engine.Transform2D = this.top;
			switch (layer) {
				case PanelLayer.mid:
					father = this.mid; break;
				case PanelLayer.bot:
					father = this.bot; break;
				case PanelLayer.sys:
					father = this.sys; break;
			}

			const prefabInstance = prefab.instantiate();
			father.addChild(prefabInstance.transform2D);

			// 设置位置,不知道怎么写现在

			// 存入字典
			let panelScript: T = prefabInstance.getComponent<T>(ctor);
			panelScript.onShow();
			this.panelMap.set(name, panelScript);
		})
	}

	// 隐藏名称为name的面板
	public HidePanel(name: string) {
		if (this.panelMap.has(name)) {
			this.panelMap.get(name).onHide();
			// 销毁节点
			this.panelMap.get(name).entity.destroy();

			// 移除字典
			this.panelMap.delete(name);

		}
	}
	
	// 得到名称为name的面板
	public GetPanel<T extends BasePanel>(name: string): T | null {
		if (!this.panelMap.has(name)) return null;
		return this.panelMap.get(name) as T;
	}
	
	// 返回某个层级
	public GetLayer(layer: PanelLayer): engine.Transform2D | null {
		switch (layer) {
			case PanelLayer.bot: return this.bot;
			case PanelLayer.mid: return this.mid;
			case PanelLayer.top: return this.top;
			case PanelLayer.sys: return this.sys;
			default: return null;
		}
	}
}