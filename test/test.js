/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017-2018.
 * See the LICENSE file for more details.
 */

require('chai').should();
var version = require('../package').version;

describe('who-is-sciper cli', function () {
  this.timeout(15000);
  var cliOption = '-v';
  var response;

  beforeEach(function (done) {
    var execFile = require('child_process').execFile;
    execFile('./src/cli.js', [cliOption], function (error, stdout) {
      if (error) {
        throw error;
      }
      response = stdout;
      done();
    });
  });

  it('should match version with option -v', function () {
    response.should.equal(version + '\n');
    cliOption = '100000';
  });

  it('should return error with sciper 100000', function () {
    response.should.match(/Sciper does not exist/);
    cliOption = '69';
  });

  it('should return error with sciper 69', function () {
    response.should.match(/Expected a sciper/);
    cliOption = '128871';
  });

  it('should match person with sciper 128871', function () {
    response.should.match(/Duratti/);
    response.should.match(/Lindo/);
    response.should.match(/INN/);
  });
});
