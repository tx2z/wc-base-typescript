import { text, withKnobs } from '@storybook/addon-knobs';
import './index';

export default {
  decorators: [withKnobs],
  title: 'Base',
};

export const baseComponent = () => {
  const dataAttribute = text('data-atribute', 'init');
  const component = document.createElement('base-component');
  component.dataset.attribute = dataAttribute;
  return component;
};
