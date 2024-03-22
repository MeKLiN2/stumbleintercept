chrome.action.onClicked.addListener(async (tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["intercept.js"],
  });
});

// Listen for messages from the popup to toggle the interceptor
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'toggleInterceptor') {
        toggleInterceptor(message.enabled);
    }
});

// Function to toggle the interceptor
function toggleInterceptor(enabled) {
    // Send a message to all tabs to inform them about the interceptor state
    chrome.tabs.query({}, function (tabs) {
        tabs.forEach(function (tab) {
            chrome.tabs.sendMessage(tab.id, { action: 'toggleInterceptor', enabled: enabled });
        });
    });
}
