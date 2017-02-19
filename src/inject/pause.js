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

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, (tabs) => {
	chrome.extension.sendRequest({getState: "enabled"}, (response) => {
		var readyStateCheckInterval = setInterval(() => {
			// Executes when page is done loading
			if (document.readyState === "complete") {
				clearInterval(readyStateCheckInterval);
				var enabled = response.result;
				if (!enabled) {
					return;
				}
				var youtube = "ytp-play-button";
				//var netflix = "player-control-button player-play-pause";
				// Get tab URL
                var url = tabs[0].url;
				console.log("Found tab url:" + url);
                sleep(5000).then(() => {
					console.log("Pausing video!");
                    //if (url.match(/netflix\.com/)) {
                    //    pause(netflix);
                    //} else if (url.match(/youtube\.com/)) {
                        pause(youtube);
                    //}
                });
            }
		}, 10);
	});
});
