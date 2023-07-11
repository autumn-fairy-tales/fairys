import { Component, Host, Prop, h, ComponentInterface } from '@stencil/core';
import cls from 'classnames';

@Component({
  tag: 'fairys-space',
  styleUrl: 'fairys-space.scss',
})
export class Space implements ComponentInterface {
  /** 对齐方式, 支持 start、end、center */
  @Prop() align: 'start' | 'center' | 'end' | 'baseline' = 'center';

  /** 是否为垂直间距 */
  @Prop() vertical: boolean = false;

  /** 是否自动换行 */
  @Prop() wrap: boolean = false;
  
  /** 间隔距离, 默认8px */
  @Prop() gap: number = 8;

  render() {
    const classNames = cls('fairys-space', {
      [`fairys-space-align-${this.align}`]: this.align,
      [`fairys-space-vertical`]: this.vertical,
      [`fairys-space-wrap`]: this.wrap,
    })

    const styles = {
      'column-gap': `${this.gap}px`,
      'row-gap': `${this.gap}px`
    }

    return (
      <Host class={classNames} style={styles}>
        <slot />
      </Host>
    );
  }
}
