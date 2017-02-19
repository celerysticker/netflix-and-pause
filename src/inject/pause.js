/* File: inject.js
 * ---------------
 * Hello! You'll be making most of your changes
 * in this file. At a high level:
 * - for part 1, update the modifyText function
 * - for part 2, update the parseSettings function,
 *   and make corresponding changes to modifyText
 * - for part 3, you'll need to come up with a way
 *   to find and replace the images - up to you!
 *
 * This file contains javascript code that is executed
 * everytime a webpage loads over HTTP or HTTPS.
 */

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function pause(element) {
	document.getElementsByClassName(element)[0].click();
}

function record(enabled) {
	// Find current tab
	//chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, (tabs) => {
	if (!enabled) {
		return;
	}
	var youtubeButton = "ytp-play-button";
	//var netflix = "player-control-button player-play-pause";
	// Get tab URL
	/*
	var url = tabs[0].url;
	console.log("Found tab url:" + url);
	*/
	// TODO: replace sleep with audio code
	var wait_time = 500; // ms

	sleep(wait_time).then(() => {
		console.log("Pausing video!");
		//if (url.match(/netflix\.com/)) {
		//    pause(netflix);
		//} else if (url.match(/youtube\.com/)) {
			pause(youtubeButton);
		//}
	});
}

// Wait until page is loaded
var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);

		// Attempt recording intially.
		// Request response from background, asking if recording is enabled.
		chrome.runtime.sendMessage({}, (response) => {
			record(response.record);
		});

		// Receive message from background, initiating recording.
		chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
			record(request.record);
			sendResponse({});
		});
    }
}, 10);

// TODO: handle interrupt signal from background (i.e. user presses button to disable, while recording)
