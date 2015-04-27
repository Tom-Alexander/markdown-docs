require('babel/register');
var minimist = require('minimist');
var commands = require('./commands');

var run = function () {
  var args = minimist(process.argv.slice(2));
  var command = args._[0];
  var destination = args.destination || './_site';
  var source = args.source || './';

  if (!commands[command]) commands._unknown();
  else commands[command](source, destination);
};

run();
