/* File: background.js
 * -------------------
 * This script defines an event page, which allows you
 * to have a "single long-running script to handle some
 * task or state."
 *
 * The general principle is that this script will register
 * to listen for Chrome events, and then be instantiated
 * when Chrome notices that event.
 *
 * (You don't need to change this file unless you're building
 * an extension.)
 * 
 * Note: Since the event page is created and destroyed many
 * times throughout a browser session, you cannot store
 * instance state in global variables.
 * 
 * An example chrome extension that uses an event page is
 * available at:
 * https://developer.chrome.com/extensions/samples#search:sandbox
 * 
 * For more details, check out the documentation:
 * https://developer.chrome.com/extensions/event_pages
 * 
 */

/* EMPTY */

var enabled = false;

function indicateEnabled() {
    console.log("Enabled");
    chrome.browserAction.setBadgeText({text: "on"});
}

function indicateDisabled() {
    console.log("Disabled");
    chrome.browserAction.setBadgeText({text: "off"});
}

//chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        enabled = !enabled;
        if (enabled) {
            indicateEnabled();
        } else {
            indicateDisabled();
        }
        // Message all tabs with new record state
        for (var i = 0; i < tabs.length; i++) {
            chrome.tabs.sendMessage(tabs[i].id, {record: enabled}, (response) => {});
        }
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    sendResponse({record: enabled});
});
