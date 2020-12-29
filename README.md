<p align="center" xmlns="http://www.w3.org/1999/html">
    <a href="https://platframe.com">
        <img src="https://platframe.com/assets/images/external/_linked/platframe.svg" width=100 height=100>
    </a>
</p>

<h1 align="center">Platframe</h1>

<p align="center">
    Modular platform for structured and scalable frontend development.
</p>

<p align="center">
    <a href="https://travis-ci.org/platframe/platframe"><img src="https://travis-ci.org/platframe/platframe.svg?branch=master"></a>
    <a href="https://www.codacy.com/app/platframe/platframe?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=platframe/platframe&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/e2faa208e2b94932b4612df9cf306bd5"/></a>
    <a href="https://david-dm.org/platframe/platframe?type=dev"><img src="https://david-dm.org/platframe/platframe/dev-status.svg"></a>
    <a href="https://app.netlify.com/sites/platframe-branch-master/deploys"><img src="https://api.netlify.com/api/v1/badges/2ba198a8-5364-4a8d-b660-81c4ac0f2225/deploy-status" alt="Netlify Status"></a>
    <!-- <a href="http://t.me/platframe"><img src="https://img.shields.io/badge/telegram-chat-30A7DE.svg"></a> -->
</p>

<p align="center">
    Build and deploy your new project in one go:
</p>

<p align="center">
    <a href="https://app.netlify.com/start/deploy?repository=https://github.com/platframe/platframe">
        <img src="https://www.netlify.com/img/deploy/button.svg" alt="Take Platframe for a spin on Netlify">
    </a>
</p>

## Table of contents
- [Overview](#overview)
- [Getting started](#getting-started)
- [Documentation](#documentation)
- [Contributing](#contributing)

## Overview
Platframe is a structured and modular frontend development platform suitable for building both multi (MPA) and single page applications (SPA) that are backend agnostic.

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

Refer to the section on [architecture](https://platframe.com/docs/#architecture) in the docs for more detail.
When using Platframe solely as a blueprint for structuring a new frontend, it becomes largely stack-agnostic.
The only prerequisite is that the chosen stack should have sufficient feature parity with the respective language features of *Pug*, *Stylus* and JavaScript employed by the framework in order to  abide by the requirements of the architecture.

## Getting started

### 1. Prerequisites

- Node.js&nbsp; `≥ v8.0`
- NPM&nbsp; `≥ v5.2`

##### Optional:
- Yarn
- Node Version Manager (nvm)

### 2. Get the source

- Option 1: `npx degit platframe/new my-app`
- Option 2: [download](https://github.com/platframe/platframe/releases/latest) the latest release

### 3. Install

You may run [nvm](http://nvm.sh) to ensure you use the recommended Node version:
- `cd my-app && nvm use`

Install the dependencies:
- `cd my-app && yarn install`

Alternatively, setup your VCS as part of the installation run:
- `cd my-app && git init && yarn`

If you intend to use `.env`, remove its `.sample` extension.  
Change the default metadata in `package.json` to reflect your project.  

### Develop
Spin up the development environment by running `yarn develop`  
By default, the build will be served at `localhost:3000`  
The build system takes care of transpiling modified sources and triggering client updates

### Test
Run your test suite\* with `npm test`  
Build, test and serve a production build for inspection with `npm run preflight`.  
In addition to hosting the build on your local machine, the `preflight` task will also provision a tunneled, public URL for previewing the build outside your local network.

\* Currently, only linting for JavaScript is wired to the test task. You are responsible for integrating additional testing mechanisms as required.

### Deploy
For an optimized, production-targeted build, run `yarn build`  
You can optionally wire your deployment logic to `yarn deploy`

## Documentation
The documentation can be found at [platframe.com/docs](https://platframe.com/docs)

## Contributing
Refer to the contribution [guidelines](.github/CONTRIBUTING.md) on how to get started.

---

## Meta
&#169; 2018 [Cygnul](https://cygnul.com).
Authored by [@gidhon](https://github.com/gidhon).
Released under the [MIT](LICENSE) license.


[http://nvm.sh]: http://nvm.sh
