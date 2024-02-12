import { Component, Host, h, Element, ComponentInterface, Prop, Event, EventEmitter, } from '@stencil/core';
import classname from 'classnames';

@Component({
  tag: 'fairys-tab-item',
  styleUrl: 'fairys-tab-item.scss',
  scoped: true,
})
export class FairysTabItem implements ComponentInterface {
  @Element() el: HTMLFairysTabItemElement;
  @Prop() fkey: string;
  @Prop() disabled: boolean;

  @Event({ bubbles: false }) isUpdateChild: EventEmitter<{ tabItem: HTMLFairysTabItemElement, type: string }>;

  componentDidRender() {
    this.isUpdateChild.emit({ tabItem: this.el, type: "add" })
  }

  render() {
    const cls = classname("fairys-tab-item", {})
    return (
      <Host class={cls} >
        <slot />
      </Host>
    );
  }

}
