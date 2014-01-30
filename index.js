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
	console.log('  emit [channel] [message] [options]  Emits an event.');
	console.log('  on   [pattern] [options]            Listens for events.');
	console.log('');
	console.log('  Options:');
	console.log('');
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
	console.log('    }\n');
};

var configFile = path.join(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE, '.redis-eventemitter-cli.json');
var config;
try {
	config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
} catch(e) {
	config = {};
}

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
	var channel = argv._[1];
	var message = argv._[2];
	if (!message || !channel) {
		printUsage();
		process.exit(1);
	}
	pubsub.emit(channel, JSON.parse(message));
	pubsub.flush(function() {
		process.exit(0);
	});
} else if(command === 'on') {
	var pattern = argv._[1];
	if (!pattern) {
		printUsage();
		process.exit(1);
	}
	pubsub.on(pattern, function(c, m) {
		var str = JSON.stringify({channel: c, message: m}, null, '  ');
		console.log(str);
	});
}
