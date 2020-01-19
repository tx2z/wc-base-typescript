import { text, withKnobs } from '@storybook/addon-knobs';
import './index';

export default {
  decorators: [withKnobs],
  title: 'No Shadow DOM',
};

export const noShadowDomComponent = () => {
  const dataAttribute = text('data-atribute', 'init');

  const component = document.createElement('noshadow-component');
  component.dataset.attribute = dataAttribute;
  return component;
};
