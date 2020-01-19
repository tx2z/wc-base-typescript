import './index';

export default { title: 'Base' };

export const baseComponent = () => {
  const component = document.createElement('base-component');
  component.dataset.attribute = 'init';
  return component;
};
