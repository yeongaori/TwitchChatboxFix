// ==UserScript==
// @name         CHZZK Chat
// @namespace    https://github.com/yeongaori/userscript
// @version      1.0
// @updateURL    https://github.com/yeongaori/userscript/raw/master/chzzk-chat.user.js
// @downloadURL  https://github.com/yeongaori/userscript/raw/master/chzzk-chat.user.js
// @description  CHZZK chat test
// @author       yeongaori
// @match        https://chzzk.naver.com/live/*
// @icon         https://ssl.pstatic.net/static/nng/glive/icon/favicon.png
// @grant        none
// @require      none
// ==/UserScript==

function handleMutations(mutationsList) {
    for (let mutation of mutationsList) {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE && node.classList) {
                const classes = node.classList;
                for (let className of classes) {
                    if (className.startsWith('live_chatting_list_item')) {
                        const nameTextElements = node.querySelectorAll('[class^="name_text"]');
                        const messageTextElements = node.querySelectorAll('[class^="live_chatting_message_text"]');
                        nameTextElements.forEach(nameElement => {
                            const name = nameElement.textContent.trim();
                            messageTextElements.forEach(messageElement => {
                                const message = messageElement.textContent.trim();
                                chatUpdated(name, message);
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

function chatUpdated(name, message){
    //put your code here
}
