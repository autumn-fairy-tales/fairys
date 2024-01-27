import { Component, Host, h, ComponentInterface, Element, AttachInternals, Prop } from '@stencil/core';

@Component({
  tag: 'fairys-input',
  styleUrl: 'fairys-input.scss',
  formAssociated: true
})
export class FairysInput implements ComponentInterface {

  @Prop() name: string

  @Element() el: HTMLElement;

  @AttachInternals() internals: ElementInternals;

  render() {

    return (
      <Host>
        <slot name='addon-before' />
        <input
          name={this.name}
          onInput={() => {
            const value = (event.target as any).value
            this.internals.setFormValue(value);
            console.log("event", this.internals,)
          }}
        />
        <slot name='addon-after' />
      </Host>
    );
  }

}
