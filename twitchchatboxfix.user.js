// ==UserScript==
// @name         TwitchChatboxFix
// @namespace    https://github.com/yeongaori/userscript
// @version      1.0
// @updateURL    https://github.com/yeongaori/userscript/raw/master/twitchchatboxfix.user.js
// @downloadURL  https://github.com/yeongaori/userscript/raw/master/twitchchatboxfix.user.js
// @description  fix twitch chatbox scrollbar bug
// @author       yeongaori
// @match        *://*.twitch.tv/*
// @grant        none
// ==/UserScript==
window.addEventListener('load', function() {
    var textarea = document.querySelector("textarea").style.lineHeight = 1.1;
}, false);
