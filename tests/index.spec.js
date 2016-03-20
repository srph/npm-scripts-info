var expect = require('chai').expect;
var sinon = require('sinon');
var rewire = require('rewire');
var info = rewire('../lib');

describe('npm-script-info', function() {
  var revert;
  var pkgJSON;

  before(function() {
    revert = info.__set__('pkg', function() {
      return pkgJSON;
    });
  });

  after(function() {
    revert();
  });

  it('should throw exception if no description found', function() {
    pkgJSON = {};

    expect(function() {
      info();
    }).to.throw(Error, "Oops, there's no info about your scripts. Consider fleshing out the `scripts-info` property in your `package.json`");
  });

  it('should extract `scripts-info` from package.json', function() {
    var dummy = {
      foo: 'bar',
    };

    pkgJSON = { 'scripts-info': dummy };

    expect(info()).to.eql(dummy);
  });

  it('should add default script info if missing in `scripts-info`', function() {
    pkgJSON = {
      scripts: {
        info: 'npm-scripts-info',
        start: 'node index',
      },
    };

    expect(info()).to.eql({
      info: 'Display information about the scripts',
      start: 'Kickstart the application',
    });
  });

  it('should not override script info with default description', function() {
    pkgJSON = {
      scripts: {
        start: 'node index',
      },
      'scripts-info': {
        start: 'Custom start description'
      }
    };

    expect(info()).to.eql({
      start: 'Custom start description',
    });
  });
});
