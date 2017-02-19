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

function getVideoElement() {
	return document.getElementsByTagName("video")[0];
}

function play(video) {
	console.log("Playing video!");
	video.play();
}

function pause(video) {
	console.log("Pausing video!");
	video.pause();
}

function pauseOrPlay(video) {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
}

function record(enabled) {
	var video = getVideoElement();
	if (!enabled) {
		play(video);
		return;
	}
	// TODO: replace sleep with audio code
	var wait_time = 100; // ms

	sleep(wait_time).then(() => {
		pauseOrPlay(video);
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

		// Receive message from background, initiating or stopping recording.
		chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
			record(request.record);
			sendResponse({});
		});
    }
}, 10);

// TODO: handle interrupt signal from background (i.e. user presses button to disable, while recording)