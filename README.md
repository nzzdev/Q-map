# Q Map

Q map is one tool of the Q toolbox to produce simple pointer maps.
Test it in the demo: https://q-demo.st.nzz.ch/

## Implementation details

The tool structure follows the general structure of each Q tool. Further information can be found in [Q server documentation - Developing tools](https://nzzdev.github.io/Q-server/developing-tools.html).

`LAYER_CONFIGS` must be specified as an environment parameter when starting the tool. Please see the test script command in `package.json` or `dev-config/server-config.js` for examples on what this environment parameter should look like.

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

## License

Copyright (c) 2017 Neue Zürcher Zeitung. All rights reserved.

This software is published under the MIT license.
