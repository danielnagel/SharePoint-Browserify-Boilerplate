/**
 * site: URL to on premise SharePoint.
 * username: of a SharePoint user.
 * password: to the username.
 */
export interface ISharePointconfig {
    site: string,
    username: string,
    password: string,
    projects: ISharePointProjectConfig[]
}

/**
 * src:     TypeScript entry point
 * subSite: relative SharePoint path
 * folder:  relative path to store the script on the SharePoint site,
 *          the folders do not need to exist.
 */
export interface ISharePointProjectConfig {
    src: string,
    subSite: string,
    folder: string
}