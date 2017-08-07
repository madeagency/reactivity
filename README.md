# Reactivity

A Bleeding Edge React Universal Boilerplate for Power Users.

[![Code Climate](https://codeclimate.com/repos/598770109f7dbb02640013d9/badges/dac168d1b640d9ab7e3e/gpa.svg)](https://codeclimate.com/repos/598770109f7dbb02640013d9/feed) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-request-process) [![Dependency Status](https://david-dm.org/madeagency/reactivity.svg)](https://david-dm.org/madeagency/reactivity) [![devDependency Status](https://david-dm.org/madeagency/reactivity/dev-status.svg)](https://david-dm.org/madeagency/reactivity#info=devDependencies)

What is Reactivity? Well at its most basic definition it is how easily an atom has a chemical reaction with another element. Our goal is to achieve stable valence levels, A full valence shell if you will.

But really its just a Boilerplate.

Because that whats missing in the react realm right?

Well see we need a boilerplate for people who want to be able to tweak every atom of an application a simple boilerplate that doesn't contain any magic or code generation that takes pages of documentation to learn how to override, its a boilerplate for power users.

## Features

You will find that this boilerplate covers all the expected areas such as SEO, Hot Reloading and all the other things typically covered in a boilerplate, check our pull requests to see whats coming up.

Whats unique about this boilerplate however is:

- Universal Rendering with Code Splitting.
- RXJS for action side effects.
- PWA Ready.
- No scaffolding tools.
- No Automated service worker generation, you get to write your own.

## Getting Started

If you haven't yet start by installing [yarn](https://yarnpkg.com/en/).

1. Clone this repo using `git clone --depth=1 https://github.com/madeagency/reactivity.git`
2. Move to the appropriate directory: `cd reactivity`.
3. Copy the `.sample.env` to `.env` and change any details as required.
3. Run `yarn install` in order to install dependencies.
4. Run `yarn start` and you will see the app running at `http://localhost:[PORT_SPECIFIED_IN_.ENV]`.

## Deployment

This will largely vary however heres a super simple overview.

1. Ensure that your that `NODE_ENV` in your `.env` file is set to `production`.
2. Run `yarn build`
3. Run `node bin/server.js` to start the application.

You could also run `start:prod` after step one to immediately launch the app after its been built.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/madeagency/reactivity/tags). 

## Authors

* **Dawid** - *Initial work* - [dawidvdh](https://github.com/dawidvdh)
* **Ross** - *Initial work* - [rocbear](https://github.com/rocbear)

See also the list of [contributors](https://github.com/madeagency/reactivity/graphs/contributors) who participated in this project.

License
-------

Reactivity is © 2017 MADE Code PTY Ltd.
It is free software, and may be redistributed under the terms specified in the [LICENSE] file.

[LICENSE]: LICENSE

Maintained by
----------------

[![madeagency](https://www.made.co.za/logo.png)](https://www.made.co.za?utm_source=github)

Reactivity was created and is maintained MADE Agency PTY Ltd.
The names and logos for MADE Code are trademarks of MADE Code PTY Ltd.

We love open source software. See our [Github Profile](https://github.com/madeagency) for more.

We're always looking for talented people who love programming. [Get in touch] with us.

[Get in touch]: https://www.madecode.co.za?utm_source=github

## Acknowledgments

* [react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example)
* [BerkeleyTrue](https://github.com/BerkeleyTrue)
* [faceyspacey](https://github.com/faceyspacey)
