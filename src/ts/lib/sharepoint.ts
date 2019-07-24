const sprLib = require("sprestlib");


/**
 * Bei einer POST-Anfrage an das SharePoint wird ein aktuell gültiges RequestFromDigestValue benötigt.
 */
export function renewSecurityToken() {
    sprLib.renewSecurityToken();
}


/**
 * Alle Listenelemente einer Liste besorgen.
 * 
 * @param listName Der Name der Liste.
 * @param cb Callback mit den Aktionen die bei erfolgreichem Request ausgeführt werden sollen.
 */
export function getSharePointListItems(listName: string, cb: (arrData: any[]) => void) {
    sprLib.list(listName).items({
            queryLimit: 1000
        })
        .then(arrData => {
            cb(arrData);
        })
        .catch(errMsg => console.error(`Fehler beim Laden der Listenelemente von Liste '${listName}':\n${errMsg}`));
}


/**
 * Erstellt ein neues SharePoint Listenelement innerhalb einer Liste.
 * 
 * @param listName der Name der Liste, welche das neue Element erhalten soll.
 * @param listElement das neue Listen Element.
 */
export function postSharePointListItem(listName: string, listElement: object) {
    sprLib.list(listName)
        .create(listElement)
        .then(function (objItem) {
            console.log(`Neues Listen Element für die Liste '${listName}' erfolgreich erstellt.`);
        })
        .catch(function (strErr) {
            console.error(`Es ist ein Fehler aufgetreten beim erstellen des Listen Elements für die Liste '${listName}':\nListenelement: ${listElement}\nFehler: ${strErr}`);
        });
}


/**
 * Informationen zum aktuellen Nutzer erfragen.
 * 
 * @param cb Callback mit den Aktionen die bei erfolgreichem Request ausgeführt werden sollen.
 */
export function getUserInfo(cb: (currentUser: any) => void) {
    sprLib.user().info()
    .then((currentUser) => { cb(currentUser) });
}