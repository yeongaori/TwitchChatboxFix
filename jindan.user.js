// ==UserScript==
// @name         Jindan
// @namespace    https://github.com/yeongaori/userscript
// @version      1.1.3
// @updateURL    https://github.com/yeongaori/userscript/raw/master/jindan.user.js
// @downloadURL  https://github.com/yeongaori/userscript/raw/master/jindan.user.js
// @description  automatically do 'jagajindan'
// @icon         https://play-lh.googleusercontent.com/cKIPifwuWHrwrYg2A-fTj2hzQypTfVXFU4SYGZzvx-nGvCpJTDNkrlUfuGCNZwlAXA=s180-rw
// @author       yeongaori
// @match        *://hcs.eduro.go.kr/*
// @grant        none
// ==/UserScript==

var password = "1234";

window.addEventListener('load', function() {
    setTimeout(() => {
        tk.onKeyboard(document.getElementsByTagName("input")[0]);
        document.querySelector('[aria-label="' + password.substring(0,1) + '"]').click();
        document.querySelector('[aria-label="' + password.substring(1,2) + '"]').click();
        document.querySelector('[aria-label="' + password.substring(2,3) + '"]').click();
        document.querySelector('[aria-label="' + password.substring(3,4) + '"]').click();
        document.getElementById("btnConfirm").click();
    }, 1000);
    setTimeout(() => {
        document.getElementsByClassName("name")[0].click();
    }, 2000);
    setTimeout(() => {
        document.querySelectorAll('[name="survey_q1"]')[0].click();
        document.querySelectorAll('[name="survey_q2"]')[1].click();
        document.querySelectorAll('[name="survey_q3"]')[0].click();
    }, 3000);
    setTimeout(() => {
        document.getElementById("btnConfirm").click();
    }, 3500);
}, false);
