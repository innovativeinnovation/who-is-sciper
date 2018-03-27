#!/usr/bin/env node

/*
 * (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
 * See the LICENSE file for more details.
 */

var epflPeopleApi = require('epfl-people-api');
var detectGender = require('gender-detection');
var chalk = require('chalk');
var yargs = require('yargs')

  // Sciper
  .command('sciper', '6-digit unique EPFL identification number.')
  .required(1, 'sciper is required')

  // Language
  .option('l', {
    alias: 'language',
    describe: 'Show informations in "en" or "fr"',
    requiresArg: true,
    type: 'string'
  })

  // Version
  .alias('v', 'version')

  // Help
  .help('h')
  .alias('h', 'help')
  .usage('Usage: $0 <sciper>')
  .example('$0 128871')
  .example('$0 275746 -l fr')
  .epilog('Copyright 2017 ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, ' +
    'Switzerland, VPSI.');

var argv = yargs.argv;
var sciper = argv._[ 0 ];
var locale = 'en';

var i18n = {
  en: {
    name: 'Name',
    email: 'Email',
    position: 'Position',
    unit: 'In unit',
    address: 'Address',
    office: 'Office',
    phone: 'Phone',
    see: 'See'
  },
  fr: {
    name: 'Nom',
    email: 'Email',
    position: 'Position',
    unit: 'Dans l\'unité',
    address: 'Adresse',
    office: 'Bureau',
    phone: 'Téléphone',
    see: 'Voir'
  }
};

var MAX_LINE_LENGTH = {en: 10, fr: 14};

var createText = function (key, maxLength) {
  var text = '';
  if (key) {
    text = i18n[locale][key] + ':';
  }
  for (var i = text.length; i < maxLength; i++) {
    text += ' ';
  }
  return text;
};

var aggregateInfos = function (person) {
  var infos = '';
  infos += createText('name', MAX_LINE_LENGTH[locale]) + person.firstname +
    ' ' + person.name + '\n';
  if (person.email) {
    infos += createText('email', MAX_LINE_LENGTH[locale]) + person.email +
      '\n';
  }
  for (var i = 0; i < person.accreds.length; i++) {
    infos += '\n' + createText('position', MAX_LINE_LENGTH[locale]) +
      person.accreds[i].position + '\n';
    infos += createText('unit', MAX_LINE_LENGTH[locale]) +
      person.accreds[i].acronym + '\n';
    if (person.accreds[i].address) {
      var addressPart = person.accreds[i].address.split('$');
      infos += createText('address', MAX_LINE_LENGTH[locale]);
      for (var j = 0; j < addressPart.length; j++) {
        if (j !== 0) {
          infos += createText(undefined, MAX_LINE_LENGTH[locale]);
        }
        infos += addressPart[j].trim() + '\n';
      }
    }
    if (person.accreds[i].office) {
      infos += createText('office', MAX_LINE_LENGTH[locale]) +
        person.accreds[i].office + '\n';
    }
    if (person.accreds[i].phones) {
      infos += createText('phone', MAX_LINE_LENGTH[locale]) +
        person.accreds[i].phones + '\n';
    }
  }
  return infos;
};

var put = function (firstname, sciper, infos) {
  infos += '\n' + i18n[locale].see +
    ' https://people.epfl.ch/' + sciper;
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

var displayFull = function (person) {
  put(
    person.firstname,
    person.sciper,
    aggregateInfos(person)
  );
};

if (argv.l && argv.l === 'fr') {
  locale = 'fr';
}

epflPeopleApi.findBySciper(sciper, locale).then(function (person) {
  displayFull(person);
}).catch(function (err) {
  console.log(err.message);
});
