import { withA11y } from '@storybook/addon-a11y';
import { text, withKnobs } from '@storybook/addon-knobs';
import './index';

import notes from './README.md';

export default {
  decorators: [withKnobs, withA11y],
  parameters: {
    docs: {
      description: { component: notes },
    },
  },
  title: 'No Shadow DOM',
};

export const noShadowDomComponent = (): HTMLElement => {
  const dataAttribute = text('data-atribute', 'init');

  const component = document.createElement('noshadow-component');
  component.dataset.attribute = dataAttribute;
  return component;
};
