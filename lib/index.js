var getPkg = require('./get-pkg');

function info() {
  var pkg = JSON.parse(getPkg());
  var scripts = pkg['scripts-info'];

  if ( !scripts ) {
    throw new Error('Oops, but no `scripts-info` property was found in your `package.json`');
  }

  return scripts;
}

module.exports = info;