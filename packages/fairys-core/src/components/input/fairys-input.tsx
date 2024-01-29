import { Component, Host, h, ComponentInterface, Element, AttachInternals, Prop, State, } from '@stencil/core';
import { TextFieldTypes } from "../../interface"
import classname from 'classnames';

let fairysInputCount = 0

@Component({
  tag: 'fairys-input',
  styleUrl: 'fairys-input.scss',
  scoped: true,
  formAssociated: true,
})
export class FairysInput implements ComponentInterface {
  private inputId = `ion-input-${fairysInputCount++}`;
  @State() value: string;
  @State() hasFocus: boolean = false;
  @Prop() layoutType: | 'top' | 'left' | 'floating' = 'left'
  @Prop() type: TextFieldTypes = 'text'
  @Prop() label?: string;
  @Prop() colon: boolean = true
  @Prop() placeholder: string = '请输入'
  @Prop() name?: string
  @Element() el: HTMLElement;

  @AttachInternals() internals: ElementInternals;


  private hasValue(): boolean {
    return !!this.value
    // return this.getValue().length > 0;
  }

  private get startSlot() {
    return this.el.querySelector('[slot="start"]');
  }

  private get endSlot() {
    return this.el.querySelector('[slot="end"]');
  }

  private onInputValue(event) {
    this.value = event.target.value;
    this.internals.setFormValue(event.target.value);
  }

  private get newColon() {
    if (['top', 'floating'].includes(this.layoutType)) {
      return false
    }
    return this.colon;
  }

  private onCurrentFocus() {
    this.hasFocus = true;
  }

  private onCurrentBlur() {
    this.hasFocus = false;
  }

  render() {
    const cls = classname("fairys-input", {
      "fairys-input-start": this.startSlot,
      "fairys-input-end": this.endSlot,
      "fairys-input-top": this.layoutType === "top",
      "fairys-input-left": this.layoutType === "left",
      "fairys-input-floating": this.layoutType === "floating",
      'has-value': this.hasValue(),
      'has-focus': this.hasFocus,
    })

    return (
      <Host class={cls}>
        <fairys-label colon={this.newColon} htmlFor={this.inputId} label={this.label} ><slot name="label" /></fairys-label>
        <div class="fairys-input-main" >
          <div class="fairys-native-input-warp">
            <slot name='start' />
            <input
              id={this.inputId}
              class='fairys-native-input'
              type={this.type}
              value={this.value}
              placeholder={this.placeholder}
              onFocus={this.onCurrentFocus}
              onBlur={this.onCurrentBlur}
              onInput={(event) => this.onInputValue(event)}
            />
            <slot name='end' />
          </div>
        </div>
      </Host>
    );
  }

}
