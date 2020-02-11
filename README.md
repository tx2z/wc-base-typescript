# WEB COMPONENTS GENERATOR WITH TYPESCRIPT

Project to create stand-alone web components with typescript.

Uses:

* [typescript](https://www.typescriptlang.org/)
* [webpack](https://webpack.js.org/)
* [webcomponents polyfills](https://github.com/webcomponents/polyfills)
* [storybook](https://storybook.js.org/) (optional)
* [lit-html](https://lit-html.polymer-project.org/) (optional)

## Getting started

Download this project for local development of web components. You can use [degit](https://github.com/Rich-Harris/degit/) or any similar tool for convenience.

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

* **base-component** create a web component with no dependencies or libraries (other than the polyfills).

* **lithtml-component** create a web component using [lit-html](https://lit-html.polymer-project.org/) as template library.

* **noshadow-component** create a custom element (not sure if it can be called a web component) without using the shadow DOM & with no dependencies or libraries (other than the polyfills).

Include your defined custom element in "[public/index.html](public/index.html)" so you can test it while developing.

To run a server in development mode run:

``` bash
npm start
```

Your components will be compiled every time you save a file.

## Using Storybook

You can optionally use [storybook](https://storybook.js.org/) to develop, document and create a gallery for your web components. You can learn more about storybook in their [documentation site](https://storybook.js.org/docs/basics/introduction/).

Storybook for HTML is used and tuned so no further configuration is needed to use it for your components. The following storybook addons are included:

* [Knobs](https://github.com/storybookjs/storybook/tree/master/addons/knobs): Allows edit web components' props dynamically using the Storybook UI.

* [Viewport](https://github.com/storybookjs/storybook/tree/master/addons/viewport): Allows web components to be displayed in different sizes and layouts in Storybook. This helps build responsive web components inside of Storybook.

* [A11y](https://github.com/storybookjs/storybook/tree/master/addons/a11y): Helps to make your web components more accessible.

* [Notes](https://github.com/storybookjs/storybook/tree/master/addons/notes): Allows to write notes or documentation for your web components.

This is a standard storybook installation. You can add other [addons](https://github.com/storybookjs/storybook/tree/master/addons/) or configurations that suit your needs.

### Create stories

There are two files inside the example components that start by a "@" and are only used by storybook.

* **@component.stories.ts**: Is the file to create a story for your component. You can check storybook documentation about how to create stories starting [here](https://storybook.js.org/docs/guides/guide-html/#step-4-write-your-stories)

* **@component.notes.md**: It's used to add documentation for your component using the [Notes](https://github.com/storybookjs/storybook/tree/master/addons/notes) storybook addon.

Storybook will use these two files to generate the stories and the documentation. Once these two files are present run storybook with:

``` bash
npm run storybook
```

To build a static storybook app ready to be deployed run:

``` bash
npm run storybook-build
```

You can find your storybook builds in the "dist-storybook" folder.

***Storybook is optional. If you're not using it you can remove (or not create) the @component.stories.ts and @component.notes.md files. Even you can remove all the storybook references in the [package.json](package.json) to completely remove storybook from your project.***

## Build the components for production

``` bash
npm run build
```

You can find your builds in the "dist" folder.

Your components will be compiled in a single js file with the same name you give to the folder in "[src/components](src/components)".

The [webcomponents polyfills](https://github.com/webcomponents/polyfills) are included as well in the "dist" folder, you can use them or load directly the code from a CDN such as unpkg: <https://unpkg.com/@webcomponents/webcomponentsjs@^2/>
