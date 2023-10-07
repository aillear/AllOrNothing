# ALL OR NOTHING

又是作业啊啊啊



这里仅仅上传了 `asset/`目录之下的编辑所需要的文件以及部分配置文件



**导入方法:**

1. 将这个仓库`GIT clone` 到本地
2. 使用本地的微信开发者工具创建一个`2D`模板
3. 把克隆到的仓库内的所有东西都剪切到创建的模板里

推荐使用 [`github desktop`](https://desktop.github.com/) 来摆脱命令行的繁琐操作





# 接口

## `Delegate.ts`

### 单播委托

```typescript
export type SAction = () => void;
export type SAction1<T> = (arg: T) => void;
export type SFunc<T> = () => T;
export type SFunc1<T, U> = (arg: U) => T;
export type SAllDelegate = SAction | SAction1<any> | SFunc<any> | SFunc1<any, any>;  // 	为以上四种的联合类型
```

命名了四种委托，实际上就是给四种类型的函数起名

| 委托名       | 描述                                   |
| :----------- | :------------------------------------- |
| SAction      | 表示无参无返回值的函数                 |
| SAction1<T>  | 表示有参无返回值的函数                 |
| SFunc<T>     | 表述无参有返回值的函数， 返回值类型为T |
| SFunc1<T, U> | 表示有参有返回值的函数， 返回值类型为T |



### `class DelegateBase<T extends SAllDelegate>`

#### 描述：

多播委托基类，其中SAllDelegate类为四种单播委托的联合类型。

#### 属性：

| 变量名       | 可访问性 | 类型     | 描述                       |
| ------------ | -------- | -------- | -------------------------- |
| delegateList | protect  | Array<T> | 内部用来存储具体委托的数组 |

#### 方法：

| 方法名 | 可访问性 | 参数列表          | 返回值 | 描述                                                         |
| ------ | -------- | ----------------- | ------ | ------------------------------------------------------------ |
| add    | public   | *action*: T       | void   | 向多播委托内部添加新的委托                                   |
| remove | public   | *action*: T       | void   | 向多播委托内部移除指定委托                                   |
| invoke | public   | *arg*: any = null | any[]  | 执行委托，返回内部各个单播委托的返回值的列表。无返回值就返回空列表。 |
| clear  | public   | -                 | void   | 清除内部所有委托。                                           |



### 多播委托

```typescript
export class Action extends DelegateBase<SAction>{ }
export class Action1<T> extends DelegateBase<SAction1<T>> { }
export class Func<T> extends DelegateBase<SFunc<T>> { }
export class Func1<T, U> extends DelegateBase<SFunc1<T, U>> { }

export type AllDelegate = Action | Action1<any> | Func<any> | Func1<any, any>;  // 所有多播委托的别名
```

通过继承基类实现了四种多播委托

| 委托名     | 描述                                   |
| ---------- | -------------------------------------- |
| Action     | 无参无返回值的多播委托                 |
| Action<T>  | 有参无返回值的多播委托                 |
| Func<T>    | 无参有返回值的多播委托， 返回值类型为T |
| Func<T, U> | 有参有返回值的多播委托， 返回值类型为T |



## `EventCenter.ts`

### `export enum E_EventName`

#### 描述：

事件枚举类型，在此处添加需要的事件



### `class EventInfo`

#### 描述：

无参数的事件信息类型，内部存储一个无参无返回的多播委托`Action`变量 `delegate`



### `class EventInfo1<T>`

#### 描述：

单参无返回的事件信息类型，内部存储一个单参无返回的多播委托`Action1` `delegate`



### `export class EventCenter`

#### 描述：

事件中心单例

#### 属性：

| 变量名    | 可访问性       | 类型                              | 描述                         |
| --------- | -------------- | --------------------------------- | ---------------------------- |
| instance  | private static | EventCenter                       | 单例实现                     |
| eventMap  | private        | Map<E_EventName, EventInfo>       | 用来存储无参无返回的事件监听 |
| eventMap1 | private        | Map<E_EventName, EventInfo1<any>> | 用来存储单参无返回的事件监听 |

#### 方法：

| 方法名                  | 可访问性      | 参数列表                                        | 返回值      | 描述                                                         |
| ----------------------- | ------------- | ----------------------------------------------- | ----------- | ------------------------------------------------------------ |
| GetInstance             | public static | -                                               | EventCenter | 单例实现                                                     |
| AddEventListener        | public        | *eventName*: E_EventName, *action*: SAction     | void        | 提供给外界监听某个事件的接口，外界委托执行的函数为无参无返回值 |
| AddEventListener1<T>    | public        | *eventName*: E_EventName, *action*: SAction1<T> | void        | 提供给外界监听某个事件的接口，外界委托执行的函数为单参无返回值 |
| RemoveEventListener     | public        | *eventName*: E_EventName, *action*: SAction     | void        | 提供给外界取消监听某个事件的接口，外界委托执行的函数为无参无返回值 |
| RemoveEventListener1<T> | public        | *eventName*: E_EventName, *action*: SAction1<T> | void        | 提供给外界取消监听某个事件的接口，外界委托执行的函数为单参无返回值 |
| EventTrigger            | public        | *eventName*: E_EventName                        | void        | 提供给外界触发某个事件的接口，触发的组为监听了无参无返回值的组 |
| EventTrigger1<T>        | public        | *eventName*: E_EventName, *info*: T             | void        | 提供给外界触发某个事件的接口，触发的组为监听了单参无返回值的组 `info`为参数 |
| ClearEvent              | public        | *eventName*: E_EventName                        | void        | 清除某个事件的监听，清除的组为监听了无参无返回值的组         |
| ClearEvent1             | public        | *eventName*: E_EventName                        | void        | 清除某个事件的监听，清除的组为监听了单参无返回值的组         |
| Clear                   | public        | -                                               | void        | 清除所有事件监听                                             |



## `BasePanel.ts`

### `export default abstract class BasePanel extends engine.Script`

#### 描述：

面板基类，挂载到面板预制件的根节点上使用。本身为抽象类，不可被实例化，需要由具体子类继承之后才可使用。

#### 属性：

| 变量名 | 可访问性 | 类型                                 | 描述                                                         |
| ------ | -------- | ------------------------------------ | ------------------------------------------------------------ |
| dic    | private  | Map<string, Array<engine.Component>> | 存储了此面板下所有节点的组件，以节点名为键，节点上的组件列表为值 |

#### 方法：

| 方法名                                      | 可访问性        | 参数列表                                        | 返回值    | 描述                                                         |
| ------------------------------------------- | --------------- | ----------------------------------------------- | --------- | ------------------------------------------------------------ |
| onStart                                     | protect         | -                                               | void      | 由父类继承下来，在加载面板时初始化，得到该面板上的所有组件   |
| FindAllElements<T extends engine.Component> | private         | *ctor*: typeof engine.Component                 | void      | 查找该面板下所有子节点（包括孙子等等节点）的某个类型的component组件。如果是按钮组件自动添加MyOnClick的监听。 `ctor`为`T`类型的构造函数,直接传类名即可 |
| GetControl<T extends engine.Component>      | public          | *name*: string, *ctor*: typeof engine.Component | T \| null | 得到该面板下指定名字的节点的T类型component，若找不到返回null。  `ctor`为`T`类型的构造函数,直接传类名即可 |
| onShow                                      | public abstract | -                                               | void      | 当该面板展示的时候被调用。子类重写                           |
| onHide                                      | public abstract | -                                               | void      | 当该面板隐藏的时候被调用。子类重写                           |
| MyOnClick                                   | public abstract | *name*: string                                  | void      | 按钮按下事件的监听，会自动附加到每一个`UIButton`上，每个按钮按下时都会触发该函数，同时传入被按下的按钮节点的名字`name`。子类可根据其传入的参数`name`来判断是哪一个按钮被按下。子类重写 |



## `PanelMgr.ts`

### `export enum PanelLayer`

#### 描述：

枚举类型，用来描述UI的四个层次。

| 类型 | 描述               |
| ---- | ------------------ |
| top  | 顶层               |
| mid  | 中层               |
| bot  | 下层               |
| sys  | 系统层，位于最上层 |



### `export class PanelMgr`

#### 描述：

面板管理基单例类，用于加载、管理面板的显示和隐藏

#### 属性：

| 变量名   | 可访问性       | 类型                   | 描述                                 |
| -------- | -------------- | ---------------------- | ------------------------------------ |
| instance | private static | PanelMgr               | 单例实现                             |
| top      | private        | engine.Transform2D     | top节点的`transform`属性             |
| mid      | private        | engine.Transform2D     | mid节点的`transform`属性             |
| bot      | private        | engine.Transform2D     | bot节点的`transform`属性             |
| sys      | private        | engine.Transform2D     | sys节点的`transform`属性             |
| canvas   | public         | engine.Entity          | canvas节点，所有的面板都挂载在这上面 |
| panelMap | private        | Map<string, BasePanel> | 存储面板，键为面板预制件的名字       |

#### 方法：

| 方法名                         | 可访问性      | 参数列表                                                     | 返回值                      | 描述                                                         |
| ------------------------------ | ------------- | ------------------------------------------------------------ | --------------------------- | ------------------------------------------------------------ |
| GetInstance                    | public static | -                                                            | PanelMgr                    | 单例实现                                                     |
| ShowPanel<T extends BasePanel> | public        | *name*: string, *layer*: PanelLayer, *ctor*: typeof engine.Component | void                        | 把预制件名为`name`的面板加载显示到`layer`对应的层级里。`ctor`为`T`类型的构造函数,直接传类名即可 |
| HidePanel                      | public        | *name*: string                                               | void                        | 隐藏名为`name`的面板                                         |
| GetPanel<T extends BasePanel>  | public        | *name*: string                                               | T \| null                   | 得到名为`name`的`T`类型的面板                                |
| GetLayer                       | public        | *layer*: PanelLayer                                          | engine.Transform2D  \| null | 得到`layer`对应的节点的`transform`                           |



## `ComponentController.ts`

### `export default class ComponentController extends engine.Script`

#### 描述:

公共component的控制脚本，由`publicComponentMgr`自动创建在对应节点上。

#### 属性：

| 变量名              | 可访问性 | 类型         | 描述                                       |
| ------------------- | -------- | ------------ | ------------------------------------------ |
| name                | public   | string       | 自动生成的                                 |
| updateListener      | private  | Action1<any> | 帧更新委托，在每次此脚本的帧更新时调用     |
| fixedUpdateListener | private  | Action       | 物理更新事件，在每次此脚本的物理更新时调用 |

#### 方法：

| 方法名                       | 可访问性 | 参数列表                | 返回值 | 描述                                                         |
| ---------------------------- | -------- | ----------------------- | ------ | ------------------------------------------------------------ |
| Initialize                   | public   | -                       | void   | 初始化此脚本。不在onStart内和onAwake内进行，避免初始化不及时 |
| onAwake                      | public   | -                       | void   | 继承自父类engine.Script                                      |
| onStart                      | public   | -                       | void   | 继承自父类engine.Script                                      |
| onUpdate                     | public   | *dt*：any               | void   | 继承自父类engine.Script，执行帧更新委托                      |
| onFixedUpdate                | public   | -                       | void   | 继承自父类engine.Script，执行物理更新委托                    |
| AddUpdateListener            | public   | *action*: SAction1<any> | void   | 添加帧更新委托                                               |
| RemoveUpdateListener         | public   | *action*: SAction1<any> | void   | 移除指定帧更新委托                                           |
| AddFixedUpdateListener       | public   | *action*: SAction       | void   | 添加物理帧更新委托                                           |
| RemoveFixedUpdateListener    | public   | *action*: SAction       | void   | 移除指定物理帧更新委托                                       |
| RemoveAllUpdateListener      | public   | -                       | void   | 移除所有帧更新委托                                           |
| RemoveAllFixedUpdateListener | public   | -                       | void   | 移除所有物理帧更新委托                                       |



## `PublicComponent.ts`

### `export class PublicComponentMgr`

#### 描述：

给外界提供的接口，让非继承自`engine.script`的类也能使用到其相关的生命周期函数，本身为单例类。

#### 属性：

| 变量名     | 可访问性       | 类型                | 描述                                                         |
| ---------- | -------------- | ------------------- | ------------------------------------------------------------ |
| instance   | private static | PublicComponentMgr  | 单例实现                                                     |
| controller | public         | ComponentController | 控制的公共脚本对象上的脚本，此对象为持久对象，不随着场景切换而切换 |

#### 方法：

| 方法名                       | 可访问性      | 参数列表                | 返回值             | 描述                              |
| ---------------------------- | ------------- | ----------------------- | ------------------ | --------------------------------- |
| GetInstance                  | public static | -                       | PublicComponentMgr | 单例实现                          |
| AddUpdateListener            | public        | *action*: SAction1<any> | void               | 将函数添加到update的委托里        |
| RemoveUpdateListener         | public        | *action*: SAction1<any> | void               | 从update的委托移除出指定函数      |
| AddFixedUpdateListener       | public        | *action*: SAction       | void               | 将函数添加到fixedUpdate的委托里   |
| RemoveFixedUpdateListener    | public        | *action*: SAction       | void               | 从fixedUpdate的委托移除出指定函数 |
| RemoveAllUpdateListener      | public        | -                       | void               | 清空update的委托                  |
| RemoveAllFixedUpdateListener | public        | -                       | void               | 清空fixedUpdate的委托             |



## `AudioInfoMap.ts`

### `const SoundInfoMap: Map<string, number>` 

#### 描述：

音效的信息字典，就是一个字典。如果添加了音乐需要在这里添加相关信息：

*添加格式如下: key为 类型 + 名称, value为该音效的数量*



## `AudioMgr.ts`

### `export enum E_SoundType`

#### 描述：

音效种类的枚举。播放音乐需要指定相对应的种类。



### `export class SoundInfo`

#### 描述：

用来播放音效的时候使用，只需要输入音效的名字和种类即可生成对应的音效信息

#### 属性：

| 变量名 | 可访问性 | 类型        | 描述           |
| ------ | -------- | ----------- | -------------- |
| path   | public   | string      | 音效资源的路径 |
| type   | public   | E_SoundType | 音效资源的种类 |

#### 方法：

这里只有构造函数，介绍下构造函数的使用方法

| 方法名      | 可访问性 | 参数列表                                                     | 返回值     | 描述       |
| ----------- | -------- | ------------------------------------------------------------ | ---------- | ---------- |
| constructor | public   | *name*:string, *type*:E_SoundType, *fileExt*: string = "mp3" ,*index*: number = -1 | 新建的对象 | 在下面细说 |

- name：音效资源的名称，不需要输入索引和后缀。比如资源文件`PlankDestroy_0.wav`，则输入`PlankDestroy`即可
- type： 音效资源的种类
- fileExt：音效资源的后缀，默认为`wav`
- index：同种音效的索引值，当一个音效为一组不同的音效资源组合而成时，其可生效，当其为-1时代表随机选取一个资源进行播放，当其为具体值时播放指定索引的资源



### `export class AudioMgr`

#### 描述：

管理音乐音效播放的单例类。

#### 属性：

| 变量名          | 可访问性       | 类型                                        | 描述                                        |
| --------------- | -------------- | ------------------------------------------- | ------------------------------------------- |
| instance        | private static | AudioMgr                                    | 单例实现                                    |
| AudioObj        | public         | engine.Entity                               | 播放音效的节点                              |
| BGM             | private        | engine.AudioSource                          | 播放BGM的组件                               |
| _BGMVolume      | private        | number                                      | BGM的音量，为get， set属性                  |
| playingSoundMap | private        | Map<E_SoundType, Array<engine.AudioSource>> | 正在播放中的音效的组件map，按照音效类型存储 |
| soundVolume     | private        | Map<E_SoundType, number>                    | 各个音效的音量大小                          |
| preparedSource  | private        | Array<engine.AudioSource>                   | 当前可用的音效播放组件数组                  |

#### 方法：

| 方法名          | 可访问性      | 参数列表                                                     | 返回值             | 描述                                                         |
| --------------- | ------------- | ------------------------------------------------------------ | ------------------ | ------------------------------------------------------------ |
| GetInstance     | public static | -                                                            | AudioMgr           | 单例实现                                                     |
| PlayBGM         | public        | *name*: string                                               | void               | 播放一段BGM，输入BGM的名称即可                               |
| StopBGM         | public        | -                                                            | void               | 停止播放BGM                                                  |
| PauseBGM        | public        | -                                                            | void               | 暂停播放BGM                                                  |
| PlaySound       | public        | *info*: SoundInfo, *callBack*: SAction1<engine.AudioSource> = null | void               | 播放一段音效，callBack为回调函数，传入的参数为播放此音效的audioSource，主要用来保存 |
| StopSound       | public        | *type*: E_SoundType, *source*: engine.AudioSource            | void               | 停止播放音效，传入要停止的audioSource                        |
| SetSoundVolume  | public        | *type* :E_SoundType, *volume*: number                        | void               | 设置某个音效的音量。如果未设置则在键值对里添加新值，在构造函数里被调用来对每一个类型进行生成初始化 |
| GetSoundVolume  | public        | *type* :E_SoundType                                          | void               | 得到某个音效的音量                                           |
| GetFreeSource   | private       | -                                                            | engine.AudioSource | 得到可用的source，若都不可用则新生成一个                     |
| CheckDoneSource | private       | -                                                            | void               | 检查是否有完成播放的Source，并将其标志为可用，在构造函数里被添加到公共component的update监听里实现每帧运行 |



## `Uitility.ts`

### `export default class Utility`

#### 描述：

只包含静态方法的工具类。

#### 工具函数：

| 方法名                                              | 可访问性 | 参数列表                                                 | 返回值         | 描述                                                      |
| --------------------------------------------------- | -------- | -------------------------------------------------------- | -------------- | --------------------------------------------------------- |
| GetComponentsInChildren<T extends engine.Component> | public   | *entity*: engine.Entity, *ctor*: typeof engine.Component | T[]            | 递归得到该节点的所有子节点的的类型为T的脚本。             |
| RandomInt                                           | public   | *from*:number, *to*:number                               | number \| null | *返回位于 [from, to) 之间的随机整数,如果输入有误返回null* |

