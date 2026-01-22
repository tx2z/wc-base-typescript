# WEB COMPONENTS GENERATOR WITH TYPESCRIPT

Project to create stand-alone web components with typescript.

Uses:

* [typescript](https://www.typescriptlang.org/)
* [rollup](https://rollupjs.org/)
* [webcomponents polyfills](https://github.com/webcomponents/polyfills)
* [karma](https://karma-runner.github.io/)
* [jasmine](https://jasmine.github.io/)
* [lit](https://lit.dev/) (optional)
* [storybook](https://storybook.js.org/) (optional)

## Getting started

Download this project for local development of web components:

Click the "Clone this template" button on the github page and then clone your new repo it in your local machine.

OR

Use [degit](https://github.com/Rich-Harris/degit/) or any similar tool.

``` bash
npm install -g degit #In case you don't have it installed
degit tx2z/wc-base-typescript
```

Once the project is on your computer, enter the folder and install all npm dependencies:

``` bash
npm i
```

The components are stored in "[src/components](src/components)". Create a folder with the name you want to give to your component.

For a quick start, you can copy the content of the example components in the folder:

* **base-component** create a web component with no dependencies or libraries.

* **lithtml-component** create a web component using [lit](https://lit.dev/) as template library.

* **noshadow-component** create a custom element (not sure if it can be called a web component) without using the shadow DOM & with no dependencies or libraries.

Include your defined custom element in "[public/index.html](public/index.html)" so you can test it while developing.

To run a server in development mode run:

``` bash
npm start
```

Your components will be compiled every time you save a file.

## Tests

[Karma](https://karma-runner.github.io/) & [jasmine](https://jasmine.github.io/) are used as testing environment and framework.

Inside the example components, there is a file ending with "**spec.ts**" where you can write your tests with typescript.

Launchers for chrome and firefox are already installed and configured but you can install and use any other [karma-launcher](https://www.npmjs.com/search?q=keywords:karma-launcher).

To run your test use:

``` bash
npm test
```

## Using Storybook

You can optionally use [storybook](https://storybook.js.org/) to develop, document and create a gallery for your web components. You can learn more about storybook in their [documentation site](https://storybook.js.org/docs/basics/introduction/).

Storybook for HTML is used and tuned so no further configuration is needed to use it for your components. The following storybook addons are included:

* [Essentials](https://storybook.js.org/docs/essentials/introduction): Includes Controls (edit props dynamically), Viewport (responsive testing), Docs (documentation), Actions, and more.

* [A11y](https://storybook.js.org/docs/writing-tests/accessibility-testing): Helps to make your web components more accessible.

This is a standard storybook installation. You can add other [addons](https://storybook.js.org/integrations/) or configurations that suit your needs.

### Create stories

There are two files inside the example components that are used by storybook.

* **@component.stories.ts**: Is the file to create a story for your component. You can check storybook documentation about how to create stories starting [here](https://storybook.js.org/docs/guides/guide-html/#step-4-write-your-stories)

* **README.md**: It's used to add documentation for your component using the [Docs](https://github.com/storybookjs/storybook/tree/master/addons/docs) storybook add-on.

Storybook will use these two files to generate the stories and the documentation. Once these two files are present run storybook with:

``` bash
npm run storybook
```

To build a static storybook app ready to be deployed run:

``` bash
npm run storybook-build
```

You can find your storybook builds in the "dist-storybook" folder.

***Storybook is optional. If you're not using it you can remove (or not create) the @component.stories.ts file. Even you can remove all the storybook and webpack references in the [package.json](package.json) to completely remove storybook from your project.***

## Build the components

``` bash
npm run build
```

You can find your builds in the "dist" folder.

Your components will be compiled in a js file (as [ES module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)), to use them as modules in your application, and in a dist.js (as [iife](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)), to use them directly in browsers, with the same name you give to the folder in "[src/components](src/components)".

All modules include their respective [Typescript declaration files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html).

The [webcomponents polyfills](https://github.com/webcomponents/polyfills) are included as well in the "dist" folder, you can use them or load directly the code from a CDN such as unpkg: <https://unpkg.com/@webcomponents/webcomponentsjs@^2/>

## Publish component to NPM

A **README.md** and a **"package.json"** are created as well in every component folder, so you can upload them separately to the NPM registry. You can change the content in the "package.json" file inside the example components.
