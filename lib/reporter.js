var chalk = require('chalk');

function reporter(scripts) {
  for ( var script in scripts ) {
    var description = scripts[script];

    console.log(chalk.blue(script) + ':');
    console.log('  ' + chalk.green(description));
  }
}

module.exports = reporter;