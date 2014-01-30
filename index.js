#!/usr/bin/env node
var redisev = require('redis-eventemitter');
var path = require('path');
var fs = require('fs');
var argv = require('optimist').argv;

var printUsage = function() {
	console.log(argv.$0);
	console.log('');
	console.log('  Command line tool for redis-eventemitter.');
	console.log('');
	console.log('  Usage: '+ argv.$0 + ' [command] [options]');
	console.log('');
	console.log('  Commands:');
	console.log('');
	console.log('  emit    Emits an event. Requires --channel and --message');
	console.log('  on      Listens for events. Requires --pattern');
	console.log('');
	console.log('  Options:');
	console.log('');
	console.log('    --channel -c A redis pubsub channel');
	console.log('    --message -m A string with a json encoded message to send to the redis pubsub');
	console.log('    --pattern A redis pattern. Used for listeninf to events (command "on")');
	console.log('    --host -h The host of the redis server (defaults to localhost)');
	console.log('    --port -p The port of the redis server (defaults to 6397)');
	console.log('    --password -a The password of the redis server');
	console.log('');
	console.log('    You can also save a file to HOME/.redis-eventemitter-cli.json with the host, port and password like this');
	console.log('');
	console.log('    {');
	console.log('        "host": "localhost",');
	console.log('        "port": "6379",');
	console.log('        "password": "mypassword"');
	console.log('    }');
};

var configFile = path.join(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE, '.redis-eventemitter-cli.json');
var config;
try {
	config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
} catch(e) {
	config = {};
}

var message = argv.m || argv.message || config.message;
var channel = argv.c || argv.channel || config.channel;
var pattern = argv.pattern;
var host = argv.h || argv.host || config.host || 'localhost';
var port = argv.p || argv.port || config.port || 6379;
var password = argv.a || argv.password || config.password;
var command = argv._[0];

if (!host || !port || (command !== 'emit' && command !== 'on')) {
	printUsage();
	process.exit(1);
}

pubsub = redisev({
	port: port,
	host: host,
	auth_pass: password
});

if (command === 'emit') {
	if (!message || !channel) {
		printUsage();
		process.exit(1);
	}
	pubsub.emit(channel, JSON.parse(message));
	pubsub.flush(function() {
		process.exit(0);
	});
} else if(command === 'on') {
	if (!pattern) {
		printUsage();
		process.exit(1);
	}
	pubsub.on(pattern, function(c, m) {
		var str = JSON.stringify({channel: c, message: m}, null, '  ');
		console.log(str);
	});
}
