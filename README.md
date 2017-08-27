# Reactivity

A Bleeding Edge React Universal Boilerplate for Power Users.

[![Code Climate](https://codeclimate.com/repos/598770109f7dbb02640013d9/badges/dac168d1b640d9ab7e3e/gpa.svg)](https://codeclimate.com/repos/598770109f7dbb02640013d9/feed) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-request-process) [![Dependency Status](https://david-dm.org/madeagency/reactivity.svg)](https://david-dm.org/madeagency/reactivity) [![devDependency Status](https://david-dm.org/madeagency/reactivity/dev-status.svg)](https://david-dm.org/madeagency/reactivity#info=devDependencies) [![Greenkeeper badge](https://badges.greenkeeper.io/madeagency/reactivity.svg?token=ddba641b3d2a0d2bf1c8abc674cebd3b48a8383755bb7b02fd3cf1878f86de9a&ts=1502800234197)](https://greenkeeper.io/)

What is Reactivity? Well at its most basic definition it is how easily an atom has a chemical reaction with another element. Our goal is to achieve stable valence levels, a full valence shell if you will.

But really it's just a boilerplate.

Because that's what's missing in the React realm right?

Well see we need a boilerplate for people who want to be able to tweak every atom of an application and a simple boilerplate that doesn't contain any magic or code generation that takes pages of documentation to learn how to override, it's a boilerplate for power users.

#### View our [Example App Here](https://reactivity.now.sh)

Deployed using [now](https://zeit.co/now) like so `now --public --dotenv=.env`

## Features

You will find that this boilerplate covers all the expected areas such as SEO, Hot Reloading and all the other things typically covered in a boilerplate, check out our pull requests to see what's coming up.

Whats unique about this boilerplate however is:

- Universal Rendering with Code Splitting - *(thanks to [react-universal-component](https://github.com/faceyspacey/react-universal-component))*
- RXJS for action side effects. - *(thanks to [react-redux-epic](https://github.com/BerkeleyTrue/react-redux-epic))*
- PWA Ready.
- No scaffolding tools.
- No Automated service worker generation, you get to write your own. - *(thanks to [serviceworker-webpack-plugin](https://github.com/oliviertassinari/serviceworker-webpack-plugin))*

## Getting Started

If you haven't yet start by installing [yarn](https://yarnpkg.com/en/).

1. Clone this repo using `git clone --depth=1 https://github.com/madeagency/reactivity.git`
2. Move to the appropriate directory: `cd reactivity`.
3. Copy the `.sample.env` to `.env` and change any details as required.
4. Run `yarn install` in order to install dependencies.
5. Run `yarn dev` for development mode or `yarn prod` for production mode and you will see the app running at `http://localhost:[PORT_SPECIFIED_IN_.ENV]`.

*Note: you may want to set `ENABLE_SW` to `false` in the `.env` file to disable the service worker during development*

## Deployment

This will largely vary however heres a super simple overview.

1. Run `yarn build`
2. Run either `yarn start` or `node bin/server.prod.js` to start the application.

You could also run `start:prod` after step one to immediately launch the app after its been built.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

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
