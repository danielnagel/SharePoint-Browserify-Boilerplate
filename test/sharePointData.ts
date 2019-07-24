import * as sprequest from 'sp-request';
const spCredentials = require('../src/ts/config/sharepointConfig');

module.exports.data = {}

export function getSharePointData(listname: string): any {
    const credentialOptions: sprequest.IOnpremiseUserCredentials = {
        username: spCredentials.username,
        password: spCredentials.password
    };
    const spr = sprequest.create(credentialOptions);

    return spr.get(`https://sharepoint.propersonal.de/bz-rechner/_api/web/lists/getbytitle('${listname}')/items?$top=500`)
        .then(response => {
            module.exports.data = {
                ...response.body.d.results
            };
        })
        .catch(err => {
            console.log(`Could not load items of ${listname} ... ${err}`);
        });
}