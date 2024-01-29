import { Component, Host, h, Prop, Element, ComponentInterface } from '@stencil/core';
import classname from 'classnames';

@Component({
  tag: 'fairys-label',
  styleUrl: 'fairys-label.scss',
  scoped: true,
})
export class FairysLabel implements ComponentInterface {
  @Prop() label?: string;
  @Prop() htmlFor?: string;
  @Prop() colon: boolean = true
  @Element() el: HTMLElement;

  private get labelSlot() {
    return this.el.querySelector('[slot="label"]');
  }

  render() {
    const cls = classname("fairys-label", {
      "fairys-label-colon": this.colon
    })

    return (
      <Host class={cls} >
        <label htmlFor={this.htmlFor} >
          {(this.labelSlot || this.label === undefined) ? <slot /> : <div class="fairys-label-text">{this.label}</div>}
        </label>
      </Host>
    );
  }

}
