import NoShadowComponent from './noshadow.component';
window.customElements.define('noshadow-component', NoShadowComponent);
declare global {
  interface HTMLElementTagNameMap {
    'noshadow-component': NoShadowComponent;
  }
}
