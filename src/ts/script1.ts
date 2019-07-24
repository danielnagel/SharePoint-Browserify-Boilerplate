import $ = require('jquery');
import {
    isIE
} from './lib/utils';

if (isIE()) {

    let warning = document.getElementById("appContainer");
    warning.innerHTML =
        "<p style='color:red'><b>Warning!</b>The Internet Explorer is not supported. Please use the Google Chrome or Mozilla Firefox Browser.</p>";

} else {

    $(document).ready(function () {

        if (!$) {

            let warning = document.getElementById("appContainer");
            warning.innerHTML =
                "<p style='color:red'><b>Warning!</b>Could not load jquery, reload the page.</p>";
            throw new Error("Could not load jquery");
        }

        $('#appContainer').append("<p>Hello SharePoint.</p>");
    });

}