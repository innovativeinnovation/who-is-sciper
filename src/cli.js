#!/usr/bin/env node

/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
 * See the LICENSE file for more details.
 */

'use strict';

var epflPeopleApi = require('epfl-people-api');
var yargs         = require('yargs')

  // Sciper
  .command('sciper', '6-digit unique EPFL identification number.')
  .required(1, 'sciper is required')

  // Version
  .alias('v', 'version')
  .version(function() {
    return require('../package').version;
  })
  .describe('v', 'Show version information')

  // Help
  .help('h')
  .alias('h', 'help')
  .usage('Usage: $0 <sciper>')
  .epilog('Copyright 2017 ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, ' +
    'Switzerland, VPSI.');

var argv = yargs.argv;
var sciper  = argv._[ 0 ];

var displayPerson = function(person) {
  var infos = '';
  infos += person.firstname + ' ' + person.name;
  infos += '\n' + person.email;
  infos += '\n' + person.unit;
  console.log(infos);
};

epflPeopleApi.findBySciper(sciper, 'en').then(function(person) {
  displayPerson(person);
});
