import './index';
import notes from './README.md';

export default {
  title: 'No Shadow DOM',
  parameters: {
    docs: {
      description: { component: notes },
    },
  },
  argTypes: {
    dataAttribute: {
      control: 'text',
      description: 'The data-attribute value',
    },
  },
};

export const NoShadowDomComponent = {
  args: {
    dataAttribute: 'init',
  },
  render: (args: { dataAttribute: string }): HTMLElement => {
    const component = document.createElement('noshadow-component');
    component.dataset.attribute = args.dataAttribute;
    return component;
  },
};
