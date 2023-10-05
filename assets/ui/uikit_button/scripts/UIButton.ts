
import engine from "engine";
import Utils from '../../common/Utils'

const TypeNames = engine.TypeNames
enum EdownEffectEnum {
  none = "none",
  scale = "scale",
  dark = "dark",
}

@engine.decorators.serialize("UIKitButton")
export default class UIKitButton extends engine.Script {
  private _downEffect: EdownEffectEnum = EdownEffectEnum.none
  private _title: string = ''
  private _iconImage: engine.SpriteFrame
  private _iconPrefab: engine.Prefab


  get labelNode(): engine.Entity {
    return Utils.getChildByName(this.entity, 'Button_Label')
  }
  get buttonNode(): engine.Entity {
    return Utils.getChildByName(this.entity, 'Button_Icon')
  }
  get touchInputComp(): engine.TouchInputComponent {
    return this.buttonNode.getComponent(engine.TouchInputComponent)
  }
  get uiButtonComp(): engine.UIButton {
    return this.buttonNode.getComponent(engine.UIButton)
  }

  // 按下效果(无/变暗/缩放)
  @engine.decorators.property.enum({
    type: EdownEffectEnum,
    tooltips: '按钮状态变化时的效果(无/变暗/缩放)'
  })
  get downEffect() {
    return this._downEffect
  }
  set downEffect(downEffect: EdownEffectEnum) {
    this._downEffect = downEffect 
    const tempColor = new engine.Color()
    if (!this.uiButtonComp || !this.touchInputComp) {
      console.error('can not find uibutton UIButtonComponent')
      return
    }
    this.touchInputComp.onTouchStart.remove(this.downEffectScaleStart)
    this.touchInputComp.onTouchEnd.remove(this.downEffectScaleEnd)
    tempColor.setValue32(0xffffffff)
    this.uiButtonComp.pressedColor = tempColor
    switch(downEffect) {
      case EdownEffectEnum.none:
        break
      case EdownEffectEnum.scale:
        this.touchInputComp.onTouchStart.add(this.downEffectScaleStart)
        this.touchInputComp.onTouchEnd.add(this.downEffectScaleEnd)
        break
      case EdownEffectEnum.dark:
        tempColor.a = 255 * 0.7
        this.uiButtonComp.pressedColor = tempColor
        break
    }
  }
  
  // 文本标题
  @engine.decorators.property({
    type: TypeNames.String,
  })
  get title() {
    return this._title
  }
  set title(title: string) {
    this._title = title
    if (this.labelNode) {
      const labelComp: engine.UILabel = this.labelNode.getComponent(engine.UILabel)
      if (labelComp) {
        labelComp.text = this._title
      }
    }
  }

  // 图形标题(spriteframe或者prefab)
  @engine.decorators.property({
    type: engine.SpriteFrame,
    required: false,
    tooltips: '普通状态的按钮背景图资源'
  })
  get iconImage() {
    return this._iconImage
  }
  set iconImage(icon: engine.SpriteFrame) {
    if (!icon) {
      return
    }
    this._iconImage = icon
    this._iconPrefab = null
    if (!this.buttonNode) {
      console.error('can not find button icon node')
    }
    // 设置UISprite
    let uiSprite: engine.UISprite = this.buttonNode.getComponent(engine.UISprite)
    if (!uiSprite) {
      uiSprite = this.buttonNode.addComponent(engine.UISprite)
    }
    uiSprite.spriteFrame = icon
  }

  // 图片设置
  // pressed
  // hover
  // disabled
  private _pressedState: engine.SpriteFrame
  private _hoverState: engine.SpriteFrame
  private _disabledState: engine.SpriteFrame
  @engine.decorators.property({
    type: engine.SpriteFrame,
    required: false,
    tooltips: '按下状态的按钮背景图资源'
  })
  get pressed() {
    return this._pressedState
  }
  set pressed(icon: engine.SpriteFrame) {
    this._pressedState = icon
    this.uiButtonComp.pressedSprite = icon
  }

  @engine.decorators.property({
    type: engine.SpriteFrame,
    required: false,
    tooltips: '悬停状态的按钮背景图资源'
  })
  get hover() {
    return this._hoverState
  }
  set hover(icon: engine.SpriteFrame) {
    this._hoverState = icon
    this.touchInputComp.onTouchEnter.remove(this._onTouchEnter)
    this.touchInputComp.onTouchEnter.add(this._onTouchEnter.bind(this))
  }

  @engine.decorators.property({
    type: engine.SpriteFrame,
    required: false,
    tooltips: '禁用状态的按钮背景图资源'
  })
  get disabled() {
    return this._disabledState
  }
  set disable(icon: engine.SpriteFrame) {
    this._disabledState = icon
    this.uiButtonComp.disabledSprite = icon
  }

  public onAwake() {

  }
  public onUpdate(dt) {

  }
  public onDestroy() {

  }
  public onDeserialized() {

  }

  private downEffectScaleStart(comp, event) {
    comp.entity.transform2D.scale.x *= 0.9
    comp.entity.transform2D.scale.y *= 0.9
  }
  private downEffectScaleEnd(comp, event) {
    comp.entity.transform2D.scale.x = 1
    comp.entity.transform2D.scale.y = 1
  }

  private _onTouchEnter() {
    const uiSprite: engine.UISprite = this.buttonNode.getComponent(engine.UISprite)
    uiSprite.spriteFrame = this._hoverState
  }
}
