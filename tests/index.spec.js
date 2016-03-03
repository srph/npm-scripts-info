var expect = require('chai').expect;
var sinon = require('sinon');
var rewire = require('rewire');
var info = rewire('../lib');

describe('npm-script-info', function() {
  it('should extract `scripts-info` from package.json', function() {
    var dummy = {};

    var revert = info.__set__('pkg', function() {
      return { 'scripts-info': dummy };
    });

    expect(info()).to.eql(dummy);
    revert();
  });
});