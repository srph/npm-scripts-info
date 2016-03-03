var fs = require('fs');
var path = require('path');

function getPkg() {
  var pkg = path.join(process.cwd(), 'package.json');

  if ( !fs.existsSync(pkg) ) {
    throw new Error('`package.json` was not found in the current working directory.');
  }

  return JSON.parse(fs.readFileSync(pkg, 'utf8'));
}

module.exports = getPkg;