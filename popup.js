function appendToDOM(elementType, content) {
    const contentDiv = document.getElementById('content');
    const element = document.createElement(elementType);
    element.textContent = content;
    contentDiv.appendChild(element);
}

// Store the URL in local storage and Retrieve the list of stored URLs
function toggleSavedLink(url) {
    chrome.storage.local.get(['savedLinks'], function(result) {
        const savedLinks = new Set(result.savedLinks || []);
        
        if (savedLinks.has(url)) {
            savedLinks.delete(url);
            console.log('URL remoed of local storage.');
        } else {
            savedLinks.add(url);
            console.log('URL saved to local storage.');
        }

        const updatedLinks = Array.from(savedLinks);

        chrome.storage.local.set({ savedLinks: updatedLinks }, function() {
            console.log('URL saved to local storage.');
        });

        console.log('List of stored URLS', updatedLinks);
    });
};

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // Get URL and title of active tab
    const activeTab = tabs[0];
    const url = activeTab.url;
    const title = activeTab.title;

    appendToDOM('h2', title);
    appendToDOM('h3', url);

    toggleSavedLink(url);
    //chrome.tabs.create({ url: chrome.runtime.getURL("links.html") });
  });