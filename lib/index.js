var getPkg = require('./get-pkg');
var PROP = 'scripts-info';

function info() {
  var pkg = JSON.parse(getPkg());

  if ( !pkg[PROP] ) {
    throw new Error('Oops, but no `' + PROP + '` property was found in your `package.json`');
  }

  return pkg[PROP];
}

module.exports = info;