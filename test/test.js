/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
 * See the LICENSE file for more details.
 */

'use strict';

var should  = require('chai').should();
var version = require('../package').version;

describe('who-is-sciper cli', function() {
  this.timeout(15000);
  var cliOption = '-v';
  var response;

  beforeEach(function(done) {
    var execFile = require('child_process').execFile;
    execFile('./src/cli.js', [cliOption], function(error, stdout) {
      if (error) {
        throw error;
      }
      response = stdout;
      done();
    });
  });

  it('should match version with option -v', function() {
    response.should.equal(version + '\n');
    cliOption = '128871';
  });

  it('should match "Duratti" with sciper 128871', function() {
    response.should.match(/Duratti/);
    cliOption = '--config=./test/testConfigGood.json';
  });

});
