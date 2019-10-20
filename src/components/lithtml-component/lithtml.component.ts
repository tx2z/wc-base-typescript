import { html, render } from 'lit-html';
import * as interfaces from './lithtml.component.interfaces';

/** The LithtmlComponent web component */
export default class LithtmlComponent extends HTMLElement {
  private shadow: ShadowRoot;
  private templateVariables: interfaces.TemplateVariables = {
    hello: 'Hello There!',
  };

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'closed' });

    const lithtmlTemplate = (data: interfaces.TemplateVariables) =>
      html`
        ${data.hello}
        <br />
        <button @click=${this.buttonClick}>Test button</button>
        <p id="testMessage"></p>
      `;

    render(lithtmlTemplate(this.templateVariables), this.shadow, { eventContext: this });
  }

  public buttonClick() {
    const testMessage = this.shadow.getElementById('testMessage') as HTMLElement;

    const messageTemplate = () =>
      html`
        You click the button!
      `;

    render(messageTemplate(), testMessage);
  }
}
