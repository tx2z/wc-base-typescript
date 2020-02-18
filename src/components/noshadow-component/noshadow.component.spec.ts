import NoShadowComponent from './noshadow.component';

window.customElements.define('noshadow-component', NoShadowComponent);
describe('No shadow Component Spec:', () => {
  let element: HTMLElement;
  let styles: CSSStyleDeclaration;
  beforeEach(() => {
    element = document.createElement('noshadow-component');
    styles = window.getComputedStyle(element);
    document.body.append(element);
  });

  describe('the No shadow Component', () => {
    it('should have a button with the id testButton under the shadow root', () => {
      const button = element.querySelector('#testButton') as HTMLButtonElement;
      expect(button).toBeTruthy();
    });

    it('should set the "You click the button!" on click testButton button', () => {
      const button = element.querySelector('#testButton') as HTMLButtonElement;
      const message = element.querySelector('#testMessage') as HTMLElement;
      button.click();
      expect(message.innerText).toEqual('You click the button!');
    });

    it('should have "attributeValue" empty if "data-attribute" is not present', () => {
      const message = element.querySelector('#attributeValue') as HTMLElement;
      expect(message.innerText).toEqual('');
    });

    it('should set "attributeValue" equal to "data-attribute" on "data-attribute" change', () => {
      element.setAttribute('data-attribute', 'test');
      const message = element.querySelector('#attributeValue') as HTMLElement;
      expect(message.innerText).toEqual('test');
    });

    it('should have a border', () => {
      /* Checking only border-bottom as example */
      const borderColor = styles.getPropertyValue('border-bottom-color');
      const borderStyle = styles.getPropertyValue('border-bottom-style');
      const borderWidth = styles.getPropertyValue('border-bottom-width');
      expect(borderColor).toEqual('rgb(0, 0, 0)');
      expect(borderStyle).toEqual('dotted');
      expect(borderWidth).toEqual('1px');
    });
  });

  afterEach(() => {
    document.body.removeChild(element);
  });
});
