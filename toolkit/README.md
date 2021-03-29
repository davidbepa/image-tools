# Front end toolkit

[![npm][npm-image]]()

> Front end toolkit used to package and compile projects at Verndale

![Verndale | verndale.com](src/images/logo-verndale.png "Verndale")

## Getting Started

### Requirements

Download/install these tools/packages in order to run the toolkit locally.

- [Node][node-url] - `~12.x.x`
- [Yarn][yarn-url] - `~1.x.x`

### Install requirements

#### Install Node JS

Installing Node will also install the Node Package Manager ([npm][npm-url])

- Click [here][node-url] to grab the package
- Download the most current node which has the latest features
- Follow on screen instructions to complete installation

To make sure Node is installed properly, launch your terminal or command line and type:

```sh
node --version
```

#### Install Yarn

- Follow instructions [here][yarn-url]
- After installation, you should be able to run yarn on the command line

To make sure Yarn installed properly, launch your terminal or command line and type:

```sh
yarn --version
```

_You should see a version number such as this: `1.22.4`_

---

### Install dependencies

Once you have your requirements installed, navigate to the root of the toolkit in terminal or command line and run:

```sh
yarn
```

This will bring down all `dependencies` and `devDependencies` for the project that are defined in the `package.json` file so you can properly run a build and work on the project.

---

### Running the application

The build process will run a [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server) and serve up the application and assets at [http://localhost:3000](http://localhost:3000). The build will poll for changes in any file and refresh the browser automatically upon saving the file(s).

After npm finishes installing dependencies, run the following at the root of the project:

```sh
yarn start
```

Running this command will compile, by default, a `development` build and launch your primary browser automatically. You are now ready to start making changes to the JavaScript, SCSS and HTML.

---

## Components library

The toolkit uses [storybook](https://storybook.js.org/) to deliver all components (and modules) within an interactive UI. Developers should write one or multiple stories per component that describe all the states a component can support.

To start storybook run the following at the root of the project:

```sh
yarn storybook
```
---

## Builds

When working in the development environment, you will use the `yarn start` task to view up-to-date changes while you work.

For individual tasks, the following can be used:

- Compile landing page template - `gulp template`
- Compile and lint SCSS - `gulp sass`
- Compile JavaScript documentation - `yarn docs`
- Lint JavaScript files - `yarn js-lint`
- Build - `yarn build`
  _Gulp must be installed globally if you want to run the Gulp commands in the list above_

---

## Production build

The compiled and minified assets can be created by running `yarn build`. This will put all compiled and minified
files in the `dist` folder.

---

## Source code

### Page templates

The page templates can be found under the following folder:

- HTML - `src/html/templates`

> **Note:** each page template contains a collection of individual modules.
> To view the source code for these modules see the "Module source code" section below.

### Module source code

The module source code can be found under the following:

- HTML - `src/html/modules`
- SCSS - `src/scss/modules`
- JS - `src/js/modules`

### Component source code

The component source code can be found under the following:

- HTML - `src/html/components`
- SCSS - `src/scss/components`
- JS - `src/js/components`

### Stories source code

The stories source code can be found under the following:

- Components - `src/stories/components`
- Modules - `src/stories/modules`
- Templates - `src/stories/templates`

[node-url]: https://nodejs.org/en/
[yarn-url]: https://classic.yarnpkg.com/en/docs/install/#mac-stable
[npm-url]: https://www.npmjs.com/
[verndale-logo]: src/images/logo-verndale.png?raw=true "Verndale"
[npm-image]: https://img.shields.io/npm/v/npm.svg
