// ==UserScript==
// @name         Youtube Skip Self-harm notification
// @namespace    https://github.com/yeongaori/userscript
// @version      1.1.0
// @updateURL    https://github.com/yeongaori/userscript/raw/master/ytnoselfharmnotif.user.js
// @downloadURL  https://github.com/yeongaori/userscript/raw/master/ytnoselfharmnotif.user.js
// @description  Skip 'The following content may contain suicide or self-harm topics.' notification
// @icon         https://w.namu.la/s/0234a4424011b37bad371ec569978fc3fcbea877b1cdff4672890639045092ffe895ff91f17f48e847fe3664866675da272775b5939b11fae30ee70c594f4d63137881e564041bee88ca14df3500289612d7424e0798d86816c878834243f25a
// @author       yeongaori
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

var delay = 250; // delay of pressing the 'I understand and wish to proceed' button, 250 is default
var hide_emergency_warnings = false; // hide emergency warnings, disabled on default

window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementsByClassName("style-scope yt-playability-error-supported-renderers")[0].style.visibility = "hidden";
        document.getElementsByClassName("yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--overlay-touch-response-inverse")[0].click();
        if (hide_emergency_warnings == true){
            var emergency_warnings = document.getElementById("clarify-box");
            if (emergency_warnings){
                emergency_warnings.parentNode.removeChild(emergency_warnings);
            }
        }
    }, delay);
}, false);
