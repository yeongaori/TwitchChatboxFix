// ==UserScript==
// @name         CHZZK Chat
// @namespace    https://github.com/yeongaori/userscript
// @version      1.2.1
// @updateURL    https://github.com/yeongaori/userscript/raw/master/chzzk-chat.user.js
// @downloadURL  https://github.com/yeongaori/userscript/raw/master/chzzk-chat.user.js
// @description  CHZZK chat test
// @author       yeongaori
// @match        https://chzzk.naver.com/live/*
// @icon         https://ssl.pstatic.net/static/nng/glive/icon/favicon.png
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// ==/UserScript==

const url = window.location.href;
const channelId = url.split('https://chzzk.naver.com/live/')[1].split('/')[0];

function handleMutations(mutationsList) {
    for (let mutation of mutationsList) {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE && node.classList) {
                const classes = node.classList;
                for (let className of classes) {
                    if (className.startsWith('live_chatting_list_item')) {

                        const chatNameTextElements = node.querySelectorAll('[class^="name_text"]');
                        const chatMessageTextElements = node.querySelectorAll('[class^="live_chatting_message_text"]');
                        const chatBadgeImgElements = node.querySelectorAll('[class^="badge_container"] img');
                        chatNameTextElements.forEach(chatNameElement => {
                            const name = chatNameElement.textContent.trim();
                            chatMessageTextElements.forEach(chatMessageElement => {
                                const message = chatMessageElement.textContent.trim();
                                let hasBadge = false;
                                chatBadgeImgElements.forEach(chatBadgeElement => {
                                    const badge = chatBadgeElement.alt.trim();
                                    if( badge ) {
                                        hasBadge = true;
                                    }
                                });
                                chatUpdated(name, message, hasBadge);
                            });
                        });

                        const donationNameTextElements = node.querySelectorAll('[class^="name_text"]');
                        const donationMessageTextElements = node.querySelectorAll('[class^="live_chatting_donation_message_text"]');
                        const donationBadgeImgElements = node.querySelectorAll('[class^="badge_container"] img');
                        const donationMoneyElements = node.querySelectorAll('[class^="live_chatting_donation_message_money"]');
                        donationNameTextElements.forEach(donationNameElement => {
                            const name = donationNameElement.textContent.trim();
                            donationMessageTextElements.forEach(donationMessageElement => {
                                const message = donationMessageElement.textContent.trim();
                                let hasBadge = false;
                                donationBadgeImgElements.forEach(donationBadgeElement => {
                                        const badge = donationBadgeElement.alt.trim();
                                        if( badge ) {
                                            hasBadge = true;
                                        }
                                        donationMoneyElements.forEach(donationMoneyElement => {
                                            const money = parseInt(donationMoneyElement.textContent.trim().replaceAll(",", ""));
                                            donationUpdated(name, message, hasBadge, money);
                                        });
                                });
                            });
                        });

                    }
                }
            }
        });
    }
}
const observer = new MutationObserver(handleMutations);
observer.observe(document, { childList: true, subtree: true });

var originalWebSocket = window.WebSocket;
window.WebSocket = function(url, protocols) {
    if (url.includes('chat')) {
        console.log('WebSocket connection intercepted from chat URL: ' + url);
        var ws = new originalWebSocket(url, protocols);

        const originalSend = ws.send;
        ws.send = function(data) {
            const sentData = JSON.parse(data);
            //console.log('Intercepted data being sent');
            //console.log(sentData);
            originalSend.call(ws, data);
        };

        ws.onmessage = function(event) {
            const eventData = JSON.parse(event.data);
            const profileData = JSON.parse(eventData.bdy[0].profile);
            webSocketReceived(
                profileData.nickname,
                profileData.userIdHash,
                eventData.bdy[0].msg,
                eventData.bdy[0].msgTypeCode,
                JSON.parse(eventData.bdy[0].extras),
                profileData.profileImageUrl,
                profileData.userRoleCode,
                profileData.badge,
                profileData.title,
                profileData.verifiedMark,
                profileData.activityBadges,
                profileData.streamingProperty
            );
            //console.log('Intercepted data being received by ' + profileData.nickname);
            //console.log(eventData);
        };
        return ws;
    }
    return new originalWebSocket(url, protocols);
};

function chatUpdated(name, message, hasBadge){
    //console.log("CHAT\nName: " + name + "\nMessage: " + message + "\nhasBadge: " + hasBadge);
    //your code here
}

function donationUpdated(name, message, hasBadge, money){
    //console.log("DONATION\nName: " + name + "\nMessage: " + message + "\nhasBadge: " + hasBadge + "\nMoney: " + money);
    //your code here
}

function webSocketReceived(name, userIdHash, message, msgTypeCode, extraData, profileImageUrl, userRoleCode, badge, title, verifiedMark, activityBadges, streamingProperty){
    //if isDonation is true and you want to get donation's information, get those from extraData
    //msgTypeCode: 1 for normal chats, and 10 for donations
}
