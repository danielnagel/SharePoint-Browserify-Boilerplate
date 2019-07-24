# SharePoint Browserify Boilerplate

A boilerplate for deploying a web app to on premise SharePoint.

This boilerplate integrates into SharePoint.
You can create a SPA out of TypeScript sources that can be run by SharePoint and interpreted by browsers back to IE 11.
This project aims to ease the developing experience of SharePoint Web Applications.
This boilerplate also helps to tests applications which depend on data in SharePoint Lists to run properly.

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

In the next step you need to configure the configuration (`src/tsconfig/sharepoint.ts`) for your needs.

```typescript
export const sharepointConfig: ISharePointconfig = {
    "site": "",
    "username": "",
    "password": "",
    "projects": [
        {
            "src": "./src/ts/script1.ts",
            "subSite": "/testsite", 
            "folder": "/SiteAssets/scrip1"
        },
        {
            "src": "./src/ts/script2.ts",
            "subSite": "/testsite", 
            "folder": "/SiteAssets/scrip2"
        }
    ]
}
```

Then you can start implementing another project, e.g. script3.ts.

#### About the example Projects

`script1.ts` is a hello world application

### Available Scripts

In the project directory, you can run the following scripts.

#### Building

```
npm run build
# or
gulp --source <scriptname>
```

Compiles all sources and moves them into the folder `dist`.

#### Deploying

```
npm run deploy
# or
gulp deploy --source <scriptname>
```

This script uses `gulp-spsave` to deploy the application to the SharePoint site which is stated in `src/tsconfig/sharepoint.ts`.

#### Testing

```
npm test
```

* Tests if the data of the SharePoint List `Example List` are Numeric DIN 5008 (dd.mm.yyyy) Dates.
* Tests the Methods to determine wheter a string is in DIN 5008 date format.