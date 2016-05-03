'use strict';
var getScriptsInfo = require('.');
var readPkgUp = require('read-pkg-up');

readPkgUp()
  .then(function(result) {
     var scriptsInfo = getScriptsInfo(result.pkg);
     console.log(scriptsInfo);
  });
