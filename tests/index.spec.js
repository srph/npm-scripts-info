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

  it('should throw exception if there is no scripts property in `package.json`', function() {
    pkgJSON = {};

    expect(function() {
      info();
    }).to.throw(Error, "Your `package.json` doesn't have npm scripts");
  });

  it('should throw exception if there are no scripts in the scripts property', function() {
    pkgJSON = {
      scripts: {},
    };

    expect(function() {
      info();
    }).to.throw(Error, "Your `package.json` doesn't have npm scripts");
  });

  it('should throw exception if no description found', function() {
    pkgJSON = {
      scripts: {
        'not documented script': '',
      },
    };

    expect(function() {
      info();
    }).to.throw(Error, "Oops, there's no info about your scripts. Consider fleshing out the `scripts-info` property in your `package.json`");
  });

  it('should extract `scripts-info` from package.json', function() {
    var dummy = {
      foo: 'bar',
    };

    pkgJSON = {
      scripts: {
        'not documented script': '',
      },
      'scripts-info': dummy,
    };

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

  it('should get script info from scripts property', function() {
    pkgJSON = {
      scripts: {
        '?start': 'Custom start description',
        start: 'node index',
      },
    };

    expect(info()).to.eql({
      start: 'Custom start description',
    });
  });

  it('should remove `echo` from script description', function() {
    pkgJSON = {
      scripts: {
        '?start': 'echo Custom start description',
        start: 'node index',
      },
    };

    expect(info()).to.eql({
      start: 'Custom start description',
    });
  });

  it('should remove `echo` and double quotes from script description', function() {
    pkgJSON = {
      scripts: {
        '?start': 'echo "Custom start description"',
        start: 'node index',
      },
    };

    expect(info()).to.eql({
      start: 'Custom start description',
    });
  });

  it('should remove `echo` and single quotes from script description', function() {
    pkgJSON = {
      scripts: {
        '?start': "echo 'Custom start description'",
        start: 'node index',
      },
    };

    expect(info()).to.eql({
      start: 'Custom start description',
    });
  });

  it('should remove known `echo` flags from script description', function() {
    pkgJSON = {
      scripts: {
        '?start1': "echo -e Custom start description",
        start1: 'node index',
        '?start2': "echo -n Custom start description",
        start2: 'node index',
        '?start3': "echo -e -n Custom start description",
        start3: 'node index',
        '?start4': "echo -en Custom start description",
        start4: 'node index',
        '?start5': "echo -en -x Custom start description",
        start5: 'node index',
        '?start6': "echo -enCustom start description",
        start6: 'node index',
      },
    };

    expect(info()).to.eql({
      start1: 'Custom start description',
      start2: 'Custom start description',
      start3: 'Custom start description',
      start4: 'Custom start description',
      start5: '-x Custom start description',
      start6: '-enCustom start description',
    });
  });

  it('should use the passed in package.json instead of the one in the cwd', function() {
    pkgJSON = {
      scripts: {
        '?start': "echo 'Custom start description'",
        start: 'node index',
      },
    };

    expect(info({
      scripts: {
        '?test': 'Run the tests',
        'test': 'mocha',
      }
    })).to.eql({
      test: 'Run the tests',
    });
  });
});
