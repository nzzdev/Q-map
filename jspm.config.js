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
        "fs": "npm:jspm-nodelibs-fs@0.2.1",
        "module": "npm:jspm-nodelibs-module@0.2.1",
        "path": "npm:jspm-nodelibs-path@0.2.0",
        "process": "npm:jspm-nodelibs-process@0.2.1"
      }
    },
    "npm:clean-css@3.4.9": {
      "map": {
        "buffer": "npm:jspm-nodelibs-buffer@0.2.0",
        "commander": "npm:commander@2.8.1",
        "fs": "npm:jspm-nodelibs-fs@0.2.1",
        "http": "npm:jspm-nodelibs-http@0.2.0",
        "https": "npm:jspm-nodelibs-https@0.2.0",
        "os": "npm:jspm-nodelibs-os@0.2.2",
        "path": "npm:jspm-nodelibs-path@0.2.0",
        "process": "npm:jspm-nodelibs-process@0.2.1",
        "source-map": "npm:source-map@0.4.4",
        "url": "npm:jspm-nodelibs-url@0.2.0",
        "util": "npm:jspm-nodelibs-util@0.2.0"
      }
    },
    "npm:commander@2.8.1": {
      "map": {
        "child_process": "npm:jspm-nodelibs-child_process@0.2.0",
        "events": "npm:jspm-nodelibs-events@0.2.2",
        "fs": "npm:jspm-nodelibs-fs@0.2.1",
        "graceful-readlink": "npm:graceful-readlink@1.0.1",
        "path": "npm:jspm-nodelibs-path@0.2.0",
        "process": "npm:jspm-nodelibs-process@0.2.1"
      }
    },
    "npm:core-js@1.2.6": {
      "map": {
        "fs": "npm:jspm-nodelibs-fs@0.2.1",
        "path": "npm:jspm-nodelibs-path@0.2.0",
        "process": "npm:jspm-nodelibs-process@0.2.1",
        "systemjs-json": "github:systemjs/plugin-json@0.1.2"
      }
    },
    "npm:graceful-readlink@1.0.1": {
      "map": {
        "fs": "npm:jspm-nodelibs-fs@0.2.1"
      }
    },
    "npm:leaflet-label@0.2.1-0": {
      "map": {
        "fs": "npm:jspm-nodelibs-fs@0.2.1"
      }
    },
    "npm:source-map@0.4.4": {
      "map": {
        "amdefine": "npm:amdefine@1.0.0",
        "process": "npm:jspm-nodelibs-process@0.2.1"
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
    "leaflet-minimap": "npm:leaflet-minimap@3.6.1",
    "text": "github:systemjs/plugin-text@0.0.9",
    "leaflet": "npm:leaflet@1.2.0",
    "assert": "npm:jspm-nodelibs-assert@0.2.1",
    "babel": "npm:babel-core@6.26.3",
    "buffer": "npm:jspm-nodelibs-buffer@0.2.3",
    "child_process": "npm:jspm-nodelibs-child_process@0.2.1",
    "constants": "npm:jspm-nodelibs-constants@0.2.1",
    "crypto": "npm:jspm-nodelibs-crypto@0.2.1",
    "events": "npm:jspm-nodelibs-events@0.2.2",
    "fs": "npm:jspm-nodelibs-fs@0.2.1",
    "module": "npm:jspm-nodelibs-module@0.2.1",
    "os": "npm:jspm-nodelibs-os@0.2.2",
    "path": "npm:jspm-nodelibs-path@0.2.3",
    "process": "npm:jspm-nodelibs-process@0.2.1",
    "stream": "npm:jspm-nodelibs-stream@0.2.1",
    "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.2",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.20",
    "util": "npm:jspm-nodelibs-util@0.2.2",
    "vm": "npm:jspm-nodelibs-vm@0.2.1"
  },
  packages: {
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
    "npm:detect-indent@4.0.0": {
      "map": {
        "repeating": "npm:repeating@2.0.1"
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
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "randombytes": "npm:randombytes@2.1.0"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.4",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1"
      }
    },
    "npm:babel-core@6.26.3": {
      "map": {
        "path-is-absolute": "npm:path-is-absolute@1.0.1",
        "private": "npm:private@0.1.8",
        "json5": "npm:json5@0.5.1",
        "babel-messages": "npm:babel-messages@6.23.0",
        "babel-helpers": "npm:babel-helpers@6.24.1",
        "babel-code-frame": "npm:babel-code-frame@6.26.0",
        "babel-register": "npm:babel-register@6.26.0",
        "babel-template": "npm:babel-template@6.26.0",
        "convert-source-map": "npm:convert-source-map@1.6.0",
        "slash": "npm:slash@1.0.0",
        "babel-traverse": "npm:babel-traverse@6.26.0",
        "babel-generator": "npm:babel-generator@6.26.1",
        "babel-types": "npm:babel-types@6.26.0",
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "minimatch": "npm:minimatch@3.0.4",
        "babylon": "npm:babylon@6.18.0",
        "debug": "npm:debug@2.6.9",
        "lodash": "npm:lodash@4.17.15",
        "source-map": "npm:source-map@0.5.7"
      }
    },
    "npm:jspm-nodelibs-string_decoder@0.2.2": {
      "map": {
        "string_decoder": "npm:string_decoder@0.10.31"
      }
    },
    "npm:jspm-nodelibs-stream@0.2.1": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.2"
      }
    },
    "npm:jspm-nodelibs-crypto@0.2.1": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.12.0"
      }
    },
    "npm:babel-register@6.26.0": {
      "map": {
        "babel-core": "npm:babel-core@6.26.3",
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "home-or-tmp": "npm:home-or-tmp@2.0.0",
        "source-map-support": "npm:source-map-support@0.4.18",
        "mkdirp": "npm:mkdirp@0.5.1",
        "lodash": "npm:lodash@4.17.15",
        "core-js": "npm:core-js@2.6.9"
      }
    },
    "npm:babel-helpers@6.24.1": {
      "map": {
        "babel-template": "npm:babel-template@6.26.0",
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:babel-messages@6.23.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:babel-template@6.26.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-traverse": "npm:babel-traverse@6.26.0",
        "babel-types": "npm:babel-types@6.26.0",
        "babylon": "npm:babylon@6.18.0",
        "lodash": "npm:lodash@4.17.15"
      }
    },
    "npm:babel-traverse@6.26.0": {
      "map": {
        "babel-code-frame": "npm:babel-code-frame@6.26.0",
        "babel-messages": "npm:babel-messages@6.23.0",
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-types": "npm:babel-types@6.26.0",
        "invariant": "npm:invariant@2.2.4",
        "babylon": "npm:babylon@6.18.0",
        "debug": "npm:debug@2.6.9",
        "lodash": "npm:lodash@4.17.15",
        "globals": "npm:globals@9.18.0"
      }
    },
    "npm:stream-browserify@2.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.4",
        "readable-stream": "npm:readable-stream@2.3.6"
      }
    },
    "npm:babel-generator@6.26.1": {
      "map": {
        "babel-messages": "npm:babel-messages@6.23.0",
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-types": "npm:babel-types@6.26.0",
        "trim-right": "npm:trim-right@1.0.1",
        "jsesc": "npm:jsesc@1.3.0",
        "detect-indent": "npm:detect-indent@4.0.0",
        "lodash": "npm:lodash@4.17.15",
        "source-map": "npm:source-map@0.5.7"
      }
    },
    "npm:crypto-browserify@3.12.0": {
      "map": {
        "inherits": "npm:inherits@2.0.4",
        "randomfill": "npm:randomfill@1.0.4",
        "browserify-cipher": "npm:browserify-cipher@1.0.1",
        "create-hash": "npm:create-hash@1.2.0",
        "create-hmac": "npm:create-hmac@1.1.7",
        "public-encrypt": "npm:public-encrypt@4.0.3",
        "randombytes": "npm:randombytes@2.1.0",
        "create-ecdh": "npm:create-ecdh@4.0.3",
        "pbkdf2": "npm:pbkdf2@3.0.17",
        "browserify-sign": "npm:browserify-sign@4.0.4",
        "diffie-hellman": "npm:diffie-hellman@5.0.3"
      }
    },
    "npm:babel-types@6.26.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "esutils": "npm:esutils@2.0.2",
        "to-fast-properties": "npm:to-fast-properties@1.0.3",
        "lodash": "npm:lodash@4.17.15"
      }
    },
    "npm:babel-code-frame@6.26.0": {
      "map": {
        "esutils": "npm:esutils@2.0.2",
        "js-tokens": "npm:js-tokens@3.0.2",
        "chalk": "npm:chalk@1.1.3"
      }
    },
    "npm:convert-source-map@1.6.0": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:public-encrypt@4.0.3": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "randombytes": "npm:randombytes@2.1.0",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "parse-asn1": "npm:parse-asn1@5.1.4",
        "bn.js": "npm:bn.js@4.11.8"
      }
    },
    "npm:minimatch@3.0.4": {
      "map": {
        "brace-expansion": "npm:brace-expansion@1.1.11"
      }
    },
    "npm:babel-runtime@6.26.0": {
      "map": {
        "regenerator-runtime": "npm:regenerator-runtime@0.11.1",
        "core-js": "npm:core-js@2.6.9"
      }
    },
    "npm:randombytes@2.1.0": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:pbkdf2@3.0.17": {
      "map": {
        "create-hmac": "npm:create-hmac@1.1.7",
        "create-hash": "npm:create-hash@1.2.0",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "ripemd160": "npm:ripemd160@2.0.2",
        "sha.js": "npm:sha.js@2.4.11"
      }
    },
    "npm:randomfill@1.0.4": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "randombytes": "npm:randombytes@2.1.0"
      }
    },
    "npm:create-hash@1.2.0": {
      "map": {
        "inherits": "npm:inherits@2.0.4",
        "ripemd160": "npm:ripemd160@2.0.2",
        "cipher-base": "npm:cipher-base@1.0.4",
        "sha.js": "npm:sha.js@2.4.11",
        "md5.js": "npm:md5.js@1.3.5"
      }
    },
    "npm:create-hmac@1.1.7": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "inherits": "npm:inherits@2.0.4",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "ripemd160": "npm:ripemd160@2.0.2",
        "cipher-base": "npm:cipher-base@1.0.4",
        "sha.js": "npm:sha.js@2.4.11"
      }
    },
    "npm:browserify-sign@4.0.4": {
      "map": {
        "create-hmac": "npm:create-hmac@1.1.7",
        "create-hash": "npm:create-hash@1.2.0",
        "inherits": "npm:inherits@2.0.4",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "parse-asn1": "npm:parse-asn1@5.1.4",
        "bn.js": "npm:bn.js@4.11.8",
        "elliptic": "npm:elliptic@6.5.0"
      }
    },
    "npm:diffie-hellman@5.0.3": {
      "map": {
        "randombytes": "npm:randombytes@2.1.0",
        "miller-rabin": "npm:miller-rabin@4.0.1",
        "bn.js": "npm:bn.js@4.11.8"
      }
    },
    "npm:browserify-cipher@1.0.1": {
      "map": {
        "browserify-des": "npm:browserify-des@1.0.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "browserify-aes": "npm:browserify-aes@1.2.0"
      }
    },
    "npm:parse-asn1@5.1.4": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "pbkdf2": "npm:pbkdf2@3.0.17",
        "browserify-aes": "npm:browserify-aes@1.2.0",
        "asn1.js": "npm:asn1.js@4.10.1"
      }
    },
    "npm:browserify-des@1.0.2": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.4",
        "inherits": "npm:inherits@2.0.4",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "des.js": "npm:des.js@1.0.0"
      }
    },
    "npm:ripemd160@2.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.4",
        "hash-base": "npm:hash-base@3.0.4"
      }
    },
    "npm:brace-expansion@1.1.11": {
      "map": {
        "concat-map": "npm:concat-map@0.0.1",
        "balanced-match": "npm:balanced-match@1.0.0"
      }
    },
    "npm:evp_bytestokey@1.0.3": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "md5.js": "npm:md5.js@1.3.5"
      }
    },
    "npm:cipher-base@1.0.4": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "inherits": "npm:inherits@2.0.4"
      }
    },
    "npm:invariant@2.2.4": {
      "map": {
        "loose-envify": "npm:loose-envify@1.4.0"
      }
    },
    "npm:sha.js@2.4.11": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "inherits": "npm:inherits@2.0.4"
      }
    },
    "npm:browserify-aes@1.2.0": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "cipher-base": "npm:cipher-base@1.0.4",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "inherits": "npm:inherits@2.0.4",
        "buffer-xor": "npm:buffer-xor@1.0.3"
      }
    },
    "npm:md5.js@1.3.5": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "inherits": "npm:inherits@2.0.4",
        "hash-base": "npm:hash-base@3.0.4"
      }
    },
    "npm:loose-envify@1.4.0": {
      "map": {
        "js-tokens": "npm:js-tokens@4.0.0"
      }
    },
    "npm:source-map-support@0.4.18": {
      "map": {
        "source-map": "npm:source-map@0.5.7"
      }
    },
    "npm:create-ecdh@4.0.3": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "elliptic": "npm:elliptic@6.5.0"
      }
    },
    "npm:miller-rabin@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "brorand": "npm:brorand@1.1.0"
      }
    },
    "npm:debug@2.6.9": {
      "map": {
        "ms": "npm:ms@2.0.0"
      }
    },
    "npm:readable-stream@2.3.6": {
      "map": {
        "string_decoder": "npm:string_decoder@1.1.1",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "inherits": "npm:inherits@2.0.4",
        "core-util-is": "npm:core-util-is@1.0.2",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "process-nextick-args": "npm:process-nextick-args@2.0.1",
        "isarray": "npm:isarray@1.0.0"
      }
    },
    "npm:hash-base@3.0.4": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "inherits": "npm:inherits@2.0.4"
      }
    },
    "npm:jspm-nodelibs-buffer@0.2.3": {
      "map": {
        "buffer": "npm:buffer@5.2.1"
      }
    },
    "npm:elliptic@6.5.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "inherits": "npm:inherits@2.0.4",
        "brorand": "npm:brorand@1.1.0",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1",
        "hmac-drbg": "npm:hmac-drbg@1.0.1",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1",
        "hash.js": "npm:hash.js@1.1.7"
      }
    },
    "npm:jspm-nodelibs-os@0.2.2": {
      "map": {
        "os-browserify": "npm:os-browserify@0.3.0"
      }
    },
    "npm:string_decoder@1.1.1": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:asn1.js@4.10.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "inherits": "npm:inherits@2.0.4",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1"
      }
    },
    "npm:buffer@5.2.1": {
      "map": {
        "ieee754": "npm:ieee754@1.1.13",
        "base64-js": "npm:base64-js@1.3.0"
      }
    },
    "npm:hash.js@1.1.7": {
      "map": {
        "inherits": "npm:inherits@2.0.4",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1"
      }
    },
    "npm:hmac-drbg@1.0.1": {
      "map": {
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1",
        "hash.js": "npm:hash.js@1.1.7",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1"
      }
    }
  }
});
