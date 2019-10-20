import { html, render } from 'lit-html';
import * as interfaces from './lithtml.component.interfaces';

/** The LithtmlComponent web component */
export default class LithtmlComponent extends HTMLElement {
  private shadow: ShadowRoot;

  // Define the variables we wil use in the component's main template
  private templateVariables: interfaces.TemplateVariables = {
    hello: 'Hello There!',
  };

  constructor() {
    super();

    // Create shadow dom
    this.shadow = this.attachShadow({ mode: 'closed' });

    // Define the lit-html template
    const lithtmlTemplate = (data: interfaces.TemplateVariables) =>
      html`
        ${data.hello}
        <br />
        <button @click=${this.buttonClick}>Test button</button>
        <p id="testMessage"></p>
      `;

    /**
     * Render the lit-html teamplate and add it to the shadow dom. EventContext
     * is assigned to this so we can execute the public functions of the class
     * in the template
     */
    render(lithtmlTemplate(this.templateVariables), this.shadow, { eventContext: this });
  }

  /**
   * Public funtion for test purposes.
   * Use lit-html functions to add a message in the testMessage component's element
   */
  public buttonClick() {
    const testMessage = this.shadow.getElementById('testMessage') as HTMLElement;

    const messageTemplate = () =>
      html`
        You click the button!
      `;

    render(messageTemplate(), testMessage);
  }
}
