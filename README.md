# Quiztool

To run in debug on dev with automatic re-transpile:

```npm start```

and

```npm run server```

in two different console windows.

On prod, just run ```npm start```.

If the app dies shortly thereafter, make sure mongodb is actually running:

```sudo [mongo_home]/bin/mongod --fork --logpath /var/log/mongodb.log```

(we need to put in some error-handling code)


---

To run:

```npm start```

and

```nodemon server.js```

from separate console/terminal windows. This will give  you auto-reload of both the front end/ts, and back end/js.


## Older startup that is still semi-working, but usually without auto-reload.

To run the server: `node server.js`

You can also now run 'npm run build' -- this will not, however, auto-refresh the app.

You can also separately run 'npm start' and blah to get auto-refresh.

To get a list of [objects] from the api, then head to:

http://localhost:3000/api/[objects]

If the API has a route set up for that, then you should get an array of JSON objects returned.

To connect to mongo from command line, set up your local mongo and give it some credentials, then log in like so:

```
mongo test -u 'duouser' -p 'duopass'
```

I have been often unable to log in from the mongo shell. It doesn't seem to matter what db i am 'using'. YMMV.

```
db.auth( <username>, <password> )
```


# Configuration

Create a file in the root directory called '.env'.
```
DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3
DB_NAME=<etc>
DB_PATH=<etc>
```


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-beta.32.3.

## Getting started

Clone this repo to your local dev machine/server (`cd [your_main_dev_directory]; git clone https://github.com/fourmajor/quiztool.git` --> this will create a directory `quiztool` in your main dev directory. cd into it.).

Install npm if you have not already ( https://nodejs.org/en/download/ ), then run `npm install` from the top-level directory (the one containing the package.json file). This will install all the dependencies of the project and you can proceed to cranking up your dev server (below).

You may also need to install the cli package globally for the 'ng' server (below) to show up.

`npm install -g @angular/cli@latest`

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
