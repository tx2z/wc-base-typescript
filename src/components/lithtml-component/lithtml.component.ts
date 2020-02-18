import { html, render } from 'lit-html';
import * as interfaces from './lithtml.component.interfaces';

/** The LithtmlComponent web component */
export default class LithtmlComponent extends HTMLElement {
  /**
   * Define witch attribunes of the custom element need to be observed
   */
  static get observedAttributes() {
    return ['data-attribute'];
  }
  private shadow: ShadowRoot;

  // Define the variables we wil use in the component's main template
  private templateVariables: interfaces.TemplateVariables = {
    hello: 'Hello There!',
  };

  constructor() {
    super();

    // Create shadow dom
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  /**
   * Executed when the custom element is added to the page.
   */
  public connectedCallback() {
    this.render();
  }

  /**
   * Execute every time an attribute defined in observedAttributes changes
   * @param attr The attribute that changes
   * @param oldValue Old value of the attribute
   * @param newValue New value of the attribute
   */
  public attributeChangedCallback(attr: string, oldValue: string, newValue: string) {
    if (attr === 'data-attribute' && oldValue !== newValue) {
      this.templateVariables.attributeValue = newValue;
      // Render the template with the changes
      this.render();
    }
  }

  /**
   * Public funtion for test purposes. This function can be called from the temaplte.
   */
  public buttonClick() {
    this.templateVariables.testMessage = 'You click the button!';
    // Render the template with the changes
    this.render();
  }

  // Define the lit-html template
  private lithtmlTemplate = (data: interfaces.TemplateVariables) =>
    html`
      <style>
        :host {
          border: 1px black dotted;
          display: inline-block;
          padding: 5px;
        }
      </style>
      ${data.hello}
      <br />
      <button id="testButton" @click=${this.buttonClick}>Test button</button>
      <p id="testMessage">${data.testMessage}</p>
      <p>
        Attribute value: <span id="attributeValue">${data.attributeValue}</span>
        <br />
        <small
          >You can change the data-attribute in the inspector or do some fancy stuf inside of
          outside the component with JS :)</small
        >
      </p>
    `;

  /**
   * Render the lit-html teamplate and add it to the shadow dom.
   */
  private render() {
    /**
     * Render the lit-html teamplate and add it to the shadow dom. EventContext
     * is assigned to this so we can execute the public functions of the class
     * in the template
     */
    render(this.lithtmlTemplate(this.templateVariables), this.shadow, { eventContext: this });
  }
}
