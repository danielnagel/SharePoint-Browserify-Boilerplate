const Mocha = require("mocha")
import { readdirSync } from 'fs';
import { join } from 'path';
import {getSharePointData} from './sharePointData';

var mocha = new Mocha()

readdirSync('test').filter(function(file){
    return file.includes('TestAsync');
}).forEach(function(file){
    // Mocha will run Tests with *TestAsync* in there name.
    mocha.addFile(
        join('test', file)
    )
})

// Load SharePoint data ...
getSharePointData("Example List").then(function () {

  // ... run tests on SharePoint data.
  mocha.run(function(failures){
    process.on('exit', function () {
      process.exit(failures)
    })
  })
}).catch((error) => {
  console.error(`Beim holen der SharePoint Daten ist ein Fehler aufgetreten:\n${error}`);
})