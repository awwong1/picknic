# Picknic

![Picknic Screenshot](/Picknic.png "Picknic Screenshot")

HackED Hackathon 2016 Submission.

Locally sourced data and free range programmers provide high quality cruelty free picnic recommendations.

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.0.0.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and NPM](nodejs.org) >= v0.12.0
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`
- [Pip](https://pip.pypa.io/en/stable/installing/) - package installer for Python (will need to manually install for windows)
- [pymongo](https://docs.mongodb.org/getting-started/python/client/)

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Python Dependancies
1. Install pip if you do not have it by following the link. Note for windows config

2. Run `pip install pymongo` to install pymongo

## Filling your MongolDB with Data

1. cd to <Project Path>/scripts/data and run `python <script>`

2. Use `python parklands.py` and `python trees.py` to start


## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.


## Bugs

* To enable the polygon drawing, must modify the angular-google-maps.js bower component in client
```
nano client/bower_components/angular-google-maps/dist/angular-google-maps.js
# go to line 1300
# Change:
#              }, trackMaxVertices);
# To:
#              }.bind(this), trackMaxVertices);
```
