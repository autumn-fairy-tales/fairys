import { Component, Host, Prop, h, ComponentInterface } from '@stencil/core';
import cls from 'classnames';

@Component({
  tag: 'fairys-divider',
  styleUrl: 'fairys-divider.scss',
})
export class Divider implements ComponentInterface {
  /** 分隔线类型有两种：水平和垂直。 */
  @Prop() layout: 'horizontal' | 'vertical' = 'horizontal';
  /** 文本位置（仅在水平分割线有效） */
  @Prop() align: 'center' | 'left' | 'right' = 'center';
  /** 是否虚线（仅在水平分割线有效） */
  @Prop() dashed: boolean;

  render() {

    const classNames = cls('fairys-divider', {
      [`fairys-divider-${this.layout}`]: this.layout,
      [`fairys-divider-${this.align}`]: this.layout === 'horizontal' && this.align,
      [`fairys-divider-dashed`]: this.layout === 'horizontal' && this.dashed,
    })
    
    return (
      <Host class={classNames}>
        {this.layout === 'horizontal' && (
          <span class="fairys-divider-text">
            <slot />
          </span>
        )}
      </Host>
    );
  }
}
