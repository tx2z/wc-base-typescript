import BaseComponent from './base.component';
window.customElements.define('base-component', BaseComponent);
declare global {
  interface HTMLElementTagNameMap {
    'base-component': BaseComponent;
  }
}
