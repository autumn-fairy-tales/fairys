import { Component, Host, h, Prop, ComponentInterface } from '@stencil/core';
import cls from 'classnames';

@Component({
  tag: 'fairys-button',
  styleUrl: 'fairys-button.scss',
})
export class FairysButton implements ComponentInterface {

  /** 设置按钮类型 */
  @Prop() type: "default" | "primary" | "warning" | "success" | "danger" | "white" = 'default';
  /** 设置按钮禁用 */
  @Prop() disabled: boolean;
  /** 设置按钮大小 */
  @Prop() size: "large" | "small" | "default";
  /** 是否显示 */
  @Prop() dashed: boolean;
  /** 按钮形式 */
  @Prop() variant: 'dashed' | 'border';
  /** 是否为块级元素 */
  @Prop() block: boolean;
  /** 是否显示圆角按钮形状 */
  @Prop() shape: boolean;

  render() {
    const classNames = cls('fairys-button', {
      [`fairys-button-${this.type}`]: this.type,
      [`fairys-button-variant-${this.variant}`]: this.variant,
      [`fairys-button-block`]: this.block,
      [`fairys-button-shape`]: this.shape,
    })
    return (
      <Host
        class={classNames}
        size={this.size}
        disabled={this.disabled}
      >
        <slot />
      </Host>
    );
  }

}
