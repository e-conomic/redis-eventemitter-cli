Archived
======
Tech Leads: Repository archived due to inactivity in more than 6 months.
Please remember to add a CODEOWNERS file to the root of the repository when unarchiving.

# Redis-eventemitter CLI

Command line tool for [redis-eventemitter](https://github.com/freeall/redis-eventemitter).

## Installation

You can install it with npm

```
npm install redis-eventemitter-cli -g
```

## Usage

```
Command line tool for redis-eventemitter.

  Usage: node ./index [command] [options]

  Commands:

  emit [channel] [message] [options]  Emits an event.
  on   [pattern] [options]            Listens for events.

  Options:

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
