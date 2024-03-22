document.addEventListener('DOMContentLoaded', function () {
    const interceptorToggle = document.getElementById('interceptorToggle');

    // Load the current interceptor state and update the toggle switch
    chrome.storage.local.get('interceptorEnabled', function (data) {
        interceptorToggle.checked = data.interceptorEnabled;
    });

    // Listen for changes in the toggle switch
    interceptorToggle.addEventListener('change', function () {
        const enabled = interceptorToggle.checked;

        // Save the new state of the interceptor in storage
        chrome.storage.local.set({ interceptorEnabled: enabled });

        // Send a message to the background script to toggle the interceptor
        chrome.runtime.sendMessage({ action: 'toggleInterceptor', enabled });
    });
});
