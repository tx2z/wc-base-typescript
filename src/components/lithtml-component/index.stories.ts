import { text, withKnobs } from '@storybook/addon-knobs';
import './index';

export default {
  decorators: [withKnobs],
  title: 'Lit-html',
};

export const lithtmlComponent = () => {
  const dataAttribute = text('data-atribute', 'init');

  const component = document.createElement('lithtml-component');
  component.dataset.attribute = dataAttribute;
  return component;
};
