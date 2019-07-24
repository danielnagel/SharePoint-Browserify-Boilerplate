import $ = require('jquery');
import {
    uniqWith,
    isEqual,
    get
} from 'lodash';
import {
    isIE,
    isGermanDate
} from './lib/utils';
import {
    getSharePointListItems
} from './lib/sharepoint';

const sharepointListName: string = "Example List";

if (isIE()) {

    let warning = document.getElementById("appContainer");
    warning.innerHTML =
        "<p style='color:red'><b>Warning!</b>The Internet Explorer is not supported. Please use the Google Chrome or Mozilla Firefox Browser.</p>";

} else {

    let sharepointList = [];
    $(document).ready(function () {

        if (!$) {

            let warning = document.getElementById("appContainer");
            warning.innerHTML =
                "<p style='color:red'><b>Warning!</b>Could not load jquery, reload the page.</p>";
            throw new Error("Could not load jquery");
        }



        // Listendaten holen.
        getSharePointListItems(sharepointListName, (cbArray) => {
            $.each(cbArray, (key, value) => {
                sharepointList.push({
                    title: get(cbArray, "Title")
                });
            });

            sharepointList = uniqWith(sharepointList, isEqual);

            const table = $("<table>");
            const header = $("<th><td>Key</td><td>value</td><td>isGermanDate</td></th>");
            table.append(header);

            $.each(sharepointList, (key, value) => {
                const tr = $("<tr>");
                const td = $(`<td>${key}</td><td>${value}</td><td>${isGermanDate(value)}</td>`);
                tr.append(td);
                table.append(tr);
            });

            $('#appContainer').append(`<h1>Content of ${sharepointListName}:</h1>`);
            $('#appContainer').append(table);
        });
    });

}