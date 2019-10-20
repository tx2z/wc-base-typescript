WEB COMPONENTS BASE WITH TYPESCRIPT
===================================

Project to create encapsulated web components with typescript

Uses:

* [typescript](https://www.typescriptlang.org/)
* [webpack](https://webpack.js.org/)
* [webcomponents polyfills](https://github.com/webcomponents/polyfills)
* [lit-html](https://lit-html.polymer-project.org/) (optional)

Getting started
---------------

Fork this project to use it in your own github account or download it for local development.

Once the project is in your computer, install all npm dependencies:

``` bash
npm i
```

The components are stored in "[src/components](src/components)". Create a folder with the name you want to give to your component.

For a quick start, you can copy the content of the two example components in the folder:

* **base-component** create a web component with no dependencies or libraries (other than the polyfills).

* **lithtml-component** create a web component using [lit-html](https://lit-html.polymer-project.org/) as template library.

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

You can find you builds in the "dist" folder.

Your components will be compiled in a single js file with the same name you give to the folder in "[src/components](src/components)".

The [webcomponents polyfills](https://github.com/webcomponents/polyfills) are included as well in the "dist" folder you can make use o them or load the code from a CDN such as unpkg: <https://unpkg.com/@webcomponents/webcomponentsjs@^2/>
