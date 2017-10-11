SystemJS.config({
  browserConfig: {
    "paths": {
      "q-map/": "/slippyMap/"
    }
  },
  nodeConfig: {
    "paths": {
      "q-map/": "slippyMap/"
    }
  },
  transpiler: "plugin-babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:": "jspm_packages/github/",
    "npm:": "jspm_packages/npm/"
  },
  map: {
    "clean-css": "npm:clean-css@3.4.9",
    "core-js": "npm:core-js@1.2.6",
    "css": "github:systemjs/plugin-css@0.1.20/css.js",
    "fg-loadcss": "npm:fg-loadcss@0.2.4",
    "leaflet-label": "npm:leaflet-label@0.2.1-0"
  },
  packages: {
    "q-map": {
      "main": "q-map.js"
    },
    "npm:amdefine@1.0.0": {
      "map": {
        "fs": "npm:jspm-nodelibs-fs@0.2.0",
        "module": "npm:jspm-nodelibs-module@0.2.0",
        "path": "npm:jspm-nodelibs-path@0.2.0",
        "process": "npm:jspm-nodelibs-process@0.2.0"
      }
    },
    "npm:clean-css@3.4.9": {
      "map": {
        "buffer": "npm:jspm-nodelibs-buffer@0.2.0",
        "commander": "npm:commander@2.8.1",
        "fs": "npm:jspm-nodelibs-fs@0.2.0",
        "http": "npm:jspm-nodelibs-http@0.2.0",
        "https": "npm:jspm-nodelibs-https@0.2.0",
        "os": "npm:jspm-nodelibs-os@0.2.0",
        "path": "npm:jspm-nodelibs-path@0.2.0",
        "process": "npm:jspm-nodelibs-process@0.2.0",
        "source-map": "npm:source-map@0.4.4",
        "url": "npm:jspm-nodelibs-url@0.2.0",
        "util": "npm:jspm-nodelibs-util@0.2.0"
      }
    },
    "npm:commander@2.8.1": {
      "map": {
        "child_process": "npm:jspm-nodelibs-child_process@0.2.0",
        "events": "npm:jspm-nodelibs-events@0.2.0",
        "fs": "npm:jspm-nodelibs-fs@0.2.0",
        "graceful-readlink": "npm:graceful-readlink@1.0.1",
        "path": "npm:jspm-nodelibs-path@0.2.0",
        "process": "npm:jspm-nodelibs-process@0.2.0"
      }
    },
    "npm:core-js@1.2.6": {
      "map": {
        "fs": "npm:jspm-nodelibs-fs@0.2.0",
        "path": "npm:jspm-nodelibs-path@0.2.0",
        "process": "npm:jspm-nodelibs-process@0.2.0",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:graceful-readlink@1.0.1": {
      "map": {
        "fs": "npm:jspm-nodelibs-fs@0.2.0"
      }
    },
    "npm:leaflet-label@0.2.1-0": {
      "map": {
        "fs": "npm:jspm-nodelibs-fs@0.2.0"
      }
    },
    "npm:source-map@0.4.4": {
      "map": {
        "amdefine": "npm:amdefine@1.0.0",
        "process": "npm:jspm-nodelibs-process@0.2.0"
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "leaflet-minimap": "npm:leaflet-minimap@3.4.0",
    "text": "github:systemjs/plugin-text@0.0.9",
    "leaflet": "npm:leaflet@1.2.0",
    "assert": "npm:jspm-nodelibs-assert@0.2.0",
    "babel": "npm:babel-core@6.22.1",
    "buffer": "npm:jspm-nodelibs-buffer@0.2.1",
    "child_process": "npm:jspm-nodelibs-child_process@0.2.0",
    "constants": "npm:jspm-nodelibs-constants@0.2.0",
    "crypto": "npm:jspm-nodelibs-crypto@0.2.0",
    "events": "npm:jspm-nodelibs-events@0.2.0",
    "fs": "npm:jspm-nodelibs-fs@0.2.0",
    "module": "npm:jspm-nodelibs-module@0.2.0",
    "os": "npm:jspm-nodelibs-os@0.2.0",
    "path": "npm:jspm-nodelibs-path@0.2.1",
    "process": "npm:jspm-nodelibs-process@0.2.0",
    "stream": "npm:jspm-nodelibs-stream@0.2.0",
    "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.0",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.20",
    "util": "npm:jspm-nodelibs-util@0.2.1",
    "vm": "npm:jspm-nodelibs-vm@0.2.0"
  },
  packages: {
    "npm:leaflet-minimap@3.4.0": {
      "map": {
        "path": "npm:jspm-nodelibs-path@0.2.0"
      }
    },
    "npm:babel-core@6.22.1": {
      "map": {
        "babel-helpers": "npm:babel-helpers@6.22.0",
        "babel-code-frame": "npm:babel-code-frame@6.22.0",
        "babel-template": "npm:babel-template@6.22.0",
        "babel-register": "npm:babel-register@6.22.0",
        "babel-generator": "npm:babel-generator@6.22.0",
        "babel-messages": "npm:babel-messages@6.22.0",
        "private": "npm:private@0.1.6",
        "minimatch": "npm:minimatch@3.0.3",
        "path-is-absolute": "npm:path-is-absolute@1.0.1",
        "slash": "npm:slash@1.0.0",
        "json5": "npm:json5@0.5.1",
        "convert-source-map": "npm:convert-source-map@1.3.0",
        "babel-traverse": "npm:babel-traverse@6.22.1",
        "babel-types": "npm:babel-types@6.22.0",
        "babel-runtime": "npm:babel-runtime@6.22.0",
        "lodash": "npm:lodash@4.17.4",
        "babylon": "npm:babylon@6.15.0",
        "debug": "npm:debug@2.6.0",
        "source-map": "npm:source-map@0.5.6"
      }
    },
    "npm:babel-helpers@6.22.0": {
      "map": {
        "babel-template": "npm:babel-template@6.22.0",
        "babel-runtime": "npm:babel-runtime@6.22.0"
      }
    },
    "npm:babel-register@6.22.0": {
      "map": {
        "babel-core": "npm:babel-core@6.22.1",
        "babel-runtime": "npm:babel-runtime@6.22.0",
        "home-or-tmp": "npm:home-or-tmp@2.0.0",
        "source-map-support": "npm:source-map-support@0.4.11",
        "lodash": "npm:lodash@4.17.4",
        "core-js": "npm:core-js@2.4.1",
        "mkdirp": "npm:mkdirp@0.5.1"
      }
    },
    "npm:babel-generator@6.22.0": {
      "map": {
        "babel-messages": "npm:babel-messages@6.22.0",
        "babel-types": "npm:babel-types@6.22.0",
        "babel-runtime": "npm:babel-runtime@6.22.0",
        "lodash": "npm:lodash@4.17.4",
        "detect-indent": "npm:detect-indent@4.0.0",
        "jsesc": "npm:jsesc@1.3.0",
        "source-map": "npm:source-map@0.5.6"
      }
    },
    "npm:babel-template@6.22.0": {
      "map": {
        "babel-traverse": "npm:babel-traverse@6.22.1",
        "babel-types": "npm:babel-types@6.22.0",
        "babel-runtime": "npm:babel-runtime@6.22.0",
        "lodash": "npm:lodash@4.17.4",
        "babylon": "npm:babylon@6.15.0"
      }
    },
    "npm:babel-traverse@6.22.1": {
      "map": {
        "babel-code-frame": "npm:babel-code-frame@6.22.0",
        "babel-messages": "npm:babel-messages@6.22.0",
        "babel-types": "npm:babel-types@6.22.0",
        "babel-runtime": "npm:babel-runtime@6.22.0",
        "lodash": "npm:lodash@4.17.4",
        "invariant": "npm:invariant@2.2.2",
        "globals": "npm:globals@9.14.0",
        "babylon": "npm:babylon@6.15.0",
        "debug": "npm:debug@2.6.0"
      }
    },
    "npm:babel-messages@6.22.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.22.0"
      }
    },
    "npm:babel-code-frame@6.22.0": {
      "map": {
        "esutils": "npm:esutils@2.0.2",
        "js-tokens": "npm:js-tokens@3.0.0",
        "chalk": "npm:chalk@1.1.3"
      }
    },
    "npm:babel-types@6.22.0": {
      "map": {
        "esutils": "npm:esutils@2.0.2",
        "babel-runtime": "npm:babel-runtime@6.22.0",
        "lodash": "npm:lodash@4.17.4",
        "to-fast-properties": "npm:to-fast-properties@1.0.2"
      }
    },
    "npm:minimatch@3.0.3": {
      "map": {
        "brace-expansion": "npm:brace-expansion@1.1.6"
      }
    },
    "npm:home-or-tmp@2.0.0": {
      "map": {
        "os-tmpdir": "npm:os-tmpdir@1.0.2",
        "os-homedir": "npm:os-homedir@1.0.2"
      }
    },
    "npm:chalk@1.1.3": {
      "map": {
        "ansi-styles": "npm:ansi-styles@2.2.1",
        "strip-ansi": "npm:strip-ansi@3.0.1",
        "escape-string-regexp": "npm:escape-string-regexp@1.0.5",
        "has-ansi": "npm:has-ansi@2.0.0",
        "supports-color": "npm:supports-color@2.0.0"
      }
    },
    "npm:babel-runtime@6.22.0": {
      "map": {
        "core-js": "npm:core-js@2.4.1",
        "regenerator-runtime": "npm:regenerator-runtime@0.10.1"
      }
    },
    "npm:brace-expansion@1.1.6": {
      "map": {
        "balanced-match": "npm:balanced-match@0.4.2",
        "concat-map": "npm:concat-map@0.0.1"
      }
    },
    "npm:detect-indent@4.0.0": {
      "map": {
        "repeating": "npm:repeating@2.0.1"
      }
    },
    "npm:invariant@2.2.2": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1"
      }
    },
    "npm:source-map-support@0.4.11": {
      "map": {
        "source-map": "npm:source-map@0.5.6"
      }
    },
    "npm:loose-envify@1.3.1": {
      "map": {
        "js-tokens": "npm:js-tokens@3.0.0"
      }
    },
    "npm:strip-ansi@3.0.1": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.1.1"
      }
    },
    "npm:has-ansi@2.0.0": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.1.1"
      }
    },
    "npm:debug@2.6.0": {
      "map": {
        "ms": "npm:ms@0.7.2"
      }
    },
    "npm:repeating@2.0.1": {
      "map": {
        "is-finite": "npm:is-finite@1.0.2"
      }
    },
    "npm:mkdirp@0.5.1": {
      "map": {
        "minimist": "npm:minimist@0.0.8"
      }
    },
    "npm:is-finite@1.0.2": {
      "map": {
        "number-is-nan": "npm:number-is-nan@1.0.1"
      }
    },
    "npm:jspm-nodelibs-os@0.2.0": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.1"
      }
    },
    "npm:jspm-nodelibs-stream@0.2.0": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "npm:jspm-nodelibs-buffer@0.2.1": {
      "map": {
        "buffer": "npm:buffer@4.9.1"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@2.2.2"
      }
    },
    "npm:buffer@4.9.1": {
      "map": {
        "ieee754": "npm:ieee754@1.1.8",
        "isarray": "npm:isarray@1.0.0",
        "base64-js": "npm:base64-js@1.2.0"
      }
    },
    "npm:readable-stream@2.2.2": {
      "map": {
        "isarray": "npm:isarray@1.0.0",
        "inherits": "npm:inherits@2.0.3",
        "buffer-shims": "npm:buffer-shims@1.0.0",
        "core-util-is": "npm:core-util-is@1.0.2",
        "string_decoder": "npm:string_decoder@0.10.31",
        "process-nextick-args": "npm:process-nextick-args@1.0.7",
        "util-deprecate": "npm:util-deprecate@1.0.2"
      }
    },
    "npm:jspm-nodelibs-crypto@0.2.0": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.11.0"
      }
    },
    "npm:crypto-browserify@3.11.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "browserify-cipher": "npm:browserify-cipher@1.0.0",
        "create-ecdh": "npm:create-ecdh@4.0.0",
        "create-hmac": "npm:create-hmac@1.1.4",
        "browserify-sign": "npm:browserify-sign@4.0.0",
        "diffie-hellman": "npm:diffie-hellman@5.0.2",
        "create-hash": "npm:create-hash@1.1.2",
        "public-encrypt": "npm:public-encrypt@4.0.0",
        "pbkdf2": "npm:pbkdf2@3.0.9",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:diffie-hellman@5.0.2": {
      "map": {
        "randombytes": "npm:randombytes@2.0.3",
        "bn.js": "npm:bn.js@4.11.6",
        "miller-rabin": "npm:miller-rabin@4.0.0"
      }
    },
    "npm:browserify-sign@4.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "create-hmac": "npm:create-hmac@1.1.4",
        "inherits": "npm:inherits@2.0.3",
        "bn.js": "npm:bn.js@4.11.6",
        "elliptic": "npm:elliptic@6.3.2",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "parse-asn1": "npm:parse-asn1@5.0.0"
      }
    },
    "npm:create-hmac@1.1.4": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:create-hash@1.1.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "cipher-base": "npm:cipher-base@1.0.3",
        "sha.js": "npm:sha.js@2.4.8",
        "ripemd160": "npm:ripemd160@1.0.1"
      }
    },
    "npm:pbkdf2@3.0.9": {
      "map": {
        "create-hmac": "npm:create-hmac@1.1.4"
      }
    },
    "npm:public-encrypt@4.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "randombytes": "npm:randombytes@2.0.3",
        "bn.js": "npm:bn.js@4.11.6",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "parse-asn1": "npm:parse-asn1@5.0.0"
      }
    },
    "npm:browserify-cipher@1.0.0": {
      "map": {
        "browserify-des": "npm:browserify-des@1.0.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "browserify-aes": "npm:browserify-aes@1.0.6"
      }
    },
    "npm:create-ecdh@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "elliptic": "npm:elliptic@6.3.2"
      }
    },
    "npm:browserify-des@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "cipher-base": "npm:cipher-base@1.0.3",
        "des.js": "npm:des.js@1.0.0"
      }
    },
    "npm:evp_bytestokey@1.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2"
      }
    },
    "npm:elliptic@6.3.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "bn.js": "npm:bn.js@4.11.6",
        "hash.js": "npm:hash.js@1.0.3",
        "brorand": "npm:brorand@1.0.6"
      }
    },
    "npm:browserify-aes@1.0.6": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "cipher-base": "npm:cipher-base@1.0.3",
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "buffer-xor": "npm:buffer-xor@1.0.3"
      }
    },
    "npm:miller-rabin@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "brorand": "npm:brorand@1.0.6"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.6",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:parse-asn1@5.0.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "pbkdf2": "npm:pbkdf2@3.0.9",
        "asn1.js": "npm:asn1.js@4.9.1"
      }
    },
    "npm:cipher-base@1.0.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:sha.js@2.4.8": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:hash.js@1.0.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:asn1.js@4.9.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "bn.js": "npm:bn.js@4.11.6",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:jspm-nodelibs-string_decoder@0.2.0": {
      "map": {
        "string_decoder-browserify": "npm:string_decoder@0.10.31"
      }
    }
  }
});
