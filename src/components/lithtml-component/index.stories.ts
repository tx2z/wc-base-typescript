import './index';

export default { title: 'Lit-html' };

export const lithtmlComponent = () => {
  const component = document.createElement('lithtml-component');
  component.dataset.attribute = 'init';
  return component;
};
