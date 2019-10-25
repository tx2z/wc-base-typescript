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
        <p>
          Attribute value: <span id="attributeValue">${this.dataset.attribute}</span>
          <br />
          <small
            >You can change the data-attribute in the inspector or do some fancy stuf inside of
            outside the component with JS :)</small
          >
        </p>
      `;

    /**
     * Render the lit-html teamplate and add it to the shadow dom. EventContext
     * is assigned to this so we can execute the public functions of the class
     * in the template
     */
    render(lithtmlTemplate(this.templateVariables), this.shadow, { eventContext: this });
  }

  /**
   * Define witch attribunes of the custom element need to be observed
   */
  static get observedAttributes() {
    return ['data-attribute'];
  }

  /**
   * Execute every time an attribute defined in observedAttributes changes
   * @param attr The attribute that changes
   * @param oldValue Old value of the attribute
   * @param newValue New value of the attribute
   */
  public attributeChangedCallback(attr: string, oldValue: string, newValue: string) {
    if (attr === 'data-attribute' && oldValue !== newValue) {
      const testAttribute = this.shadow.getElementById('attributeValue') as HTMLElement;

      const messageTemplate = () =>
        html`
          ${newValue}
        `;

      render(messageTemplate(), testAttribute);
    }
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
