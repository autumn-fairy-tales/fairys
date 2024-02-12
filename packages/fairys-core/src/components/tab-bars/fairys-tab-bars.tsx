import { Component, Host, h, Element, ComponentInterface, Prop } from '@stencil/core';
import classname from 'classnames';

@Component({
  tag: 'fairys-tab-bars',
  styleUrl: 'fairys-tab-bars.scss',
  scoped: true,
})
export class FairysTabBars implements ComponentInterface {
  @Element() el: HTMLElement;
  @Prop() activeKey: string;

  onActiveItem() {
  }

  render() {
    const cls = classname("fairys-tab-bars", {})
    return (
      <Host class={cls} >

      </Host>
    );
  }
}
