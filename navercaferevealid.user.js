// ==UserScript==
// @name         NaverCafeRevealID
// @namespace    https://github.com/yeongaori/userscript
// @version      1.1.1
// @updateURL    https://github.com/yeongaori/userscript/raw/master/navercaferevealid.user.js
// @downloadURL  https://github.com/yeongaori/userscript/raw/master/navercaferevealid.user.js
// @description  Revealing Member ID on Naver Cafe
// @author       yeongaori
// @match        https://cafe.naver.com/ca-fe/cafes/*/members/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=naver.com
// @grant        GM_xmlhttpRequest
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// ==/UserScript==

var devmode = false;

/*
window.addEventListener('load', function() {
    var revealnickname = document.getElementById("reply_id").textContent.split("(")[0];
    console.log("Found target nickname: " + revealnickname);
    var revealuserid = oNote.targetUserId;
    console.log("Found target user id: " + revealuserid);
    document.getElementById("reply_id").textContent = revealnickname + "(" + revealuserid + ")";
}, false);
*/

var cafeId = window.location.href.split("/")[5];
var memberKey = window.location.href.split("/")[7];
var memberId = "";

if (devmode){
  console.log("Found target cafeId: " + cafeId);
  console.log("Found target memberKey: " + memberKey);
}

GM_xmlhttpRequest({
  method: "GET",
  url: "https://apis.naver.com/cafe-web/cafe-mobile/CafeMemberProfile?cafeId=" + cafeId + "&memberKey=" + memberKey,
  onload: processJson
});

function processJson(rspObj) {
  if (rspObj.status != 200 && rspObj.status != 304) {
    reportAJAX_Error(rspObj);
    return;
  }
  if (devmode) console.log("Naver API Response: ", rspObj.response);
  try {
    var json = JSON.parse(rspObj.response);
    memberId = json.message.result.memberId;
    if (devmode){
      console.log("Parsed JSON: ", json);
      console.log("Member ID: ", memberId);
    }
  } catch (error) {
    if (devmode) console.error("Error parsing JSON:", error);
  }
}

var observer = new MutationObserver(function(mutationsList) {
  for (var mutation of mutationsList) {
    if (mutation.type === 'childList') {
      if (document.getElementsByClassName("nick_btn").length > 0) {
        var nick_btn = document.getElementsByClassName("nick_btn")[0];
        var memberIdString = "(" + memberId + ")";
        nick_btn.textContent = nick_btn.textContent.split("(")[0] + memberIdString + nick_btn.textContent.split(")")[1];
      }
    }
  }
});
observer.observe(document.body, { childList: true, subtree: true });
