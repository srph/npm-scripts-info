var pkg = require('./pkg');
var defaults = require('./default-info');
var unquote = require('unquote');

function info(pkgJSON) {
  pkgJSON = pkgJSON || pkg();
  var scriptsInfo = getScriptsInfo(pkgJSON);

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

function getScriptsInfo(pkgJSON) {
  if ('scripts-info' in pkgJSON) {
    return pkgJSON['scripts-info'];
  }

  var scriptsInfo = {};
  Object.keys(pkgJSON.scripts || {})
    .filter(isDescription)
    .forEach(function(scriptName) {
      scriptsInfo[scriptName.substr(1)] = getDescription(pkgJSON.scripts[scriptName]);
    });

  return scriptsInfo;
}

function isDescription(scriptName) {
  return scriptName[0] === '?';
}

function getDescription(description) {
  if (description.indexOf('echo ') !== 0) {
    return description;
  }

  var woEchoDescription = description.replace(/^echo\s+/, '');

  return unquote(woEchoDescription);
}

module.exports = info;
