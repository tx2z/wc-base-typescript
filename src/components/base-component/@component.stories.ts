import './index';
import notes from './README.md';

export default {
  title: 'Base',
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

export const BaseComponent = {
  args: {
    dataAttribute: 'init',
  },
  render: (args: { dataAttribute: string }): HTMLElement => {
    const component = document.createElement('base-component');
    component.dataset.attribute = args.dataAttribute;
    return component;
  },
};
