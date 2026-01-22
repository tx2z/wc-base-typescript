import './index';
import notes from './README.md';

export default {
  title: 'Lit-html',
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

export const LithtmlComponent = {
  args: {
    dataAttribute: 'init',
  },
  render: (args: { dataAttribute: string }): HTMLElement => {
    const component = document.createElement('lithtml-component');
    component.dataset.attribute = args.dataAttribute;
    return component;
  },
};
