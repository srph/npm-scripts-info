var fs = require('fs');
var path = require('path');

function pkg() {
  var file = path.join(process.cwd(), 'package.json');

  if ( !fs.existsSync(file) ) {
    throw new Error('`package.json` was not found in the current working directory.');
  }

  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

module.exports = pkg;