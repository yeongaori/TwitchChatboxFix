// ==UserScript==
// @name         Drive & Listen Fullscreen
// @namespace    https://github.com/yeongaori/userscript
// @version      1.0
// @updateURL    https://github.com/yeongaori/userscript/raw/master/driveandlistenfullscreen.user.js
// @downloadURL  https://github.com/yeongaori/userscript/raw/master/driveandlistenfullscreen.user.js
// @description  Double click to fullscreen on Drive & Listen
// @author       Yeongaori
// @match        https://driveandlisten.herokuapp.com/*
// @icon         https://driveandlisten.herokuapp.com/icon.png
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  const videoBackground = document.querySelector('.video-background');
  if (!videoBackground) return;

  videoBackground.addEventListener('dblclick', toggleFullscreen);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      videoBackground.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
})();

GM_addStyle(`
    .video-background {
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }
`);
