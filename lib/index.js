var pkg = require('./pkg');

function info() {
  var scripts = pkg()['scripts-info'];

  if ( !scripts ) {
    throw new Error('Oops, but no `scripts-info` property was found in your `package.json`');
  }

  return scripts;
}

module.exports = info;