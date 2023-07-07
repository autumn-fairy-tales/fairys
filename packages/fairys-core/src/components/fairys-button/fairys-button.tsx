import { Component, Host, h, Prop, ComponentInterface } from '@stencil/core';

@Component({
  tag: 'fairys-button',
  styleUrl: 'fairys-button.scss',
})
export class FairysButton implements ComponentInterface {

  /** 设置按钮类型 */
  @Prop() type: "default" | "primary" | "dashed"
  /** 设置按钮禁用 */
  @Prop() disabled: boolean
  /** 设置按钮大小 */
  @Prop() size: "large" | "small" | "default"

  render() {
    return (
      <Host
        class="fairys-button"
        size={this.size}
        disabled={this.disabled}
        type={this.type}
      >
        <slot />
      </Host>
    );
  }

}
