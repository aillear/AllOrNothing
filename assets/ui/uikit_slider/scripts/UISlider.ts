
import engine from "engine";
import Utils from '../../common/Utils'

const TypeNames = engine.TypeNames

const tmpVector2 = new engine.Vector2();

export enum ProgressTitleType {
  Percent,
  ValueAndMax,
  Value,
  Max
}

@engine.decorators.serialize("UIKitSlider")
export default class UIKitSlider extends engine.Script {
  private _min: number = 0;
  private _max: number = 100;
  private _value: number = 50;
  private _titleType: ProgressTitleType = ProgressTitleType.Percent;
  private _reverse: boolean = false;
  private _wholeNumbers: boolean;

  private _titleObject: engine.Transform2D;
  private _barObjectH: engine.Transform2D;
  private _barObjectV: engine.Transform2D;
  private _barMaxWidth: number = 0;
  private _barMaxHeight: number = 0;
  private _barMaxWidthDelta: number = 0;
  private _barMaxHeightDelta: number = 0;
  private _gripObject: engine.Transform2D;
  private _touchPosX: number = 0;
  private _touchPosY: number = 0;
  private _clickPercent: number = 0;
  private _barStartX: number = 0;
  private _barStartY: number = 0;

  public changeOnClick: boolean = true;

  /**是否可拖动开关**/
  public canDrag: boolean = true;

  // 本地事件
  private _onClick;
  private _gripTouchStartListener;
  private _gripTouchMoveistener;
  private _gripTouchEndListener;
  private _gripTouchCanceltListener;


  private _dirty = true;

  // 组件目标
  @engine.decorators.property({
    type: TypeNames.Transform2D,
    required: false
  })
  public get titleObject(): engine.Transform2D {
    return this._titleObject;
  }
  public set titleObject(value: engine.Transform2D) {
    if (value === this._titleObject) {
      return;
    }
    this._titleObject = value;
    this._dirty = true;
  }

  @engine.decorators.property({
    type: TypeNames.Transform2D,
    required: false
  })
  public get barObjectH(): engine.Transform2D {
    return this._barObjectH;
  }
  public set barObjectH(value: engine.Transform2D) {
    if (value === this._barObjectH) {
      return;
    }
    this._barObjectH = value;
    this._dirty = true;
  }

  @engine.decorators.property({
    type: TypeNames.Transform2D,
    required: false
  })
  public get barObjectV(): engine.Transform2D {
    return this._barObjectV;
  }
  public set barObjectV(value: engine.Transform2D) {
    if (value === this._barObjectV) {
      return;
    }
    this._barObjectV = value;
    this._dirty = true;
  }

  @engine.decorators.property({
    type: TypeNames.Transform2D,
    required: false
  })
  public get gripObject(): engine.Transform2D {
    return this._gripObject;
  }
  public set gripObject(value: engine.Transform2D) {
    if (value === this._gripObject) {
      return;
    }
    this._gripObject = value;
    this._dirty = true;

  }


  // 属性
  @engine.decorators.property.enum({
    type: ProgressTitleType,
  })
  public get titleType(): ProgressTitleType {
    return this._titleType;
  }
  public set titleType(value: ProgressTitleType) {
    if (this._titleType != value) {
      this._titleType = value;
      this._dirty = true;
    }
  }

  @engine.decorators.property({
    type: TypeNames.Boolean,
  })
  public get reverse(): boolean {
    return this._reverse;
  }
  public set reverse(value: boolean) {
    if (this._reverse != value) {
      this._reverse = value;
      this._dirty = true;
    }
  }

  @engine.decorators.property({
    type: TypeNames.Boolean,
  })
  public get wholeNumbers(): boolean {
    return this._wholeNumbers;
  }
  public set wholeNumbers(value: boolean) {
    if (this._wholeNumbers != value) {
      this._wholeNumbers = value;
      this._dirty = true;
    }
  }

  @engine.decorators.property({
    type: TypeNames.Number,
  })
  public get min(): number {
    return this._min;
  }
  public set min(value: number) {
    if (this._min != value) {
      this._min = value;
      this._dirty = true;
    }
  }

  @engine.decorators.property({
    type: TypeNames.Number,
  })
  public get max(): number {
    return this._max;
  }
  public set max(value: number) {
    if (this._max != value) {
      this._max = value;
      this._dirty = true;
    }
  }

  @engine.decorators.property({
    type: TypeNames.Number,
  })
  public get value(): number {
    return this._value;
  }
  public set value(value: number) {
    if (this._value != value) {
      this._value = value;
      this._dirty = true;
    }
  }

  constructor(entity: engine.Entity) {
    super(entity);
  }

