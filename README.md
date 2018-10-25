# Bidirectional Translator JS
A lightweight and comfortable bidirectional Node (+v8) library for translating simple (key -> value) and (value -> key) pairs.

[![Build Status](https://travis-ci.org/fr33d4n/bidirectional-translator.js.svg?branch=master)](https://travis-ci.org/fr33d4n/bidirectional-translator.js)

## Installation
```sh
npm install bidirectional-translator-js --save
```

## Basic usage

### MapTranslator
```js
const { MapTranslator } = require('bidirectional-translator-js');

const map = {
  'Android 1.6': 'Donut',
  'Android 2.1': 'Eclair',
  'Android 2.2': 'Froyo',
  'Android 2.3': 'Gingerbread',
};
const androidTranslator = MapTranslator.build({ map });
androidTranslator.translate('Android 2.1'); // Outputs Eclair
androidTranslator.translate('Froyo'); // Outputs Froyo
```

### BinaryTranslator
```js
const { BinaryTranslator } = require('bidirectional-translator-js');

const map = {
  fighter: 1,
  wizard: 2,
  rogue: 4,
  cleric: 8,
};
const roleTranslator = BinaryTranslator.build({ map });
roleTranslator.translate('fighter'); // Outputs 1
androidTranslator.translate(9); // Outputs ['fighter','cleric'] which, btw, its a paladin
androidTranslator.translate(['rogue','fighter','wizard']); // Outputs 7
```






