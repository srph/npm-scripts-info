## npm-scripts-info [![npm version](http://img.shields.io/npm/v/npm-scripts-info.svg?style=flat-square)](https://npmjs.org/package/npm-scripts-info?style=flat-square) [![Build Status](https://img.shields.io/travis/srph/npm-scripts-info.svg?style=flat-square)](https://travis-ci.org/srph/npm-scripts-info?branch=master)
Display the description of your npm scripts.

## Installation
```bash
npm i -S npm-scripts-info
```

## Usage
Add `scripts-info` to your `package.json`. Afterwards, `npm-scripts-info` through your scripts.
```js
{
  "name": "my-project",
  "scripts": {
  	"info": "npm-scripts-info"
  },
  "scripts-info": {
  	"info": "Displays information about the scripts.",
  	"watch:build": "Compiles the scripts and watches for changes.",
  	"start": "Kickstarts the application."
  }
}
```
Finally, run `npm run info`.

## Custom Reporters
You can customize the output by specifying a reporter.
```bash
npm-scripts-info -r=my-reporter
```
You can check the [default reporter](lib/reporter.js) to get the gist of how it works. It's very simple.

**Note**: If you're publishing your own reporter, please prefix it with `npm-scripts-info` (e.g., `npm-scripts-info-my-reporter`) for searchability.

## Preview
![preview](preview.png)
