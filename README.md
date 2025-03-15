# Project Name

## Dependencies

This project uses the following dependencies:

- **commander**: CLI utility for parsing arguments. Version: "^8.3.0"
- **js-yaml**: YAML parser and serializer. Version: `^4.1.0`
- **lodash**: Utility library for data manipulation (used for sorting keys). Version: `^4.17.21`

## Installation

Run the following to install dependencies:

npm install

How to Use gendiff
Step 1: Run gendiff with two JSON files

gendiff filepath1.json filepath2.json
Asciinema recording #1:
[Watch here](https://asciinema.org/a/hvdP3owhHgM7qBrhCb8t8iM5c)

Step 2: Run gendiff with two YML files

gendiff filepath1.yml filepath2.yml
Asciinema recording #2:
[Watch here](https://asciinema.org/a/Wgyj79nH1YMSVMYBdR2FNZeRK)

Step 3: Run gendiff with JSON & YML files

gendiff filepath1.json filepath2.json
gendiff filepath1.yml filepath2.yml
Asciinema recording #3:
[Watch here](https://asciinema.org/a/jbRf2w64tPBbUBsRQuQOuPf93)

Step 4: Run gendiff --format plain

gendiff --format plain filepath1.json filepath2.json
Asciinema recording #4:
[Watch here](https://asciinema.org/a/6nZwCt8OrYRMDrhot8gTpOxHf)

Step 5: Run gendiff --format json

gendiff --format json filepath1.json filepath2.json
Asciinema recording #5:
[Watch here](https://asciinema.org/a/xHjmPzxJLPaHBXt7sq99GzyOZ)

### Hexlet tests and linter status:

[![Actions Status](https://github.com/user15213/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/user15213/frontend-project-46/actions)

![Test Coverage](https://codeclimate.com/github/user15213/frontend-project-46/coverage/badge.svg)

![Code Climate Coverage](https://img.shields.io/codeclimate/coverage/user15213/frontend-project-46)
