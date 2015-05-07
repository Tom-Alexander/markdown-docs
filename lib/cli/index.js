#!/usr/bin/env node

import minimist from 'minimist';
import commands from './commands';

var run = function () {
  var args = minimist(process.argv.slice(2));
  var command = args._[0];
  var destination = args.destination || './_site';
  var source = args.source || './docs';
  if (!commands[command]) commands._unknown();
  else commands[command](source, destination).catch(function (error) {
    throw new Error(error);
  });
};

run();
export default commands.build;
