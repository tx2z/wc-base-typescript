import LithtmlComponent from './lithtml.component';
window.customElements.define('lithtml-component', LithtmlComponent);
declare global {
  interface HTMLElementTagNameMap {
    'lithtml-component': LithtmlComponent;
  }
}