  public onAwake() {
    if (this._barObjectH) {
      const barObjectHTransform = this._barObjectH.entity.transform2D;
      this._barMaxWidth = barObjectHTransform.sizeX;
      this._barMaxWidthDelta = this.entity.transform2D.sizeX - this._barMaxWidth;
      this._barStartX = barObjectHTransform.positionX;
    }
    if (this._barObjectV) {
      const barObjectVTransform = this._barObjectV.entity.transform2D;
      this._barMaxHeight = barObjectVTransform.sizeY;
      this._barMaxHeightDelta = this.entity.transform2D.sizeY - this._barMaxHeight;
      this._barStartY = barObjectVTransform.positionY;
    }

    if (this._gripObject) {
      const gripTouchComp = this._gripObject.entity.getComponent(engine.TouchInputComponent) as engine.TouchInputComponent;
      this._gripTouchStartListener = gripTouchComp.onTouchStart.add(this._gripTouchDown.bind(this), false);
      this._gripTouchMoveistener = gripTouchComp.onTouchMove.add(this._gripTouchMove.bind(this), false);
      this._gripTouchEndListener = gripTouchComp.onTouchEnd.add(this._gripTouchUp.bind(this), false);
      this._gripTouchCanceltListener = gripTouchComp.onTouchCancel.add(this._gripTouchUp.bind(this), false);
    }

    // 点击bar移动grip到相应位置
    const sliderBackgroundNode = Utils.getChildByName(this.entity, 'Slider_Background')
    const touchComp = sliderBackgroundNode.getComponent(engine.TouchInputComponent) as engine.TouchInputComponent
    this._onClick = touchComp.onClick.add(this._barTouchDown.bind(this), false);
  }

  public onUpdate() {
    if (this._dirty) {
      this.update();
    }
  }

  public onDisable() {

  }

  public update(): void {
    this.updateWithPercent((this._value - this._min) / (this._max - this._min));
  }

  private updateWithPercent(percent: number, event?: engine.TouchInputEvent): void {
    this._dirty = false;
    percent = Utils.clamp01(percent);

    if (event) {
      let newValue: number = Utils.clamp(this._min + (this._max - this._min) * percent, this._min, this._max);

      if (this._wholeNumbers) {
        newValue = Math.round(newValue);
        percent = Utils.clamp01((newValue - this._min) / (this._max - this._min));
      }

      if (newValue != this._value) {
        this._value = newValue;
      }
    }

    if (this._titleObject) {
      const titleObject = this._titleObject;
      const titleLabel = titleObject.entity.getComponent(engine.UILabel) as engine.UILabel;
      if (titleLabel) {
        switch (this._titleType) {
          case ProgressTitleType.Percent:
            titleLabel.text = Math.floor(percent * 100) + "%";
            break;

          case ProgressTitleType.ValueAndMax:
            titleLabel.text = this._value + "/" + this._max;
            break;

          case ProgressTitleType.Value:
            titleLabel.text = "" + this._value;
            break;

          case ProgressTitleType.Max:
            titleLabel.text = "" + this._max;
            break;
        }
      }
    }

    var fullWidth: number = this.entity.transform2D.sizeX - this._barMaxWidthDelta;
    var fullHeight: number = this.entity.transform2D.sizeY - this._barMaxHeightDelta;
    if (!this._reverse) {
      if (this._barObjectH)
        this._barObjectH.entity.transform2D.size.x = Math.round(fullWidth * percent);
      if (this._barObjectV)
        this._barObjectV.entity.transform2D.size.y = Math.round(fullHeight * percent);
    }
    else {
      if (this._barObjectH) {
        this._barObjectH.entity.transform2D.size.x = Math.round(fullWidth * percent);
        this._barObjectH.entity.transform2D.position.x = this._barStartX + (fullWidth - this._barObjectH.entity.transform2D.sizeX);
      }
      if (this._barObjectV) {
        this._barObjectV.entity.transform2D.size.y = Math.round(fullHeight * percent);
        this._barObjectV.entity.transform2D.position.y = this._barStartY + (fullHeight - this._barObjectV.entity.transform2D.sizeY);
      }
    }

  }

  private _barTouchDown(sender: this, event: engine.TouchInputEvent) {
    if (!this.changeOnClick)
      return;

    this._gripObject.convertWorldPositionToLocal(event.touches[0].worldPosition, tmpVector2);
    var percent: number = Utils.clamp01((this._value - this._min) / (this._max - this._min));

    var delta: number;
    if (this._barObjectH)
      delta = - tmpVector2.x / this._barMaxWidth;
    if (this._barObjectV)
      delta = - tmpVector2.y / this._barMaxHeight;
    if (this._reverse)
      percent += delta;
    else
      percent -= delta;
    this.updateWithPercent(percent, event);

  }


  private _gripTouchDown(sender: this, event: engine.TouchInputEvent) {
    this.canDrag = true;

    this._touchPosX = event.touches[0].worldPosition.x;
    this._touchPosY = event.touches[0].worldPosition.y;

    this._clickPercent = Utils.clamp01((this._value - this._min) / (this._max - this._min));
  }

  private _gripTouchMove(sender: this, event: engine.TouchInputEvent) {
    if (!this.canDrag) {
      return
    }
    const touchEvent = event.touches[0];

    let dx = touchEvent.worldPosition.x - this._touchPosX
    let dy = touchEvent.worldPosition.y - this._touchPosY

    if (this._reverse) {
      dx = -dx;
      dy = -dy;
    }

    let percent: number;
    if (this._barObjectH) {
      percent = this._clickPercent + dx / this._barMaxWidth;
    } else {
      percent = this._clickPercent + dy / this._barMaxHeight;
    }

    this.updateWithPercent(percent, event);
  }

  private _gripTouchUp(sender: this, event: engine.TouchInputEvent) {
    this.canDrag = false;
  }
}
