#!/usr/bin/env node

/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
 * See the LICENSE file for more details.
 */

'use strict';

var epflPeopleApi = require('epfl-people-api');
var detectGender  = require('gender-detection');
var chalk         = require('chalk');
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
  infos += 'Name:     ' + person.firstname + ' ' + person.name + '\n';
  infos += 'Email:    ' + person.email + '\n';
  if (person.office) {
    infos += 'Office:   ' + person.office + '\n';
  }
  if (person.phones) {
    infos += 'Phone:    ' + person.phones + '\n';
  }
  infos += 'Unit:     ' + person.unit + '\n';
  infos += 'Position: ' + person.position + '\n\n';
  infos += 'See https://people.epfl.ch/cgi-bin/people?id=' + sciper;

  var gender = detectGender.detect(person.firstname);
  if (gender === 'female') {
    console.log(chalk.hex('#FF69B4')(infos));
  } else if (gender === 'male') {
    console.log(chalk.blue(infos));
  } else {
    console.log(infos);
  }
};

epflPeopleApi.findBySciper(sciper, 'en').then(function(person) {
  displayPerson(person);
}).catch(function(err) {
  console.log(err);
});
