# SharePoint Browserify Boilerplate

A boilerplate for deploying a web app to on premise SharePoint.

This boilerplate integrates into SharePoint.
You can create a SPA out of TypeScript sources that can be run by SharePoint and interpreted by browsers back to IE 11.
This project aims to ease the developing experience of SharePoint Web Applications.

## Used Modules

This project was written in typescript and enhanced with the following modules to get started building a full-page SharePoint app as quickly as possible.

### Frameworks

* [TypeScript](https://www.typescriptlang.org/) - Static type checking.
* [lodash](https://lodash.com/) - A modern JavaScript utility library.
* [date-fns](https://github.com/date-fns/date-fns) - Parse, validate and manipulate dates and times in JavaScript.

### SharePoint

* [sp-request](https://github.com/s-KaiNet/sp-request) - Used to run tests with live data from SharePoint.
* [sprestlib](https://github.com/gitbrent/SpRestLib) - Wrapper around the SharePoint REST API, used to load data in production.
* [gulp-spsave](https://github.com/s-KaiNet/gulp-spsave) - For saving files in SharePoint using gulp.

### Unit Testing

* [mocha](https://github.com/mochajs/mocha) - JavaScript test framework.
* [chai](https://github.com/chaijs/chai) - Assertion Library.

## Getting Started

#### Prerequisites

To start developing with sharepoint-react-app-boilerplate you'll need a few things:

Install [node.js](https://nodejs.org/) and [git](https://git-scm.com/).

You need to write your user credentials and the SharePoint URL of the Site where you want to deploy the script into the file `config/sharepoint.ts`.

### Available Scripts

In the project directory, you can run the following scripts.

#### Deploying

```
npm run deploy
```

This script uses `gulp-spsave` to deploy the application to the SharePoint site which is stated in `config/sharepoint.ts`.

#### Testing

```
npm test
```

Tests several aspects of the application.