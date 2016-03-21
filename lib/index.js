var pkg = require('./pkg');
var defaults = require('./default-info');

function info() {
  var pkgJSON = pkg();
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
    .filter(scriptIsDescription)
    .forEach(function(scriptName) {
      scriptsInfo[scriptName.substr(1)] = getScriptDecription(pkgJSON.scripts[scriptName]);
    });

  return scriptsInfo;
}

function scriptIsDescription(scriptName) {
  return scriptName[0] === '?';
}

function getScriptDecription(description) {
  if (description.indexOf('echo ') !== 0) {
    return description;
  }

  var woEchoDescription = description.replace('echo ', '');

  return removeQuotes('"', removeQuotes("'", woEchoDescription));
}

function removeQuotes(quoteChar, text) {
  if (text[0] === quoteChar && text[text.length - 1] === quoteChar) {
    return text.substr(1, text.length - 2);
  }
  return text;
}

module.exports = info;
