# Cargo Tracker

Track live location details and provide optimal route for transport of goods.

## Web

### Tech

* [node.js]
* [Express]
* [React]
* [Webpack]
* [Sequelize]
* [jQuery] 

### Usage

Cargo Tracker requires [Node.js](https://nodejs.org/) v6.11.5 LTS to run.

Install the dependencies and devDependencies and start the server.

Install [sequelize-cli] , the [Sequelize] Command Line Interface (CLI)
```sh
npm install -g sequelize-cli
```

For development environments...

```sh
$ npm install
$ bower install
$ npm run watch
```

For production environments...

```sh
$ npm install
$ bower install
$ npm run prod
```
If bower is not installed already, install it using
```sh
npm install -g bower
```
```
For migrating the tables...
```sh
$ sequelize db:migrate
```
When you install a new dependency always use ```--save``` 
```sh
$ npm install --save <package_name>
$ bower install --save <package_name>
```

## App

### Usage

After starting the server, build the app and run it.

*Happy coding*


   [node.js]: <http://nodejs.org>
   [React]: <http://reactjs.org/>
   [Webpack]: <http://webpack.js.org/>
   [jQuery]: <http://jquery.com>
   [express]: <http://expressjs.com>
   [sequelize-cli]: <http://www.npmjs.com/package/sequelize-cli>
   [Sequelize]: <https://sequelizejs.com>
