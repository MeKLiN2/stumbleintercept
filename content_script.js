// Listen for messages from the background script or popup to toggle the interceptor
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'toggleInterceptor') {
        toggleInterceptor(message.enabled);
    }
});

// Function to toggle the interceptor
function toggleInterceptor(enabled) {
    if (enabled) {
        injectScript('intercept.js');
    } else {
        removeScript('intercept.js');
    }
}

// Function to inject a script into the webpage
function injectScript(scriptPath) {
    var script = document.createElement('script');
    script.src = chrome.runtime.getURL(scriptPath);
    document.head.appendChild(script);
}

// Function to remove a script from the webpage
function removeScript(scriptPath) {
    var script = document.querySelector('script[src="' + chrome.runtime.getURL(scriptPath) + '"]');
    if (script) {
        script.parentNode.removeChild(script);
    }
}
