import { Component, Host, h, Element, ComponentInterface, Prop, Event, EventEmitter, Watch, State } from '@stencil/core';
import classname from 'classnames';

@Component({
  tag: 'fairys-tab',
  styleUrl: 'fairys-tab.scss',
  scoped: true,
})
export class FairysTab implements ComponentInterface {
  @Element() el: HTMLElement;
  @Event({ bubbles: false }) active: EventEmitter<{ tabItem: HTMLFairysTabItemElement, activeKey: string }>;

  private get tabs() {
    const list = Array.from(this.el.querySelectorAll('fairys-tab-item'));
    if (this.activeKey === undefined && Boolean(list.length)) {
      this.activeKey = list[0].fkey
    }
    return list
  }

  @Prop() activeKey: string;

  @Watch("activeKey")
  private setActive() {
    this.tabItems.forEach((tab) => {
      if (this.activeKey === tab.fkey) {
        tab.classList.remove('hidden')
        tab.classList.add('selected')
      } else {
        tab.classList.add('hidden')
      }
    })
  }

  /**render之后*/
  componentDidRender() {
    this.tabItems = this.tabs
    this.setActive();
  }

  onActiveItem(tabItem: HTMLFairysTabItemElement) {
    // if (tabItem.disabled) {
    //   return
    // }
    const activeKey = tabItem.fkey;
    this.activeKey = activeKey
    this.active.emit({ tabItem, activeKey })
  }

  @State() tabItems: HTMLFairysTabItemElement[] = []

  // 是否更新子集数据
  onIsUpdateChild(event) {
    console.log("event", event)
    this.tabItems = this.tabs
  }

  render() {
    const cls = classname("fairys-tab", {})
    return (
      <Host class={cls} onIsUpdateChild={this.onIsUpdateChild} >
        <div class="fairys-tab-item-title-warp">
          {this.tabItems.map((tab) => {
            const tabCls = classname("fairys-tab-item-title", { disabled: !!tab.disabled })
            return <div class={tabCls} onClick={() => this.onActiveItem(tab)} >{tab.title}</div>
          })}
        </div>
        <div class="fairys-tab-body"><slot /></div>
      </Host>
    );
  }
}
