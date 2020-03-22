import "../less/styles.less"

import * as DOM from "react-dom";
import * as React from "react";
import { App } from "ui/app";

function main() {
    const app = React.createElement(App)
    DOM.render(app, document.getElementById("app"));
}

// Bind to on Ready
function ready(fn: () => void) {
    if (document.readyState != 'loading'){
      fn()
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(main)
