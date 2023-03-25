function appendToDOM(elementType, content) {
    const contentDiv = document.getElementById('content');
    const element = document.createElement(elementType);
    element.textContent = content;
    contentDiv.appendChild(element);
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // Get URL and title of active tab
    const activeTab = tabs[0];
    const url = activeTab.url;
    const title = activeTab.title;

    appendToDOM('h2', title);
    appendToDOM('h3', url);

    // Store the URL in local storage and Retrieve the list of stored URLs
    chrome.storage.local.get(['savedLinks'], function(result) {
        const savedLinks = result.savedLinks || [];

        if (!savedLinks.includes(url)) {
            savedLinks.push(url);
        }

        chrome.storage.local.set({ savedLinks }, function() {
            console.log('URL saved to local storage.');
        })

        console.log('List of stored URLS', savedLinks);
    })
    //chrome.tabs.create({ url: chrome.runtime.getURL("links.html") });
  });