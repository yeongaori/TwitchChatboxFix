// ==UserScript==
// @name         NaverCafeImageSrc
// @namespace    https://github.com/yeongaori/userscript
// @version      1.0
// @updateURL    https://github.com/yeongaori/userscript/raw/master/navercafeimagesrc.user.js
// @downloadURL  https://github.com/yeongaori/userscript/raw/master/navercafeimagesrc.user.js
// @description  Redirect to image source from naver cafe
// @author       yeongaori
// @match        https://cafe.naver.com/common/storyphoto/viewer.html?src=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=naver.com
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    location.assign(document.getElementsByTagName("img")[0].src);
})();
