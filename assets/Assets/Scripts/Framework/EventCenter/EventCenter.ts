
import * as basic from "../Delegate/Delegate";

export enum E_EventName{
	TestEvent,
	LoadOver,
	ChangeState,	// 切换游戏阶段事件

	SelfJettonChange,	// 赌注切换显示
	OtherJettonChange,	
	RateChange,	//  倍率切换显示
	RoundChange,	// 回合切换显示
	InningChange,	// 局切换显示

	SelfSelectDiceOver,   // self选择骰子完成
	SelfSelectRateOver,   // self选择倍率完成
	SelfConfirmJettonOver, // self确认筹码变动完成
	SelfAccountConfirmOver, // self确认AccountUI完成


	JettonChangeUI,  	  // JettonChangeUI 想要知道self的score变化
}

class EventInfo {
	public delegate: basic.Action;
	constructor(arg: basic.SAction) {
		this.delegate = new basic.Action();
		this.delegate.add(arg);
	}	
}

class EventInfo1<T> {
	public delegate: basic.Action1<T>;
	constructor(arg: basic.SAction1<T>) {
		this.delegate = new basic.Action1();
		this.delegate.add(arg);
	}
}

export default function GetEventCenter() {
	return EventCenter.GetInstance();
}

// 事件中心模块
export class EventCenter {
	private static instance: EventCenter;
	private eventMap: Map<E_EventName, EventInfo>;
	private eventMap1: Map<E_EventName, EventInfo1<any>>;

	private constructor() {
		this.eventMap = new Map<E_EventName, EventInfo>([]);
		this.eventMap1 = new Map<E_EventName, EventInfo1<any>>([]);
	}

	public static GetInstance(): EventCenter {
		if (!this.instance) {
			this.instance = new EventCenter();
		}
		return this.instance;
	}

	// 添加事件监听
	public AddEventListener(eventName: E_EventName, action: basic.SAction): void {
		if (this.eventMap.has(eventName)) {
			this.eventMap.get(eventName).delegate.add(action);
		}
		else {
			this.eventMap.set(eventName, new EventInfo(action));
		}
	}

	public AddEventListener1<T>(eventName: E_EventName, action: basic.SAction1<T>): void {
		if (this.eventMap1.has(eventName)) {
			this.eventMap1.get(eventName).delegate.add(action);
		}
		else {
			this.eventMap1.set(eventName, new EventInfo1<T>(action));
		}
	}

	// 删除事件监听
	public RemoveEventListener(eventName: E_EventName, action: basic.SAction): void {
		if (!this.eventMap.has(eventName)) return;
		this.eventMap.get(eventName).delegate.remove(action);
	}

	public RemoveEventListener1<T>(eventName: E_EventName, action: basic.SAction1<T>): void {
		if (!this.eventMap1.has(eventName)) return;
		this.eventMap1.get(eventName).delegate.remove(action);
	}

	public EventTrigger(eventName: E_EventName) {
		if (this.eventMap.has(eventName)) {
			this.eventMap.get(eventName).delegate.invoke();
		}
	}

	public EventTrigger1<T>(eventName: E_EventName, info: T) {
		if (this.eventMap1.has(eventName)) {
			this.eventMap1.get(eventName).delegate.invoke(info);
		}
	}

	// 清除事件监听
	// 清除某个事件
	public ClearEvent(eventName: E_EventName): void {
		if (!this.eventMap.has(eventName)) return;
		this.eventMap.delete(eventName);
	}

	public ClearEvent1(eventName: E_EventName): void {
		if (!this.eventMap1.has(eventName)) return;
		this.eventMap1.delete(eventName);
	}

	// ALL
	public Clear(): void {
		this.eventMap.clear();
		this.eventMap1.clear();
	}
}
