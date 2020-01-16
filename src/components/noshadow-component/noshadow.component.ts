// import * as interfaces from './base.component.interfaces';
import camelcase from 'camelcase';
import prepareTemplate from '../../helpers';
import htmlTemplate from './noshadow.component.html';

/** The NoShadowComponent web component */
export default class NoShadowComponent extends HTMLElement {
  constructor() {
    super();
  }

  /**
   * Executed when the custom element is added to the page.
   */
  public connectedCallback() {
    // Add the main template to the component
    const templateElement = document.createElement('template');

    // Recover all the observedAttributes so we can add them to the template
    // Remember to add the atributes to the template. All attributes are
    // converted to cameCase. ex: data-attribute => dataAttribute
    const observedAttributes: Record<string, string | null> = {};
    NoShadowComponent.observedAttributes.forEach(attribute => {
      const key = camelcase(attribute);
      observedAttributes[key] = this.getAttribute(attribute);
    });
    // Prepare template
    const templateVariables: Record<string, string | null> = {
      hello: 'Hello There!',
      ...observedAttributes,
    };
    templateElement.innerHTML = prepareTemplate(htmlTemplate, templateVariables, '');

    // Attach template content to the dom inside the element
    this.appendChild(templateElement.content.cloneNode(true));

    this.addEventListeners();
  }
  /**
   * Executed when the custom element is removed from page.
   */
  public disconnectedCallback() {
    console.log('disconected!');
    this.removeEventListener(
      'click',
      event => {
        this.eventListerners(event);
      },
      false
    );
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
      const testAttribute = this.querySelector('#attributeValue') as HTMLElement;
      // Avoid error before element is connected
      if (testAttribute !== null) {
        testAttribute.innerHTML = newValue;
      }
    }
  }

  /**
   * Add EventListeners to the component.
   * It allow to listen events even if the content of the component is not yet
   * created
   */
  private addEventListeners() {
    this.addEventListener(
      'click',
      event => {
        this.eventListerners(event);
      },
      false
    );
  }

  /**
   * Function executed by an eventlistener to perform onclick action
   * @param shadow The shadow DOM element attached to the class
   * @param event The Event of the parent event listener
   */
  private eventListerners(event: Event) {
    const target = event.target as HTMLElement;

    /**
     * Add the event listener to the testButton to add a message in the
     * testMessage component's element
     */
    if (target.id === 'testButton') {
      event.preventDefault();
      const testMessage = this.querySelector('#testMessage') as HTMLElement;
      testMessage.innerHTML = 'You click the button!';
    }
  }
}