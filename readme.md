## npm-scripts-info
Display the description of your npm scripts.

## Installation
```bash
npm i -S npm-scripts-info
```

## Usage
Add `scripts-info` to your `package.json`. Afterwards, `npm-scripts-info` through your scripts.
```js
{
  "name": "npm-scripts-info",
  "version": "1.0.0",
  "scripts": {
  	"info": "npm-scripts-info"
  },
  "scripts-info": {
  	"info": "Displays information about the scripts.",
  	"watch:build": "Compiles the scripts and watches for changes.",
  	"start": "Kickstarts the application."
  }
```
Finally, run `npm run info`.

## Output
```bash
info:
  Displays information about the scripts.
watch:build
  Compiles the scripts and watches for changes.
start
	Kickstarts the application.
```