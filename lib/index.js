var pkg = require('./pkg');
var defaults = require('./default-info');

function info() {
  var pkgJSON = pkg();
  var scriptsInfo = pkgJSON['scripts-info'] || {};

  if ( !pkgJSON.scripts || !Object.keys(pkgJSON.scripts).length ) {
    throw new Error("Your `package.json` doesn't have npm scripts");
  }

  Object.keys(pkgJSON.scripts)
    .filter(function(scriptName) {
      return !(scriptName in scriptsInfo);
    })
    .filter(function(scriptName) {
      return scriptName in defaults;
    })
    .map(function(scriptName) {
      scriptsInfo[scriptName] = defaults[scriptName];
    });

  if ( !Object.keys(scriptsInfo).length ) {
    throw new Error("Oops, there's no info about your scripts. Consider fleshing out the `scripts-info` property in your `package.json`");
  }

  return scriptsInfo;
}

module.exports = info;
