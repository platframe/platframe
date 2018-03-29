# Contributing
Whether you're a newcomer or experienced contributor, help with updating, extending or otherwise improving Platframe is greatly appreciated. Please use the guidelines below to get started.

## Issue tracker
The [issue tracker](https://github.com/platframe/platframe/issues) should be used for bug reports and feature requests. First, scan the existing list to ensure that your concern is not already addressed. If it is already created but unassigned, you're welcome to request custody of the issue if you're so inclined. Otherwise, [create a new report](https://github.com/platframe/platframe/issues/new).

## Feature requests
To avoid waisted effort, new feature requests will be peer-reviewed to establish the viability and importance of your request as it relates to the current purpose and scope of the project. 

## Setup process

1. [Fork](https://help.github.com/fork-a-repo/) the project

2. Clone your fork
```bash
git clone https://github.com/<your-username>/platframe.git
```

3.  Add *upstream* as a remote to keep your clone in sync.
```bash
# enter the cloned directory
cd platframe
# set "upstream" to point to the canonical repository
git remote add upstream https://github.com/platframe/platframe.git
```

4. Refresh a stale clone (optional)
```bash
# get the latest changes from upstream
git checkout dev
git pull upstream dev
```

5. Create a topic branch off the main development branch
```bash
# "dev" is the development branch of this repo
git checkout dev
# issue-x will contain your work
git checkout -b <issue-number>
```

6. Prepare the environment and start the server
```bash
# install the dependencies
npm install # or yarn
# fire up the dev build with live-reload server at localhost:3003
npm start
```

7. Commit your changes (with respect to [best practices](https://chris.beams.io/posts/git-commit/#seven-rules))

8. Merge the upstream development branch into your topic branch
```bash
git pull upstream dev
```

9. Push your topic branch up to your fork
```bash
git push origin issue-x
```

10. Open a [Pull Request](https://help.github.com/articles/about-pull-requests/) against the `dev` branch

## Versioning
Platframe is maintained under the [Semantic Versioning](http://semver.org) guidelines.
Changelogs can be viewed in the [releases section](../../releases). Announcements of noteworthy changes may also be posted to [Twitter](https://twitter.com/platframe).

## Code style
In lieu of a formal style guide, take care to maintain the existing coding style.

----------

**Note**: By submitting a contribution, you agree to allow the project owners to
license your work under the terms of the [MIT](https://github.com/platframe/platframe/blob/master/LICENSE) license.
