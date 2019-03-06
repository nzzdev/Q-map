# Q Map [![Build Status](https://travis-ci.com/nzzdev/Q-map.svg?branch=dev)](https://travis-ci.com/nzzdev/Q-map) [![Greenkeeper badge](https://badges.greenkeeper.io/nzzdev/Q-map.svg)](https://greenkeeper.io/)

**Maintainer**: [manuelroth](https://github.com/manuelroth)

Q map is one tool of the Q toolbox to produce simple pointer maps.
Test it in the [demo](https://q-demo.st.nzz.ch/).

## Table of contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Testing](#testing)
- [Tool implementation details ](#tool-implementation-details)
- [License](#license)

## Installation

```bash
$ npm install
$ npm run build
```

[to the top](#table-of-contents)

## Configuration

`LAYER_CONFIGS` must be specified as an environment parameter when starting the tool. Please have a look at `dev-config/server-config.js` for examples on what this environment parameter should look like.

If you work with [Q-cli](https://github.com/nzzdev/Q-cli) there is a config file `dev-config/server-config.js` for starting Q dev server. Add an env.json file in repository root with the following content and adjust mapbox tokens, map ids and target names (here: `nzz_ch` and `nzzas`) accordingly:

```json
{
  "mapboxTokens": {
    "nzz_ch": "token 1",
    "nzzas": "token 2"
  },
  "mapIds": {
    "nzz_ch": {
      "standard": {
        "full": "map id",
        "background": "map id",
        "labels": "map id"
      },
      "lessLabels": {
        "full": "map id",
        "background": "map id",
        "labels": "map id"
      },
      "terrain": {
        "full": "map id",
        "background": "map id",
        "labels": "map id"
      },
      "reduced": {
        "full": "map id",
        "background": "map id",
        "labels": "map id"
      }
    },
    "nzzas": {
      "standard": {
        "full": "map id",
        "background": "map id",
        "labels": "map id"
      },
      "lessLabels": {
        "full": "map id",
        "background": "map id",
        "labels": "map id"
      },
      "terrain": {
        "full": "map id",
        "background": "map id",
        "labels": "map id"
      },
      "reduced": {
        "full": "map id",
        "background": "map id",
        "labels": "map id"
      }
    }
  }
}
```

Of course with another mapbox configuration you have to adjust the LAYER_CONFIGS defintion as well so that it fits your needs.

[to the top](#table-of-contents)

## Development

Install the [Q cli](https://github.com/nzzdev/Q-cli) and start the Q dev server:

```
$ Q server -c ./dev-config/server-config.js
```

Run the Q tool:
```
$ npm run dev.js
```

[to the top](#table-of-contents)

## Testing
The testing framework used in this repository is [Code](https://github.com/hapijs/code).

Run the tests:
```
$ npm run test
```

### Implementing a new test

When changing or implementing...
- A `route`, it needs to be tested in the `e2e-tests.js` file
- Something on the frontend, it needs to be tested in the `dom-tests.js` file

[to the top](#table-of-contents)

## Tool implementation details

The tool structure follows the general structure of each Q tool. Further information can be found in [Q server documentation - Developing tools](https://nzzdev.github.io/Q-server/developing-tools.html).

[to the top](#table-of-contents)

## License
Copyright (c) 2019 Neue Zürcher Zeitung. All rights reserved.

This software is published under the MIT license.

[to the top](#table-of-contents)
