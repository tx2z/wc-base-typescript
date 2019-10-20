// import * as interfaces from './lithtml.component.interfaces';
import { html, render } from 'lit-html';
import prepareTemplate from '../../helpers';
import htmlTemplate from './lithtml.component.html';

/** The LithtmlComponent web component */
export default class LithtmlComponent extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();

    // Add the main template to the component
    const templateElement = document.createElement('template');

    // Prepare template
    const variables = {
      hello: 'Hello There!',
    };
    templateElement.innerHTML = prepareTemplate(htmlTemplate, variables, '');

    // Attach template content to the shadow dom
    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.appendChild(templateElement.content.cloneNode(true));

    this.addEventListeners();
  }

  /**
   * Add EventListeners to the Component
   */
  private addEventListeners() {
    const lithtmlComponentElement = this.shadow;

    lithtmlComponentElement.addEventListener(
      'click',
      event => {
        const target = event.target as HTMLElement;

        if (target.id === 'testButton') {
          event.preventDefault();
          const testMessage = this.shadow.getElementById('testMessage') as HTMLElement;
          testMessage.innerHTML = 'You click the button!';
        }
      },
      false
    );
  }
}
