import {
    getDaysInMonth
} from 'date-fns';
import {
    trim
} from 'lodash';


/**
 * Checks if a string is a date string with a format used in germany (DIN 5008 -> dd.mm.yyyy).
 * @param date Date string to check.
 */
export function isGermanDate(date: string): boolean {
    if (!date) {
        return false;
    }
    let regExp: RegExp = /^\d{1,2}\.{1}\d{1,2}\.{1}\d{2,4}$/;
    if (new RegExp(regExp).test(date)) {
        const dateArray = getDateStringAsNumberArray(date);
        if (dateArray == null || dateArray.length < 3) {
            return false;
        }
        const month = dateArray[1];
        const day = dateArray[2];

        if (day > 0 && day < 32 && month >= 0 && month < 12) {
            if (day > getDaysInMonth(date)) {
                return false;
            }
            return true;
        }
    }
    return false;
}


/**
 * Parses a DIN 5008 date string into a date object.
 * @param date Date string to parse.
 */
export function parseGermanDate(date: string): Date {
    date = trim(date);
    if (!isGermanDate(date)) {
        return null;
    }

    const dateArray = getDateStringAsNumberArray(date);
    if (dateArray == null || dateArray.length < 3) {
        return null;
    }

    return new Date(dateArray[0], dateArray[1], dateArray[2]);
}


/**
 * Parses a DIN 5008 formatted date into an array of numbers.
 * 
 * @param date Date string to parse.
 * @return [year, month, day]
 */
export function getDateStringAsNumberArray(date: string): number[] {
    const firstPoint: number = date.indexOf(".");
    const lastPoint: number = date.lastIndexOf(".");

    if (firstPoint == -1 || lastPoint == -1) {
        return null;
    }

    const day: number = parseInt(date.substring(0, firstPoint));
    const month: number = parseInt(date.substring(firstPoint + 1, lastPoint)) - 1;
    let year: number = parseInt(date.substring(lastPoint + 1));

    if (year < 100) {
        year += 2000;
    }

    return [year, month, day];
}

/**
 * @return {boolean} true if the browser is an IE, else false
 */
export function isIE(): boolean {
    const ua = window.navigator.userAgent;
  
    const msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older
      return true;
    }
  
    const trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11
      return true;
    }
    // different browser
    return false;
  }