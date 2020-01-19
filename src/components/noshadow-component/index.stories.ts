import './index';

export default { title: 'No Shadow DOM' };

export const noShadowDomComponent = () => {
  const component = document.createElement('noshadow-component');
  component.dataset.attribute = 'init';
  return component;
};
