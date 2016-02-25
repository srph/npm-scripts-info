#!/usr/bin/env node
var info = require('./');
var meow = require('meow');

var cli = meow([
  'Usage',
  '  npm-scripts-info [hr]',
  '',
  'Options',
  ' --help, -h         Display usage',
  ' --version, -v      Display version',
  ' --reporter, -r     Specify the custom reporter to be used',
  '',
  'Examples',
  '  npm-scripts-info -r=my-reporter'
].join('\n'), {
  string: ['reporter'],
  alias: {
    help: 'h',
    version: 'v',
    reporter: 'r'
  }
});

var scripts = info();

cli.flags.reporter
  ? require('npm-scripts-info-' + cli.flags.reporter)(scripts)
  : require('../lib/reporter')(scripts);