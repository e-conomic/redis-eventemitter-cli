# Redis-eventemitter CLI

Command line tool for redis-eventemitter.

## Installation

You can install it with npm

```
npm install redis-eventemitter-cli -g
```

## Usage

```
  Usage: redis-eventemitter [command] [options]

  Commands:

  emit    Emits an event. Requires --channel and --message
  on      Listens for events. Requires --pattern

  Options:

    --channel -c A redis pubsub channel
    --message -m A string with a json encoded message to send to the redis pubsub
    --pattern A redis pattern. Used for listeninf to events (command "on")
    --host -h The host of the redis server (defaults to localhost)
    --port -p The port of the redis server (defaults to 6397)
    --password -a The password of the redis server

    You can also save a file to HOME/.redis-eventemitter-cli.json with the host, port and password like this

    {
        "host": "localhost",
        "port": "6379",
        "password": "mypassword"
    }
```
