import { Component, Host, h, ComponentInterface } from '@stencil/core';
import cls from 'classnames';

@Component({
  tag: 'fairys-row',
  styleUrl: 'fairys-row.scss',
})
export class Row implements ComponentInterface {

  render() {
    const classNames = cls('fairys-row')

    return (
      <Host class={classNames}>
        <slot />
      </Host>
    );
  }
}
