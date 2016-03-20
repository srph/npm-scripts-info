var pkg = require('./pkg');
var defaultInfo = require('./default-info');

function info() {
  var pkgJSON = pkg();
  var scriptsInfo = pkgJSON['scripts-info'] || {};

  Object.keys(pkgJSON.scripts || {})
    .filter(function(scriptName) {
      return !(scriptName in scriptsInfo);
    })
    .filter(function(scriptName) {
      return scriptName in defaultInfo;
    })
    .map(function(scriptName) {
      scriptsInfo[scriptName] = defaultInfo[scriptName];
    });

  if ( !Object.keys(scriptsInfo).length ) {
    throw new Error("Oops, there's no info about your scripts. Consider fleshing out the `scripts-info` property in your `package.json`");
  }

  return scriptsInfo;
}

module.exports = info;
