import {isGermanDate, parseGermanDate} from '../src/ts/lib/utils';
import {
    expect
} from 'chai';
import 'mocha';


describe('isGermanDate', () => {


    it('null', () => {
        const result: boolean = isGermanDate(null);
        expect(result).to.be.false;
    });


    it('""', () => {
        const result: boolean = isGermanDate("");
        expect(result).to.be.false;
    });


    it('22.09.2019', () => {
        const result: boolean = isGermanDate("22.09.2019");
        expect(result).to.be.true;
    });


    it('22.2.19', () => {
        const result: boolean = isGermanDate("22.2.19");
        expect(result).to.be.true;
    });


    it('1.1.1', () => {
        const result: boolean = isGermanDate("1.1.1");
        expect(result).to.be.false;
    });


    it('22-02-2019', () => {
        const result: boolean = isGermanDate("22-02-2019");
        expect(result).to.be.false;
    });


    it('22-02-19', () => {
        const result: boolean = isGermanDate("22-02-19");
        expect(result).to.be.false;
    });


    it('22/02/2019', () => {
        const result: boolean = isGermanDate("22/02/2019");
        expect(result).to.be.false;
    });


    it('22/02/19', () => {
        const result: boolean = isGermanDate("22/02/19");
        expect(result).to.be.false;
    });


    it('2019.02.22', () => {
        const result: boolean = isGermanDate("2019.02.22");
        expect(result).to.be.false;
    });


    it('32.12.2019', () => {
        const result: boolean = isGermanDate("32.12.2019");
        expect(result).to.be.false;
    });


    it('1.13.2019', () => {
        const result: boolean = isGermanDate("1.13.2019");
        expect(result).to.be.false;
    });


    it('29.02.2019', () => {
        const result: boolean = isGermanDate("1.13.2019");
        expect(result).to.be.false;
    });


    it('0.11.2019', () => {
        const result: boolean = isGermanDate("0.11.2019");
        expect(result).to.be.false;
    });


    it('10.0.2019', () => {
        const result: boolean = isGermanDate("10.0.2019");
        expect(result).to.be.false;
    });


});

describe('Input.parseGermanDate', () => {

    
    it('null', () => {
        const result: Date = parseGermanDate(null);
        expect(result).to.be.null;
    });


    it('""', () => {
        const result: Date = parseGermanDate("");
        expect(result).to.be.null;
    });


    it('22.09.2019', () => {
        const result: Date = parseGermanDate("22.09.2019");
        expect(result.toString()).to.equal(new Date(2019, 8, 22).toString());
    });


    it('22.2.19', () => {
        const result: Date = parseGermanDate("22.2.19");
        expect(result.toString()).to.equal(new Date(2019, 1, 22).toString());
    });


    it('1.1.1', () => {
        const result: Date = parseGermanDate("1.1.1");
        expect(result).to.be.null;
    });


    it('22-02-2019', () => {
        const result: Date = parseGermanDate("22-02-2019");
        expect(result).to.be.null;
    });


    it('22-02-19', () => {
        const result: Date = parseGermanDate("22-02-19");
        expect(result).to.be.null;
    });


    it('22/02/2019', () => {
        const result: Date = parseGermanDate("22/02/2019");
        expect(result).to.be.null;
    });


    it('22/02/19', () => {
        const result: Date = parseGermanDate("22/02/19");
        expect(result).to.be.null;
    });


    it('2019.02.22', () => {
        const result: Date = parseGermanDate("2019.02.22");
        expect(result).to.be.null;
    });


    it('32.12.2019', () => {
        const result: Date = parseGermanDate("32.12.2019");
        expect(result).to.be.null;
    });


    it('1.13.2019', () => {
        const result: Date = parseGermanDate("1.13.2019");
        expect(result).to.be.null;
    });


    it('29.02.2019', () => {
        const result: Date = parseGermanDate("1.13.2019");
        expect(result).to.be.null;
    });


    it('0.11.2019', () => {
        const result: Date = parseGermanDate("0.11.2019");
        expect(result).to.be.null;
    });


    it('10.0.2019', () => {
        const result: Date = parseGermanDate("10.0.2019");
        expect(result).to.be.null;
    });


});