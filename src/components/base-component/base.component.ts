// import * as interfaces from './base.component.interfaces';
import prepareTemplate from '../../helpers';
import htmlTemplate from './base.component.html';

/** The BaseComponent web component */
export default class BaseComponent extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();

    // Add the main template to the component
    const templateElement = document.createElement('template');

    // Prepare template
    const templateVariables = {
      hello: 'Hello There!',
    };
    templateElement.innerHTML = prepareTemplate(htmlTemplate, templateVariables, '');

    // Attach template content to the shadow dom
    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.appendChild(templateElement.content.cloneNode(true));

    this.addEventListeners();
  }

  /**
   * Add EventListeners to the shadow dom of the component.
   * It allow to listen events even if the content of the component is not yet
   * created
   */
  private addEventListeners() {
    this.shadow.addEventListener(
      'click',
      event => {
        const target = event.target as HTMLElement;

        /**
         * Add the event listener to the testButton to add a message in the
         * testMessage component's element
         */
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
