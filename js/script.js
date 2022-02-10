"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const tabs = require("./modules/tabs"),
        modal = require("./modules/modal"),
        cards = require("./modules/cards"),
        forms = require("./modules/forms"),
        timer = require("./modules/timer"),
        slider = require("./modules/slider"),
        calculator = require("./modules/calculator");

    tabs();
    modal();
    timer();
    cards();
    forms();
    slider();
    calculator();
});
