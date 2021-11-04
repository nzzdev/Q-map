# Q Map [![Build Status](https://travis-ci.com/nzzdev/Q-map.svg?branch=dev)](https://travis-ci.com/nzzdev/Q-map) [![Greenkeeper badge](https://badges.greenkeeper.io/nzzdev/Q-map.svg)](https://greenkeeper.io/)

**Maintainer**: [manuelroth](https://github.com/manuelroth)

Q map is one tool of the Q toolbox to produce simple pointer maps.
Test it in the [demo](https://q-demo.st.nzz.ch/).

## Table of contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Functionality](#functionality)
- [License](#license)

## Installation

```bash
git clone git@github.com:nzzdev/Q-map.git
cd ./Q-map
nvm use
npm install
jspm install
npm run build
```

[to the top](#table-of-contents)

## Configuration

`LAYER_CONFIGS` must be specified as an environment parameter when starting the tool. Please have a look at `dev-config/server-config.js` for examples on what this environment parameter should look like.

Add an env.json file in repository root with the following content and adjust mapbox tokens, map ids and target names (here: `nzz_ch` and `nzzas`) accordingly:

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

Start the Q dev server:

```
npx @nzz/q-cli server -c ./dev-config/server-config.js
```

Run the Q tool:

```
node dev.js
```

[to the top](#table-of-contents)

## Testing

The testing framework used in this repository is [Code](https://github.com/hapijs/code).

Run the tests:

```
npm run test
```

### Implementing a new test

When changing or implementing...

- A `route`, it needs to be tested in the `e2e-tests.js` file
- Something on the frontend, it needs to be tested in the `dom-tests.js` file

[to the top](#table-of-contents)

## Deployment

We provide automatically built docker images at https://hub.docker.com/r/nzzonline/q-map/.
There are three options for deployment:

- use the provided images
- build your own docker images
- deploy the service using another technology

### Use the provided docker images

1. Deploy `nzzonline/q-map` to a docker environment
2. Set the ENV variables as described in the [configuration section](#configuration)

[to the top](#table-of-contents)

## Functionality

The tool structure follows the general structure of each Q tool. Further information can be found in [Q server documentation - Developing tools](https://nzzdev.github.io/Q-server/developing-tools.html).

Q Map uses the [svelte framework](https://svelte.technology/guide) to render the markup on server-side. Additionally a jspm bundle is transpiled for all interactive parts on client-side.

### Options

#### baselayer

This option allows to switch between six different basemaps.

#### initialZoomLevel

Allows to specify the zoomlevel of the basemap.

#### minimap and minimapInitialZoomOffset

Show a minimap and specify a minimap zoomlevel.

#### labelsBelowMap

Allows to show the marker labels below the map.

#### showLegend

This options allows to show the legend. The legend only shows something if features where added as geojson.

#### Display Options

Display options can be set before embedding the graphic in the article.

##### hideTitle

Allows to hide the title

##### allowInteraction

Allows to zoom in/out of the map

[to the top](#table-of-contents)

## License

Copyright (c) 2019 Neue Zürcher Zeitung. All rights reserved.

This software is published under the [MIT](LICENSE) license.

[to the top](#table-of-contents)
