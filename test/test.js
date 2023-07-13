/*
 * Original work (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland,
 * VPSI, 2017-2018.
 * Modified work (c) William Belle, 2018-2023.
 * See the LICENSE file for more details.
 */

require('chai').should();
const version = require('../package').version;

describe('who-is-sciper cli', function () {
  this.timeout(15000);
  let cliOption = '-v';
  let response;

  beforeEach((done) => {
    const execFile = require('child_process').execFile;
    execFile('./src/cli.js', [cliOption], (error, stdout) => {
      if (error) {
        throw error;
      }
      response = stdout;
      done();
    });
  });

  it('should match version with option -v', () => {
    response.should.equal(version + '\n');
    cliOption = '100000';
  });

  it('should return error with sciper 100000', () => {
    response.should.match(/Sciper does not exist/);
    cliOption = '69';
  });

  it('should return error with sciper 69', () => {
    response.should.match(/Expected a sciper/);
    cliOption = '128871';
  });

  it('should match person with sciper 128871', () => {
    response.should.match(/Duratti/);
    response.should.match(/Lindo/);
    response.should.match(/INN 0/);
    response.should.match(/FSD/);
    response.should.match(/Development/);
  });
});
