const fs = require('fs');
const crypto = require('crypto');
const Builder = require('systemjs-builder');

const builder = new Builder('', 'jspm.config.js');

builder.config({
  map: {
    'systemjs-babel-build': 'jspm_packages/npm/systemjs-plugin-babel@0.0.20/systemjs-babel-node.js'
  }
});

let hashMap = {};

return builder
  .bundle('q-map/map.js', { normalize: true, runtime: false, minify: false })
  .then(bundle => {
    const hash = crypto.createHash('md5');
    hash.update(bundle.source);
    const hashString = hash.digest('hex');
    const fileName = 'slippy-map.js';
    const hashedFileName = `slippy-map.${hashString.substring(0, 8)}.js`;
    fs.writeFileSync(`scripts/${fileName}`, bundle.source);
    hashMap[fileName] = hashedFileName;
  })
  .then(() => {
    fs.writeFileSync('scripts/hashMap.json', JSON.stringify(hashMap));
  })
  .then(() => {
    /* eslint-disable */
    console.log('Build complete');
    /* eslint-enable */
    process.exit(0);
  })
  .catch((err) => {
    /* eslint-disable */
    console.log('Build error', err);
    /* eslint-enable */
    process.exit(1);
  });

