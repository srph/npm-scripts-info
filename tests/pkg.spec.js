var expect = require('chai').expect;
var sinon = require('sinon');
var mock = require('mock-fs');
var fs = require('fs');
var getPkg = require('../lib/pkg');

describe('pkg', function() {
  it('should get the parsed package.json in the cwd', function() {
    var pkg = process.cwd() + '/package.json';
    var _fs = {};
    _fs[pkg] = '{"hello": "world"}';
    mock(_fs);

    expect(getPkg()).to.eql({"hello": "world"});
    mock.restore();
  });

  it('should throw if pkg file was not found', function() {
    sinon.stub(fs, 'existsSync').returns(false);

    expect(function() { getPkg(); }).to.throw(/`package.json` was not found in the current working directory./);

    fs.existsSync.restore();
  });
});