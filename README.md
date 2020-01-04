<p align="center">
  <img alt="Who Is Sciper" src="https://raw.githubusercontent.com/innovativeinnovation/who-is-sciper/master/docs/readme/readme-logo.png">
</p>

<p align="center">
  Find out who a person is given a sciper.
</p>

<p align="center">
  <a href="https://travis-ci.org/innovativeinnovation/who-is-sciper">
    <img alt="Travis Status" src="https://travis-ci.org/innovativeinnovation/who-is-sciper.svg?branch=master">
  </a>
  <a href="https://david-dm.org/innovativeinnovation/who-is-sciper">
    <img alt="Dependencies Status" src="https://david-dm.org/innovativeinnovation/who-is-sciper/status.svg"/>
  </a>
  <a href="https://raw.githubusercontent.com/innovativeinnovation/who-is-sciper/master/LICENSE">
    <img alt="Apache License 2.0" src="https://img.shields.io/badge/license-Apache%202.0-blue.svg">
  </a>
  <a href='https://www.npmjs.com/package/who-is-sciper'>
    <img alt="NPM Version" src="https://img.shields.io/npm/v/who-is-sciper.svg" />
  </a>
</p>

---

Install
-------

Install this globally and you'll have access to the `who-is-sciper` command
anywhere on your system.

```bash
npm i who-is-sciper -g
```

Usage
-----

```console
who-is-sciper
Usage: who-is-sciper <sciper>

Commands:
  sciper  6-digit unique EPFL identification number.

Options:
  -l, --language  Show informations in "en" or "fr"       [string]
  -h, --help      Show help                               [boolean]
  -v, --version   Show version number                     [boolean]

Examples:
  who-is-sciper 128871
  who-is-sciper 278890 -l fr
```

Screenshot
----------

![command line screenshot](https://raw.githubusercontent.com/innovativeinnovation/who-is-sciper/master/docs/readme/screenshot.png)

See also
--------

  * [epfl-people-api](https://github.com/innovativeinnovation/epfl-people-api)

Contributing
------------

Contributions are always welcome.

See [Contributing](CONTRIBUTING.md).

Developer
---------

  * [William Belle](https://github.com/williambelle)

License
-------

Apache License 2.0

Original work (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017-2018.  
Modified work (c) William Belle, 2018-2020.

See the [LICENSE](LICENSE) file for more details.
