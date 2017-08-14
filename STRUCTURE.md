# STRUCTURE

Introduce DApp architecture.

## DApp architecture

```
ens-bid-dapp
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
└── src
    ├── components
    |   └── Some.js
    └── lib
        └── SomeService.js
        └── SomeHelper.js
        └── SomeHelper.test.js
        └── utils.js
        └── utils.test.js
        └── app.http

```

`./src/components` : React Components

`./src/components/lib` : Lib functions for React components.

`./src/lib/SomeService.js` : API connections methods for the `Some` component. Usually `Some` is a [container component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).

`./src/lib/SomeHelper.js` : Help functions for the `Some` component.

`./src/lib/SomeHelper.test.js` : For [Jest](https://facebook.github.io/jest/) testing.

`./src/lib/utils.js` : Common util functions for components.

`./src/lib/utils.test.js`: For Jest testing.

`./src/lib/lib/app.http` (optional) : REST testing scripts for [vs-code rest client](https://github.com/Huachao/vscode-restclient)
