import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'fairys-button',
  styleUrl: 'fairys-button.css',
})
export class FairysButton {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
