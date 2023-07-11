import { Component, Host, Prop, Event, EventEmitter, h, ComponentInterface } from '@stencil/core';

@Component({
  tag: 'fairys-icon',
})
export class Icon implements ComponentInterface {
  /** 设置按钮大小 */
  @Prop() size: number = 24;

  @Event({
    eventName: 'clickChange'
  }) onClickChange: EventEmitter

  componentDidLoad() {
    console.log(22)
  }

  handleClick = () => {
    console.log(7)
    this.onClickChange.emit({
      a: 1
    })
  }

  render() {
    const { size } = this;

    const style = {
      'font-size': `${size}px`
    }

    return (
      <Host class="fairys-icon" style={style} onClick={this.handleClick}>
        <slot />
      </Host>
    );
  }

}
