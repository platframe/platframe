<p align="center">
    <a href="http://platframe.com">
        <img src="http://platframe.com/assets/images/linked/platframe.svg" width=100 height=100>
    </a>
</p>

<h1 align="center">Platframe</h1>

<p align="center">
    Modular framework for structured and scalable frontend development.
</p>

<p align="center">
    <a href="https://travis-ci.org/platframe/platframe"><img src="https://travis-ci.org/platframe/platframe.svg?branch=master"></a>
    <a href="https://www.bithound.io/github/platframe/platframe"><img src="https://www.bithound.io/github/platframe/platframe/badges/score.svg"></a>
    <a href="https://david-dm.org/platframe/platframe?type=dev"><img src="https://david-dm.org/platframe/platframe/dev-status.svg"></a>
    <a href="https://gitter.im/platframe"><img src="https://badges.gitter.im/platframe.png"></a>
</p>
<br>

## Table of contents
- [Overview](#overview)
- [Getting started](#getting-started)
- [Documentation](#documentation)
- [Contributing](#contributing)

## Overview
Platframe is a structured and modular frontend framework suitable for both single and multi-page applications.

### Purpose
To provide a sound development platform with constructs that enhance developer efficiency and tooling that supports the frontend workflow.

This is achieved through the following key objectives:

- An architecture that is semantic, modular and scalable
- Consistent patterns for structuring source code and common assets
- A workflow strategy that facilitates both the development and production phase
- A component implementation to modularize discrete UI concerns and optimize reuse
- A collection of defaults that address common markup, style and logic concerns
- A base template for use as a springboard in new projects

#### Notes
CSS development methodology and coding style is beyond the framework's purview.
The primary concern is not to expose a collection of predefined styles, but rather to allow the preference of the developer/team and requirements of the project to determine the most suitable approach to styling.

As the framework remains minimally prescriptive on the methodology you use for authoring CSS, the usage scope of the class selector is largely a decision you get to make. A notable exception is components, which for consistency should be ID'd with a class as [described](http://platframe.com/docs/components/#create-style) in the documentation.

### Stack
[Pug](https://pugjs.org), [Stylus](http://stylus-lang.com) and JavaScript

### Ulterior functions
Beyond the scope of its core functions, Platframe may also be used as a static site generator or a structural blueprint for new frontends.

#### Generator
Using the framework as a static site generator lends its core benefits to your project, regardless of size.
This facilitates projects with less complex requirements. 
Put the platform in development mode to start adding content and optionally customize the default template. 
Refer to [Getting started](#getting-started).

#### Blueprint
Frontend architecture is often an afterthought, resulting in a maintenance burdern down the line.
You may be able to avoid this by modelling your frontend's structure on Platframe's architecture.
Here's an outline of how your project could benefit:

- Consistent patterns for asset structuring
- Facilitates growth as the structure scales predictively
- Exposes a structural hierarchy that optimizes efficiency through inheritance
- A modular design that keeps your code <abbr title="don't repeat yourself">DRY</abbr>
- Reduce or eliminate dev time spent on architectural decisions

Refer to the section on [architecture](http://platframe.com/docs/#architecture) in the docs for more detail.
When using Platframe solely as a blueprint for structuring a new frontend, it becomes largely stack-agnostic.
The only prerequisite is that the chosen stack should have sufficient feature parity with the respective language features of *Pug*, *Stylus* and JavaScript employed by the framework in order to  abide by the requirements of the architecture.

## Getting started

### Get the source
- Option 1: [download the latest release](https://github.com/platframe/platframe/archive/v1.0.0.zip)
- Option 2: clone the repo: `git clone https://github.com/platframe/platframe.git project`

### Install &amp; customize
1. Ensure that you have [Node.js](https://nodejs.org) and NPM or [Yarn](https://yarnpkg.com) on your machine
2. In the root of your project, run `yarn` or `npm install`
3. Change the default metadata in `package.json` to reflect your project

### Develop
Spin up the development environment by running `grunt develop`  
By default, the *dev* server runs at `localhost:3003`  
The build system takes care of transpiling modified sources and triggering client updates

### Test
Run your test suit\* with `grunt test`  
Build, test and serve a production build for inspection with `grunt preflight`  
To simply deploy a previous build locally for inspection, run `grunt serve`  
By default, the *prod* server runs at `localhost:3030`  

\* Currently, only linting for JavaScript is wired to the test task. You are responsible for integrating additional testing mechanisms as required.

### Deploy
For an optimized, production-targeted build, run `grunt build`  
You can optionally wire your deployment logic to `grunt deploy`

## Documentation
The documentation can be found at [platframe.com/docs](http://platframe.com/docs)

## Contributing
Refer to the contribution [guidelines](.github/CONTRIBUTING.md) on how to get started.

---

## Meta
&#169; 2018 [Cygnul](http://cygnul.com). 
Authored by [@gidhon](https://github.com/gidhon). 
Released under the [MIT](LICENSE) license.
