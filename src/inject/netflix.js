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

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			// This part of the script triggers when page is done loading
			clearInterval(readyStateCheckInterval);
			chrome.storage.local.get('settings', function(response) {
				var replacementRules = null;
				if (typeof chrome.runtime.lastError === 'undefined') {
					var settings = response.settings;
					lines = settings.split("\n").filter(function(line) {
						return line.indexOf("->") != -1;
					});
					replacementRules = parseSettings(lines);
				}
				console.log(replacementRules);
				walk(document.body, replacementRules);
				replaceAllImages(replacementRules)
			});
		}
	}, 10);
});

// Update a text node's contents
function handleText(textNode, settings)
{
	var text = textNode.nodeValue;
	var modifiedText = modifyText(text, settings);
	textNode.nodeValue = modifiedText;
}

// Full credit to: http://is.gd/mwZp7E
function walk(node, settings)
{
	var child, next;

	// For more info, read http://www.w3schools.com/jsref/prop_node_nodetype.asp
	switch (node.nodeType)
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while (child)
			{
				next = child.nextSibling;
				walk(child, settings);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node, settings);
			break;
	}
}
