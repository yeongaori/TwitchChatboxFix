// ==UserScript==
// @name         NaverNoteRevealID
// @namespace    https://github.com/yeongaori/userscript
// @version      1.0
// @updateURL    https://github.com/yeongaori/userscript/raw/master/navernoterevealid.user.js
// @downloadURL  https://github.com/yeongaori/userscript/raw/master/navernoterevealid.user.js
// @description  Revealing ID on Naver Note
// @author       yeongaori
// @match        https://note.naver.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=naver.com
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// ==/UserScript==

window.addEventListener('load', function() {
    var revealnickname = document.getElementById("reply_id").textContent.split("(")[0];
    console.log("Found target nickname: " + revealnickname);
    var revealuserid = oNote.targetUserId;
    console.log("Found target user id: " + revealuserid);
    document.getElementById("reply_id").textContent = revealnickname + "(" + revealuserid + ")";
}, false);
