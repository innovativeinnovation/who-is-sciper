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

  // Language
  .option('l', {
    alias: 'language',
    describe: 'Informations in "en" or "fr"',
    requiresArg: true,
    type: 'string',
  })

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
var locale  = 'en';

var aggregateInfos = function(person) {
  var infos = '';
  infos += 'Name:     ' + person.firstname + ' ' + person.name + '\n';
  if (person.email) {
    infos += 'Email:    ' + person.email + '\n';
  }
  for (var i = 0; i < person.accreds.length; i++) {
    infos += '\n' + 'Position: ' + person.accreds[i].position + '\n';
    infos += 'In unit:  ' + person.accreds[i].acronym + '\n';
    if (person.accreds[i].address) {
      var addressPart = person.accreds[i].address.split('$');
      infos += 'Address:  ';
      for (var j = 0; j < addressPart.length; j++) {
        if (j !== 0) {
          infos += '         ';
        }
        infos += addressPart[j] + '\n';
      }
    }
    if (person.accreds[i].office) {
      infos += 'Office:   ' + person.accreds[i].office + '\n';
    }
    if (person.accreds[i].phones) {
      infos += 'Phone:    ' + person.accreds[i].phones + '\n';
    }
  }
  return infos;
};

var put = function(firstname, sciper, infos) {
  infos += '\n' + 'See https://people.epfl.ch/cgi-bin/people?id=' + sciper;
  var gender = detectGender.detect(firstname);
  if (gender === 'female') {
    try {
      console.log(chalk.hex('#FD4286')(infos));
    } catch (err) {
      console.log(infos);
    }
  } else if (gender === 'male') {
    try {
      console.log(chalk.hex('#0484FF')(infos));
    } catch (err) {
      console.log(infos);
    }
  } else {
    console.log(infos);
  }
};

var displayFull = function(person) {
  put(
    person.firstname,
    person.sciper,
    aggregateInfos(person)
  );
};

if (argv.l && argv.l === 'fr') {
  locale = 'fr';
}

epflPeopleApi.findBySciper(sciper, locale).then(function(person) {
  displayFull(person);
}).catch(function(err) {
  console.log(err.message);
});
