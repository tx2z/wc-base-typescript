WEB COMPONENTS GENERATOR WITH TYPESCRIPT
========================================

Project to create stand-alone web components with typescript.

Uses:

* [typescript](https://www.typescriptlang.org/)
* [webpack](https://webpack.js.org/)
* [webcomponents polyfills](https://github.com/webcomponents/polyfills)
* [lit-html](https://lit-html.polymer-project.org/) (optional)

Getting started
---------------

Download this project for local development of web components. You can use [degit](https://github.com/Rich-Harris/degit/) or any similar tool for convenience.

``` bash
npm install -g degit #In case you don't have it installed
degit tx2z/wc-base-typescript
```

Once the project is in your computer, enter the folder and install all npm dependencies:

``` bash
npm i
```

The components are stored in "[src/components](src/components)". Create a folder with the name you want to give to your component.

For a quick start, you can copy the content of the example components in the folder:

* **base-component** create a web component with no dependencies or libraries (other than the polyfills).

* **lithtml-component** create a web component using [lit-html](https://lit-html.polymer-project.org/) as template library.

* **noshadow-component** create a custon element (not sure if it can be called a web component) without using the shadow DOM & with no dependencies or libraries (other than the polyfills).

Include your defined custom element in "[public/index.html](public/index.html)" so you can test it while developing.

To run a server in development mode run:

``` bash
npm start
```

Your components will be compiled every time you save a file.

Build the components for production
-----------------------------------

``` bash
npm run build
```

You can find your builds in the "dist" folder.

Your components will be compiled in a single js file with the same name you give to the folder in "[src/components](src/components)".

The [webcomponents polyfills](https://github.com/webcomponents/polyfills) are included as well in the "dist" folder, you can use them or load directly the code from a CDN such as unpkg: <https://unpkg.com/@webcomponents/webcomponentsjs@^2/>
