import {
    configure
  } from '@storybook/html';

const req = require.context('../src/components/', true, /\.stories\.ts$/);
configure(req, module);
if (module.hot) {
  module.hot.accept(req.id, () => {
    const currentLocationHref = window.location.href;
    window.history.pushState(null, null, currentLocationHref); 
    window.location.reload();
  });
}