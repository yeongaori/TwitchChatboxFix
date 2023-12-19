// ==UserScript==
// @name         CHZZK Chat
// @namespace    https://github.com/yeongaori/userscript
// @version      1.1
// @updateURL    https://github.com/yeongaori/userscript/raw/master/chzzk-chat.user.js
// @downloadURL  https://github.com/yeongaori/userscript/raw/master/chzzk-chat.user.js
// @description  CHZZK chat test
// @author       yeongaori
// @match        https://chzzk.naver.com/live/*
// @icon         https://ssl.pstatic.net/static/nng/glive/icon/favicon.png
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// ==/UserScript==

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
                                let isSubscribed = false;
                                chatBadgeImgElements.forEach(chatBadgeElement => {
                                    const badge = chatBadgeElement.alt.trim();
                                    if( badge == "입덕 완료" ){
                                        isSubscribed = true;
                                    }
                                });
                                chatUpdated(name, message, isSubscribed);
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
                                let isSubscribed = false;
                                donationBadgeImgElements.forEach(donationBadgeElement => {
                                        const badge = donationBadgeElement.alt.trim();
                                        if( badge == "입덕 완료" ){
                                            isSubscribed = true;
                                        }
                                        donationMoneyElements.forEach(donationMoneyElement => {
                                            const money = parseInt(donationMoneyElement.textContent.trim().replaceAll(",", ""));
                                            donationUpdated(name, message, isSubscribed, money);
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

function chatUpdated(name, message, isSubscribed){
    //console.log("CHAT\nName: " + name + "\nMessage: " + message + "\nisSubscribed: " + isSubscribed);
    //your code here
}

function donationUpdated(name, message, isSubscribed, money){
    //console.log("DONATION\nName: " + name + "\nMessage: " + message + "\nisSubscribed: " + isSubscribed + "\nMoney: " + money);
    //your code here
}
