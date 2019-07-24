import {
    expect
} from 'chai';
import 'mocha';
import {
    isGermanDate
} from '../src/ts/lib/utils';
const sharePointData = require('./sharePointData').data;

describe("Example List", () => {

        it(`The title Element of Example List should contain data in DIN5008 date format.`, () => {
            for(let i = 0; i < sharePointData.length; i++) {
                expect(isGermanDate(sharePointData[i].title)).to.be.true;
            }
        });
})