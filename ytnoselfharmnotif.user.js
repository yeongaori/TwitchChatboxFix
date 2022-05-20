// ==UserScript==
// @name         Youtube Skip Self-harm notification
// @namespace    https://github.com/yeongaori/userscript
// @version      1.0.0
// @updateURL    https://github.com/yeongaori/userscript/raw/master/ytnoselfharmnotif.user.js
// @downloadURL  https://github.com/yeongaori/userscript/raw/master/ytnoselfharmnotif.user.js
// @description  Skip 'The following content may contain suicide or self-harm topics.' notification
// @icon         https://w.namu.la/s/0234a4424011b37bad371ec569978fc3fcbea877b1cdff4672890639045092ffe895ff91f17f48e847fe3664866675da272775b5939b11fae30ee70c594f4d63137881e564041bee88ca14df3500289612d7424e0798d86816c878834243f25a
// @author       yeongaori
// @match           https://www.youtube.com/*
// @grant        none
// ==/UserScript==

var delay = 500; // delay of pressing the 'I understand and wish to proceed' button, 500 is default

window.addEventListener('load', function() {
    setTimeout(() => {
        document.querySelector('[aria-label="I understand and wish to proceed"]').click();
    }, delay);
}, false);
