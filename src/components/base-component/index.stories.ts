import './index';

export default { title: 'Button' };

export const withText = () => '<base-component data-attribute="init"></base-component>';

export const withEmoji = () => {
  const button = document.createElement('button');
  button.innerText = '😀 😎 👍 💯';
  return button;
};
