import { html, render, TemplateResult } from 'lit';
import * as interfaces from './lithtml.component.interfaces';
import * as stylesheet from './lithtml.component.css';

/** The LithtmlComponent web component */
export default class LithtmlComponent extends HTMLElement {
  /**
   * Define witch attribunes of the custom element need to be observed
   */
  static get observedAttributes(): string[] {
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
  public connectedCallback(): void {
    this.render();
  }

  /**
   * Execute every time an attribute defined in observedAttributes changes
   * @param attr The attribute that changes
   * @param oldValue Old value of the attribute
   * @param newValue New value of the attribute
   */
  public attributeChangedCallback(attr: string, oldValue: string, newValue: string): void {
    if (attr === 'data-attribute' && oldValue !== newValue) {
      this.templateVariables.attributeValue = newValue;
      // Render the template with the changes
      this.render();
    }
  }

  /**
   * Public funtion for test purposes. This function can be called from the temaplte.
   * Arrow function to ensure correct 'this' context in template event handlers.
   */
  public buttonClick = (): void => {
    this.templateVariables.testMessage = 'You click the button!';
    // Render the template with the changes
    this.render();
  };

  /**
   * Render the lit-html teamplate and add it to the shadow dom.
   */
  private render(): void {
    // Define the lit-html template
    const lithtmlTemplate = (data: interfaces.TemplateVariables): TemplateResult => html`
      <style>
        ${stylesheet.default}
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
     * Render the lit template and add it to the shadow dom.
     * Methods are bound in constructor to ensure correct 'this' context.
     */
    render(lithtmlTemplate(this.templateVariables), this.shadow);
  }
}
