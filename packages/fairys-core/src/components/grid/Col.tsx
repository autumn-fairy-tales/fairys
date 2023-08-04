import { Component, Host, h, Prop, ComponentInterface } from '@stencil/core';
import cls from 'classnames';

@Component({
  tag: 'fairys-col',
  styleUrl: 'fairys-col.scss',
})
export class Col implements ComponentInterface {
  /** 栅格占位格数，为 0 时相当于 display: none */
  @Prop() span: number = 24;

  render() {

    const classNames = cls('fairys-col', {
      [`fairys-col-${this.span}`]: true,
    })

    return (
      <Host class={classNames}>
        <slot />
      </Host>
    );
  }
}
